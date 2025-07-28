import React from "react";
import { ErrorMessage } from "./ErrorMessage";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  autoFocus?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  id,
  name,
  type = "text",
  autoFocus = false,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-slate-800">
        {label}
      </label>
      <div>
        <input
          autoFocus={autoFocus}
          className={`px-3 py-2 bg-gray-300/40 rounded w-full ${
            error ? "border border-red-500" : ""
          }`}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
};

export default InputField;
