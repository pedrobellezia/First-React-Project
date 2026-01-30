import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded border border-black bg-white text-black hover:bg-black hover:text-white transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
