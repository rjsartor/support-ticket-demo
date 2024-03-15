'use client';
import { StyledTextInput } from "../text-input";
import React, { useState } from 'react';
import { createTicket } from '../../lib/actions';
import { useRef } from 'react'
import Button from "../button";

export type CreateTicketFormData = {
  name: string;
  email: string;
  description: string;
};

export function CreateTicketForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const id = await createTicket(formData);
        if (id) {
          formRef.current?.reset();
          setSuccess('Your ticket was submitted and we are working on a solution!');
        } else {
          setError('There was a problem with your request. Please try again.');
        }
      }}
    >
      {success && <p className='text-blue-500 mt-4'>{success}</p>}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
      <div className="mt-4 flex flex-wrap">
        <StyledTextInput label='Name' name='name' />
        <StyledTextInput label='Email' name='email' type='email' pattern="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/" />
        <StyledTextInput label='Description' name='description' multi={true} />
      </div>
      <Button label="Submit Ticket" />
    </form>
  );
};