import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(3, "Минимум 3 символа"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
