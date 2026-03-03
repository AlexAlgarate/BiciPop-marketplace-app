type Props = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
  placeholder: string;
};

export function FormField({
  label,
  name,
  type = 'text',
  defaultValue,
  error,
  placeholder,
}: Props) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        // required
        className={[
          'w-full rounded border bg-background px-3 py-2 text-sm',
          error
            ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
            : 'border-border',
        ].join(' ')}
      />

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
