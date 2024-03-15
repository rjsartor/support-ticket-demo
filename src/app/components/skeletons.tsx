const SkeletonElement = () => (
  <div className={`bg-gray-300 animate-pulse w-24 h-6 m-2`}></div>
);

const TicketRowSkeleton = () => (
  <div className="flex cursor-pointer hover:bg-gray-100 border-b border-gray-200">
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
  </div>
);

export function DataListSkeleton() {
  return (
    <div className="flex flex-col overflow-y-auto">
      <TicketRowSkeleton />
      <TicketRowSkeleton />
      <TicketRowSkeleton />
      <TicketRowSkeleton />
    </div>
  )
}