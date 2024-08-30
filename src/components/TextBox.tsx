interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "password" | "text";
  placeholder?: string;
  className?: string;
}
export default function TextBox({
  type = "text",
  placeholder,
  className,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={
        className ? className : `w-full px-3 py-2 bg-neutral-200 rounded-md`
      }
    />
  );
}
