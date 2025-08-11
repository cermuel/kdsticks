import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export type Option = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  className?: string;
  buttonClassname?: string;
  optionClassname?: string;
};

export default function CustomDropdown({
  options,
  onSelect,
  placeholder = "Select an option",
  className = "",
  buttonClassname,
  optionClassname,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#737cde] cursor-pointer flex justify-between items-center text-black font-semibold text-sm px-4 py-2.5 rounded-sm text-left shadow-md hover:bg-[#636dd0] transition ${buttonClassname}`}
      >
        {selected ? selected.label : placeholder}
        <BiChevronDown
          className={`${open && "rotate-180"} transition-all duration-300 size-6`}
        />
      </button>

      {open && (
        <div
          className={`${optionClassname} absolute top-full mt-1 w-[70%] max-h-40 overflow-y-scroll  text-xs text-black font-semibold bg-[#636dd0] rounded-sm shadow-lg z-10`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-2.5 py-2 text-sm text-black/60 hover:text-black cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
