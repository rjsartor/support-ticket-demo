'use client';
import { FC } from "react";
import { updateStatus } from "../../lib/actions";
import { SupportTicketStatusEnum } from "../../lib/definitions";

export const UpdateStatusForm: FC<{ status: SupportTicketStatusEnum, id: string }> = ({ status, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const form = e.target.form;
    if (form) form.requestSubmit();
  };

  return (
    <form action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        defaultValue={status}
        className="mt-1 block w-1/2 pl-1 py-2 text-gray-900 border-b border-gray-400"
        name='status'
        onChange={handleChange}
      >
        {Object.values(SupportTicketStatusEnum).map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </form>
  )
}