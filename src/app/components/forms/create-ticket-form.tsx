'use client';
import { StyledTextInput } from "../text-input";
import React, { useState } from 'react';
import { createTicket } from '../../lib/actions';
import { useRef } from 'react'
import Button from "../button";

export const EMAIL_REGEX_PATTERN = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";

export type CreateTicketFormData = {
  name: string;
  email: string;
  description: string;
};

// Because I wanted to experiment with Server Actions for this exercise, I initially
// wanted all my forms to be Server components. While it is possible to do this,
// I realized that there's little gain in keeping the whole form a server component (forms are naturally client components)
// because I can still utilize the Form Action field to call the server mutation. With more time
// I would probably refactor to managge form data in state as well (now that I changed it to a client component), 
// but managing the whole form with HTML isn't something I've done in a while and still works fine.
export function CreateTicketForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function create(formData: FormData) {
    try {
      await createTicket(formData);
      formRef.current?.reset();
      setSuccess('Your ticket was submitted and we are working on a solution!');
    } catch (e) {
      setError('There was a problem with your request. Please try again.');
    }
  }
  
  return (
    <form
      ref={formRef}
      action={async (formData) => create(formData)}
    >
      {success && <p className='text-blue-500 mt-4'>{success}</p>}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
      <div className="mt-4 flex flex-wrap">
        <StyledTextInput label='Name' name='name' />
        <StyledTextInput label='Email' name='email' type='email' pattern={EMAIL_REGEX_PATTERN} />
        <StyledTextInput label='Description' name='description' multi={true} />
      </div>
      <Button label="Submit Ticket" />
    </form>
  );
};