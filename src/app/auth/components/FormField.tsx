import { FieldError } from '@/components/FieldError';

type Props = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string | string[];
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
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={[
          'w-full rounded-lg border bg-background px-3 py-2 text-sm',
          error
            ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
            : 'border-border focus:outline-none focus:ring-2 focus:ring-primary/20',
        ].join(' ')}
      />

      <FieldError error={error} />
    </div>
  );
}
