export type ProductFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  requestId: number;
  values?: Record<string, string | number>;
};

export type Category = { id: number; name: string };
