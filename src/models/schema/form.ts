import { z, ZodType } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    name: z.string(),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords tidak sama",
    path: ["confirmPassword"],
  });
