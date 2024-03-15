'use client';
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationControlsProps {
  currentPage: number, 
  totalPages: number,
};

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const paginationHref = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params}`;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (currentPage > totalPages) {
      router.push(paginationHref(totalPages));
    }
  }, [currentPage, totalPages, router, paginationHref]);

  return (
    <div className="text-gray-900 flex mt-4 justify-center gap-1 flex-col">
      <div className="flex gap-6 justify-center">
        <Link 
          href={paginationHref(prevPage)}
          className={currentPage <= 1 ? 'pointer-events-none' : ''} 
          aria-disabled={currentPage <= 1} 
          tabIndex={currentPage <= 1 ? -1 : undefined}
        >
          <span className="flex justify-center align-center items-center gap-1"><FaChevronLeft /> Prev</span>
        </Link>
        <Link 
          href={paginationHref(nextPage)}
          className={currentPage >= totalPages ? 'pointer-events-none' : ''} 
          aria-disabled={currentPage >= totalPages} 
          tabIndex={currentPage >= totalPages ? -1 : undefined}
        >
          <span className="flex justify-center align-center items-center gap-1"> Next <FaChevronRight /></span>
        </Link>
      </div>
      <span className="text-center">Page {currentPage} of {totalPages}</span>
    </div>
  );
};

