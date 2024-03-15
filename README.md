### https://support-ticket-demo.vercel.app/

This application is a Ticket Support System demo built with Next.js and Tailwind, persisted with PostgreSQL and deployed with Vercel. The focus of this exercise was getting more familiar with Next.js App Router and Server Actions, using SSR and Server Components as much as possible.

The application includes 3 pages. The first is the Create Ticket home screen at '/':
![Home Page](/public/create-ticket-page.png)

Here a user can submit new tickets. There is HTML form validation in the frontend and schema validation in the backend.

The second is Ticket List at '/admin/tickets': 
![Tickets List](/public/admin-ticket-list-page.png)

This is a server-side paginated list of submitted tickets, displayed by their status. Admins can view tickets of different status by using the tabs.

The last is a detailed ticket view at '/admin/ticket/[id]':
![Ticket Details](/public/admin-ticket-details.png)


This displays all ticket details as well provides inputs to update ticket status and send a response message. No response message is actually being sent yet, but that functional will come later.

All application code is stored in src/app. It's organized following Next's file-system based router where folders are used to define routes and the `page.tsx` files represent pages. 
All other components live in `components/` or `components/forms` directories.
The `lib` directory contains the server actions and definitions.

