"use server";
import { CreateTicketForm } from "./components/forms/create-ticket-form";
import Header from "./components/header";

export default async function Page() {
  return (
    <div className="bg-white p-8 xl:w-1/2 lg:w-2/3 md:w-full">
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-300">
        <Header header='Create New Ticket' subheader='Fill out the form and then submit your ticket.' />
        <CreateTicketForm />
      </div>
    </div>
  );
}
