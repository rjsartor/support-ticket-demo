import { ChangeEvent, FC } from "react";
import { CreateTicketFormData } from "./createTicketForm";

type TextInputProps = {
  formKey: keyof CreateTicketFormData;
  label: string;
  onChange: (formKey: keyof CreateTicketFormData, value: string) => void;
  multi?: boolean;
}

const TextInput: FC<TextInputProps> = ({ formKey, label, onChange, multi = false }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(formKey, e.target.value);
  }

  return (
    <div className="w-3/4 md:w-1/2 flex flex-col md:ml-6 md:mt-2 mt-8">
      <label className="font-semibold leading-none text-gray-800">{label}</label>
      {multi ? (
        <textarea 
          className="leading-none text-gray-500 p-3 border rounded border-gray-300 mt-4 resize-none"
          onChange={handleChange}
        />
      ) : (
        <input 
          type="text" 
          className="leading-none text-gray-500 p-3 border rounded border-gray-300 mt-4"
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default TextInput;
