import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const registerSchema = authSchema
  .extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type AuthInput = z.infer<typeof authSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
