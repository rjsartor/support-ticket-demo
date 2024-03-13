"use client";
import axios from "axios";
import { FC, useState } from "react";
import TextInput from "./textInput";

export type CreateTicketFormData = {
  name: string;
  email: string;
  description: string;
}

const initialFormData: CreateTicketFormData = {
  name: '',
  email: '',
  description: '',
}

export const CreateTicketForm: FC = () => {
  const [formData, setFormData] = useState<CreateTicketFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormChange = (key: keyof CreateTicketFormData, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/api/tickets', formData);
      setFormData(initialFormData);
      setMessage('Your ticket was submitted! Please wait while we resolve the issue.');
      console.log(response.data);
    } catch (error) {
      setError('There was an error processing your ticket. Please try again.');
      console.error('There was an error submitting the ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
    
    console.log(`Would normally send email here with body: ${JSON.stringify(formData)}`);
    
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <div className="md:flex items-center flex-wrap mt-4">
        <TextInput label='Name' formKey='name' onChange={handleFormChange}  />
        <TextInput label='Email' formKey='email' onChange={handleFormChange}  />
        <TextInput label='Description' formKey='description' onChange={handleFormChange} multi={true} />
      </div>

      <div className="flex items-center justify-between mt-8">
        <button 
          className="py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs font-semibold"
        >
          Submit Ticket
        </button>
      </div>
    </form>
  )
}
