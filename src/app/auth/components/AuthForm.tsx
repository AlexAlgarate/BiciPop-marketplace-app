'use client';

import { useActionState, useEffect } from 'react';
import { AuthFormState, initialRegisterState } from '../types';
import { FormField } from './FormField';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
};

interface Props {
  action: (_prevState: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  fields: FieldConfig[];
  submitText: string;
}

export const AuthForm = ({ action, fields, submitText }: Props) => {
  const router = useRouter();
  const [state, formAction] = useActionState(action, initialRegisterState);

  useEffect(() => {
    if (state.success) {
      const time = setTimeout(() => {
        router.push('/');
      }, 1500);
      return () => clearTimeout(time);
    }
  }, [router, state.success]);

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

      <Button
        type="submit"
        className="rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
      >
        {submitText}
      </Button>

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
