import { CreateTicketForm } from "./createTicketForm";

export default function Home() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl font-semibold text-gray-700">Create New Ticket</h1>
        <p className="text-gray-600">Fill out the form and then submit your ticket.</p>
        <CreateTicketForm />
      </div>
    </div>
  );
}
