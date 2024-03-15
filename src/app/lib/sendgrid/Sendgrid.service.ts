import axios, { AxiosResponse } from 'axios';

export type SendgridEmailPayload = {
  to: string;
  to_name: string;
  from: string;
  from_name: string;
  subject: string;
  body: string;
}

export type SendgridRequestBody = {
  personalizations: [{
    to: [{
      email: string;
      name: string;
    }];
  }];
  from: {
    email: string;
    name: string;
  };
  subject: string;
  content: [{
    type: string;
    value: string;
  }];
};

class SendgridService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || '';
    this.baseUrl = `https://api.sendgrid.com/v3/mail/send`;
  }

  // My Sendgrid account is currently not working because it was inactive for too long.
  // The integration is working correctly but email sent are being stuck in processing.
  // I'm waiting for Sendgrid to respont to my Support Ticket #16035746, ironically. 
  async send(payload: SendgridEmailPayload): Promise<AxiosResponse> {
    if (!this.apiKey) {
      throw new Error('Sendgrid API key missing');
    }

    try {
      const requestBody = this.generateRequestBody(payload);
      const response = await axios.post(this.baseUrl, requestBody, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response;
    } catch (error) {
      console.error('SendgridService Error:', error);
      throw error;
    }
  }


  private convertHtmlToPlainText(html: string) {
    return html.replace(/<[^>]*>/g, '');
  };

  // https://docs.sendgrid.com/api-reference/mail-send/mail-send
  private generateRequestBody({
    from,
    to,
    subject,
    body,
    from_name,
    to_name
  }: SendgridEmailPayload): SendgridRequestBody {
    return {
      personalizations: [
        {
          to: [
            {
              email: to,
              name: to_name,
            },
          ],
        },
      ],
      from: {
        email: from,
        name: from_name,
      },
      subject: subject,
      content: [
        {
          type: 'text/html',
          value: this.convertHtmlToPlainText(body),
        },
      ],
    };
  }
}

export default SendgridService;
