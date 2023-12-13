import { InputProps } from "./SignUp";

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
        className="w-64 h-12 pl-3 rounded-lg flex items-center justify-center"
        name={name}
        type={type}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </label>
  );
};
