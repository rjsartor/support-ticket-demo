import Link from "next/link";
import { SupportTicket, SupportTicketStatusEnum } from "../lib/definitions";
import FlexCell from "./flex-cell";

type TicketRowProps = {
  item: SupportTicket;
  isHeader?: boolean;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: 'numeric' });
};

const statusStyles: { [key in SupportTicket['status']]: string } = {
  [SupportTicketStatusEnum.new]: "text-red-500",
  [SupportTicketStatusEnum.inProgress]: "text-yellow-500",
  [SupportTicketStatusEnum.resolved]: "text-green-500",
};

const TicketRow = ({ item: ticket }: TicketRowProps) => (
  <Link 
    href={`/admin/ticket/${ticket?.id}`} 
    className="flex cursor-pointer hover:bg-gray-100 border-b border-gray-200"
    passHref 
  >
    <FlexCell value={ticket.id} header='Ticket No' />
    <FlexCell value={ticket.name} header='Name' />
    <FlexCell value={formatDate(ticket.created_at)} header='Date' />
    <FlexCell value={ticket.status} header='Status' style={statusStyles[ticket.status]} />
  </Link>
);

export default TicketRow;