'use client';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

export default function BackButton({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  const router = useRouter();
  return (
    <button className={`${className} text-gray-600`} onClick={() => router.back()}>
      <span className="flex justify-center align-center items-center gap-1"><FaChevronLeft /> {label}</span>
    </button>
  );
};