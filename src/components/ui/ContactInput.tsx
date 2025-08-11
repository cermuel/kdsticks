interface ContactInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const ContactInput = ({
  id,
  name,
  label,
  onChange,
  error,
  ...rest
}: ContactInputProps) => {
  return (
    <div className="relative w-full text-white">
      <input
        id={id}
        name={name}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full border-b bg-transparent outline-none py-2 text-white 
          ${error ? "border-red-500" : "border-white"} focus:border-white`}
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute peer-[&:not(:placeholder-shown)]:top-[-0.5rem]
peer-[&:not(:placeholder-shown)]:text-[8px] uppercase font-bold text-xs left-0 top-2 text-white transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-white peer-focus:text-[8px] peer-focus:top-[-0.5rem] peer-focus:text-white"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ContactInput;
