"use client";
import { FC, useRef } from "react";
import { StyledTextInput } from "../text-input";
import { updateResponse } from "../../lib/actions";
import Button from "../button";

export const TicketResponseForm: FC<{ id: string }> = ({ id }) => {
  const formRef = useRef<HTMLFormElement>(null);
 
  return (
    <form 
      ref={formRef}
      className="mt-6 flex flex-col"
      action={async (formData) => {
        const id = await updateResponse(formData);
        if (id) formRef.current?.reset();
      }}
    >
      <StyledTextInput label="Response" name="response" multi={true} />
      <input type="hidden" name="id" value={id} />
      <Button label="Send Response" />
    </form>
  )
};
