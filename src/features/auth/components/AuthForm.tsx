'use client';

import { type ReactNode, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { FormField } from './FormField';
import { Button } from '@/components/ui/Button';
import { AuthFormState, initialRegisterState } from '../types';

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
  footer?: ReactNode;
}

export const AuthForm = ({ action, fields, submitText, footer }: Props) => {
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
      className="rounded-lg border border-gray-200 dark:border-border bg-white dark:bg-card shadow-sm p-8 space-y-5"
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
        className="w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground py-2.5 mt-2"
      >
        {submitText}
      </Button>

      {footer && <div>{footer}</div>}

      {state.message && (
        <p
          className={`text-sm text-center ${
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
