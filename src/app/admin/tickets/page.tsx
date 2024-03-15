'use server';
import { SupportTicketStatusEnum } from '@/app/lib/definitions';
import { Suspense } from 'react';
import DataList from '@/app/components/data-list';
import TicketRow from '@/app/components/ticket-row';
import { TICKET_OFFSET, fetchTickets } from '@/app/lib/data';
import Loading from './loading';
import PaginationControls from '@/app/components/pagination-controls';
import { TicketStatusTabs } from '@/app/components/ticket-status-tabs';
import Header from '@/app/components/header';

// Page displaying tickets list at /admin/tickets. This is a server component that 
// fetches tickets based on status and page searchParams and passes the data down DataList.
// Status and page are retrieved from searchParams, another prop passed to server components.
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // use default searchParams if not found
  const status = searchParams.status as SupportTicketStatusEnum ?? SupportTicketStatusEnum.new; 
  const page = Number(searchParams.page) ?? 1;

  const { data, rowCount } = await fetchTickets(status, page);
  const totalPages = Math.ceil(rowCount / TICKET_OFFSET);

  return (
    <div className="bg-white h-3/4 p-8 xl:w-2/3 lg:w-3/4 md:w-full flex flex-col h-screen">
      <div className="w-full bg-white p-6 rounded-md shadow-md border border-gray-300">
        <Header header='Ticket List' subheader='View and select existing support tickets.' />
        <TicketStatusTabs />
        <Suspense fallback={<Loading />}>
          <DataList 
            data={data}
            DataRow={TicketRow}
          />
        </Suspense>
        <PaginationControls 
          currentPage={Number(page)} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
}