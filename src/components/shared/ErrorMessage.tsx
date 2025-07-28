interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export const ErrorMessage = ({
  children,
  className = "",
}: ErrorMessageProps) => {
  return <small className={`text-red-500 ${className}`}>{children}</small>;
};
