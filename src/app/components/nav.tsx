'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { SupportTicketStatusEnum } from '../lib/definitions';

enum Pathnames {
  ticket = '/',
  admin = '/admin',
}

export default function Nav() {
  const pathname = usePathname();
  const selectedClassNames = 'px-4 py-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold';

  return (
    <nav className="flex flex-col min-w-72 max-w-72 h-screen px-4 py-8 bg-gray-200 border-r border-gray-300 text-gray-900">
      <div className="flex flex-col h-full">
        <div 
          className={`m-4 p-4 flex items-center ${pathname === Pathnames.ticket ? selectedClassNames : ''}`}
        >
          <AiOutlineMail className="mr-2" /> 
          <Link href="/">Support Ticket</Link>
        </div>
        <div 
          className={`m-4 p-4 flex items-center ${pathname.startsWith(Pathnames.admin) ? selectedClassNames : ''}`}
        >
          <FiLock className="mr-2" /> 
          <Link 
            href={`${Pathnames.admin}/tickets?status=${SupportTicketStatusEnum.new}&page=1`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};