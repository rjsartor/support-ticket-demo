"use client";
import { FC, useRef } from "react";
import { StyledTextInput } from "../text-input";
import { updateResponse } from "../../lib/actions";
import Button from "../button";
import { SupportTicket } from "@/app/lib/definitions";

// Another simple form for utilizing the native HTML formData and to call the Server Action.
export const TicketResponseForm: FC<{ ticket: SupportTicket }> = ({ ticket }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {

    formData.append('ticket', JSON.stringify(ticket));

    try {
      // await updateResponse(formData);
      const response = await fetch('/admin/ticket/api', { // Adjust your API endpoint as needed
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        formRef.current?.reset(); // Optionally reset the form on success
        // Handle success (e.g., showing a success message)
      } else {
        // Handle errors (e.g., displaying an error message)
        const errorText = await response.text();
        console.error('Failed to submit ticket response:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors or show a fallback message
    }
  }
 
  return (
    <form 
      ref={formRef}
      className="mt-6 flex flex-col"
      action={handleSubmit}
    >
      <StyledTextInput label="Response" name="response" multi={true} />
      <Button label="Send Response" />
    </form>
  )
};
