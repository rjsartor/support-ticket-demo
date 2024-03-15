import { sql } from '@vercel/postgres';
import { SupportTicket, SupportTicketStatusEnum } from './definitions';

export const TICKET_OFFSET = 5;

// These queries would also be moved into their own TicketsService for better resuability and maintainability

export async function fetchTickets(status: SupportTicketStatusEnum, page?: number | undefined): Promise<any> {
  try {
    const _page = page || 1;

    const dataPromise = sql<SupportTicket>`SELECT id, name, status, created_at FROM support_tickets WHERE status = ${status} ORDER BY id DESC LIMIT ${TICKET_OFFSET} OFFSET ${Number(_page) - 1} * 5`;
    const countPromise = sql`SELECT COUNT(*) FROM support_tickets WHERE status = ${status}`;
    const [data, count] = await Promise.all([dataPromise, countPromise]);

    return { data: data.rows, rowCount: count.rows[0].count };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tickets.');
  }
}

export async function fetchTicketById(id: string) {
  try {
    const data = await sql<SupportTicket>`
      SELECT
        *
      FROM support_tickets
      WHERE support_tickets.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket.');
  }
}