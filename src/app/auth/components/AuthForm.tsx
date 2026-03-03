'use client';

import { useActionState } from 'react';
import { AuthFormState, initialRegisterState } from '../types';
import { FormField } from './FormField';

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
};

type Props = {
  action: (_prevState: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  fields: FieldConfig[];
  submitText: string;
};

export const AuthForm = ({ action, fields, submitText }: Props) => {
  const [state, formAction] = useActionState(action, initialRegisterState);

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-card p-6 space-y-4"
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          defaultValue={state.values?.[field.name]}
          error={state.errors?.[field.name]?.[0]}
          placeholder={field.placeholder}
        />
      ))}

      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        {submitText}
      </button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};
