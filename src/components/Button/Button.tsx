import { ButtonProps } from "./Button.types";

const variantClasses: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-600",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

function Button({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        rounded-md font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
        `}
    >
        {isLoading ? 'Loading' : label}
    </button>
  );
}

export default Button
