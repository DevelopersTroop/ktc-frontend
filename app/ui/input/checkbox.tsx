import React from "react";

const Checkbox = ({
  id = "",
  name = "",
  className = "",
  checked = false,
  onChange,
  ...props
}: {
  className?: string;
  id?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [field: string]: any;
  checked?: boolean;
}) => {
  return (
    <div className={`grid items-center justify-center ${className}`}>
      <input
        checked={checked}
        onChange={onChange}
        {...props}
        type="checkbox"
        id={id}
        name={name}
        className="peer row-start-1 col-start-1 appearance-none w-5 h-5 border ring-transparent border-slate-300 disabled:bg-gray-300 disabled:border-gray-300 checked:bg-secondary  checked:border-secondary"
      />
      <svg
        viewBox="0 0 14 14"
        fill="none"
        className="invisible p-0.5 peer-checked:visible row-start-1 col-start-1 stroke-white"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

export default Checkbox;
