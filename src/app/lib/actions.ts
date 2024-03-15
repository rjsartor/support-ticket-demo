'use server';
import { z } from 'zod';
import { SupportTicketStatusValues } from "./definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';

// This file contains the Server Actions for creating and updating tickets. 
// Ideally I would move this postgres actions into their own service, ie. TicketsService, 
// so they can be used outside of just server actions. 
// As the app grows in size I would also create a generic PostgresService that the individual resource
// services would use/inherit from.
 
const CreateTicketSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  description: z.string(),
});

export async function createTicket(formData: FormData) {
  const { name, email, description } = CreateTicketSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    description: formData.get('description'),
  });
 
  try {
    const record = await sql`
      INSERT INTO support_tickets (name, email, description)
      VALUES (${name}, ${email}, ${description})
      RETURNING id
    `;

    revalidatePath('/admin/tickets');
    return record;''
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Ticket.',
    };
  };
};

const UpdateStatusSchema = z.object({
  id: z.string(),
  status: z.enum(SupportTicketStatusValues),
});

export async function updateStatus(formData: FormData) {
  const { id, status } = UpdateStatusSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
  });
 
  try {
    const record = await sql`
      UPDATE support_tickets SET status = ${status}
      WHERE id = ${id}
      RETURNING id
    `;
    revalidatePath(`/admin/ticket/${id}`);
    return record;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Ticket Status.',
    };
  };
};

const UpdateResponseSchema = z.object({
  id: z.string(),
  response: z.string(),
});

export async function updateResponse(formData: FormData) {
  const { id, response } = UpdateResponseSchema.parse({
    id: formData.get('id'),
    response: formData.get('response'),
  });

  console.log(`Would normally send email here with body: ${response}`);

  return id;
 
  // const record = await sql`
  //   UPDATE support_tickets SET response = ${response}
  //   WHERE id = ${id}
  //   RETURNING id
  // `;

  // revalidatePath(`/admin/ticket/${id}`);
  // return record;
};