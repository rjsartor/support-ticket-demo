import { NextResponse } from 'next/server';
import SendgridService, { SendgridEmailPayload } from "@/app/lib/sendgrid/Sendgrid.service";

export async function POST(req: Request) {
  const formData = await req.formData()
  const ticketJSON = formData.get('ticket') as string;;
  const response = formData.get('response') as string;

  const ticket = JSON.parse(ticketJSON);

  const payload: SendgridEmailPayload = {
    to_name: ticket.name,
    to: ticket.email,
    from: process.env.AUTHORIZED_EMAIL_SENDER as string,
    from_name: 'Support Ticket Demo Team',
    subject: `Support Ticket #${ticket.id} Response`,
    body: response,
  };

  console.log('Sending email: ', payload);

  if (!process.env.USE_SENDGRID) return;

  try {
    const sendgridService = new SendgridService();
    await sendgridService.send(payload);

    return new NextResponse(JSON.stringify({ success: true, message: 'Email sent successfully.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new NextResponse(JSON.stringify({ success: false, message: 'Failed to send email.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}