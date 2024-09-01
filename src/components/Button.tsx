import { useFormStatus } from "react-dom";

interface ButtonProps {
  name: string;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}
export default function Button({
  type = "button",
  name,
  className,
  onClick,
}: ButtonProps) {

  const { pending } = useFormStatus()

  return (
    <button
      type={type}
      onClick={onClick}
      aria-disabled={pending}
      disabled={pending}
      className={`w-full bg-green-600 text-white px-3 py-2 rounded-md transition-colors hover:bg-green-400 ${className}`}
    >
      {pending ? '...' : name}
    </button>
  );
}
