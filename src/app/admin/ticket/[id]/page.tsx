'use server';
import { fetchTicketById } from '@/app/lib/data';
import { UpdateStatusForm } from '@/app/components/forms/update-status-form';
import { TicketResponseForm } from '@/app/components/forms/ticket-response-form';
import { formatDate } from '@/app/components/ticket-row';
import Header from '@/app/components/header';
import BackButton from '@/app/components/back-button';
import { FC } from 'react';

const TicketItem: FC<{ name: string, value: string }> = ({ name, value }) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600">{name}</p>
      <h3 className="text-lg font-medium text-gray-900">{value}</h3>
    </div>
  );
}

// A dynamic Ticket page at admin/ticket/[id] that directly calls fetchTicketById based on the URL params.
// Params prop is automatically passed to Server components.
export default async function Page({ params }: { params: { id: string } }) {
  const ticket = await fetchTicketById(params.id);
  if (!ticket) return 'There was an error fetching the ticket';

  const { id, name, email, description, created_at, status } = ticket;

  return (
    <div className="bg-white p-8 flex xl:w-2/3 lg:w-3/4 md:w-full flex-col justify-between">
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-300 grow max-w-full">
        <div className="border-b border-gray-200 mb-4 pb-2 flex justify-between">
          <Header header={`Support ticket: #${id}`} />
          <BackButton label="Back" />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-evenly">
          <div className="flex-1">
            <TicketItem name='Name' value={name} />
            <TicketItem name='Email' value={email} />
          </div>
          <div className="flex-1">
            <TicketItem name='Date Submitted' value={formatDate(created_at)} />
            <div className="mb-4">
              <p className="text-gray-600">Status</p>
              <UpdateStatusForm id={id} status={status} />
            </div>
          </div>
        </div>

        <div className="mb-4 w-full">
          <p className="text-gray-600">Description</p>
          <p className="text-lg font-medium text-gray-900 break-words">{description}</p>
        </div>
        <div className='flex w-full'>
          <div className="mb-4 w-full">
            <TicketResponseForm id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};