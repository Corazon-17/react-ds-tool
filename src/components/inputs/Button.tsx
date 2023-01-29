import { BaseComponent } from "@/types";

interface ButtonProps extends BaseComponent {
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
}

export function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`w-max px-4 py-1.5 rounded-md bg-blue-600 text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
