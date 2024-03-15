'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SupportTicketStatusEnum } from "../lib/definitions";

// Custom Tab component for managing the different status of support tickets.
// It would take some refactoring, but this component could be made more generic
// to work with any types of tabs for any DataList.

// TODO: make this a generic Tabs component that can be used with/in DataList.
export function TicketStatusTabs({ status }: { status: SupportTicketStatusEnum} ) {
  const unSelectedStyles = 'bg-gray-50 border-gray-100 border border-b-0'
  const selectedStyles = 'px-2 py-2 bg-blue-600 text-white shadow-md';
  const baseStyles = 'w-1/3 border-gray-700 rounded-b-none rounded-t-md hover:bg-blue-600';

  const router = useRouter();
  const [tab, setTab] = useState<SupportTicketStatusEnum>(status || SupportTicketStatusEnum.new);

  const handleTabClick = (tab: SupportTicketStatusEnum): void => {
    router.push(`?status=${tab}&page=${1}`);
    setTab(tab);
  };

  const isSelected = (status: SupportTicketStatusEnum): string => {
    return tab === status ? selectedStyles : unSelectedStyles;
  };

  return (
    <div className="flex justify-between mt-4 text-gray-700 border-b border-gray-300 gap-1">
      <button 
        className={`${baseStyles} ${isSelected(SupportTicketStatusEnum.new)}`} 
        onClick={() => handleTabClick(SupportTicketStatusEnum.new)}
      >
        New
      </button>
      <button 
        className={`${baseStyles} ${isSelected(SupportTicketStatusEnum.inProgress)}`} 
        onClick={() => handleTabClick(SupportTicketStatusEnum.inProgress)}
      >
        In Progress
      </button>
      <button 
        className={`${baseStyles} ${isSelected(SupportTicketStatusEnum.resolved)}`} 
        onClick={() => handleTabClick(SupportTicketStatusEnum.resolved)}
      >
        Resolved
      </button>
    </div>
  );
}

