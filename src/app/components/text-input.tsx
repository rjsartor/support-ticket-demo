import { FC } from "react";

interface TextInputProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  name: any;
  multi?: boolean;
  type?: string;
  pattern?: string;
};

export const StyledTextInput: FC<TextInputProps> = ({ label, name, multi = false, ...rest }) => {
  return (
    <div className="w-3/4 md:w-3/4 flex flex-col md:mt-2 mt-8 mb-4">
      <label className="font-semibold text-gray-800">{label}</label>
      {multi ? (
        <textarea 
          className="text-gray-500 p-3 border rounded border-gray-300 mt-1 resize-none"
          name={name}
          required
          {...rest}
        />
      ) : (
        <input 
          type="text" 
          className="text-gray-500 p-3 border rounded border-gray-300 mt-1"
          name={name}
          required
          {...rest}
        />
      )}
    </div>
  );
};