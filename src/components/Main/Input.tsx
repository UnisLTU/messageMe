import { ChangeEvent } from "react";

interface InputProps {
  labelText: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  name: string;
}

export const Input = ({
  labelText,
  type,
  maxLength,
  handleChange,
  name,
}: InputProps) => {
  return (
    <label>
      {labelText}
      <input
        required
        className="w-64 h-12 pl-3 rounded-lg flex items-center justify-center dark:bg-slate-300 dark:text-black"
        name={name}
        type={type}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </label>
  );
};
