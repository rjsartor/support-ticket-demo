'use server';
import { fetchTicketById } from '@/app/lib/data';
import { UpdateStatusForm } from '@/app/components/forms/update-status-form';
import { TicketResponseForm } from '@/app/components/forms/ticket-response-form';
import { formatDate } from '@/app/components/ticket-row';
import Header from '@/app/components/header';
import BackButton from '@/app/components/back-button';

export default async function Page({ params }: { params: { id: string } }) {
  const ticket = await fetchTicketById(params.id);
  if (!ticket) return 'There was an error fetching the ticket';

  const { id, name, email, description, created_at, status } = ticket;

  return (
    <div className="bg-white p-8 flex xl:w-2/3 lg:w-3/4 md:w-full">
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-300 grow">
        <div className="border-b border-gray-200 mb-4 pb-2 flex justify-between">
          <Header header={`Support ticket: #${id}`} />
          <BackButton label="Back" />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-evenly">
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">Name</p>
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Email</p>
              <h3 className="text-lg font-medium text-gray-900">{email}</h3>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">Date Submitted</p>
              <h3 className="text-lg font-medium text-gray-900">{formatDate(ticket.created_at)}</h3>
            </div>
            <div className="mb-4">
              <h3 className="text-gray-600">Status</h3>
              <UpdateStatusForm id={id} status={status} />
            </div>
          </div>
        </div>
        <div className='flex w-full'>
          <div className="mb-4">
            <p className="text-gray-600">Description</p>
            <h3 className="text-lg font-medium text-gray-900">{description}</h3>
          </div>
        </div>
        <div className='flex'>
          <div className="mb-4 w-full">
            <TicketResponseForm id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};