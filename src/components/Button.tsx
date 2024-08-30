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
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-600 text-white px-3 py-2 rounded-md transition-colors hover:bg-green-400 ${className}`}
    >
      {name}
    </button>
  );
}
