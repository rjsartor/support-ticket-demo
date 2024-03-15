export enum SupportTicketStatusEnum {
  new = 'new',
  inProgress = 'in progress',
  resolved = 'resolved',
}

export const SupportTicketStatusValues = Object.values(SupportTicketStatusEnum) as [SupportTicketStatusEnum, ...SupportTicketStatusEnum[]];

export type SupportTicket = {
  id: string;
  name: string;
  email: string;
  description: string;
  status: SupportTicketStatusEnum;
  created_at: string;
};