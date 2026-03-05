export type ProductFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  requestId: number;
};

export type Category = { id: number; name: string };
