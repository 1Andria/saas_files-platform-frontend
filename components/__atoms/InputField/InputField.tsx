interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: boolean;
}

export const InputField = ({
  icon,
  error,
  className,
  ...props
}: InputFieldProps) => (
  <div className="relative">
    {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
    <input
      {...props}
      className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 transition-colors ${
        error
          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
          : "border-gray-600 focus:ring-blue-500 focus:border-blue-500"
      } ${className}`}
    />
  </div>
);
