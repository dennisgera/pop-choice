interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium text-lg transition-colors";
  const variantStyles = {
    primary: "bg-green-400 hover:bg-green-500 text-gray-900",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
