interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string[];
  children: React.ReactNode;
}

export const FormField = ({ label, htmlFor, error, children }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>

      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
