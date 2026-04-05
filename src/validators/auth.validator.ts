import { z } from "zod";

const ALLOWED_ROLES = ["admin", "user", "teacher"] as const; // example

export const registerSchema = z
  .object({
    userName: z.string().min(1, "User name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters long"),

    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),

    organizationName: z.string().optional(),

    parentNumber: z
      .string()
      .regex(/^\d+$/, "Parent number must be numeric")
      .optional(),

    subjects: z.array(z.string()).min(1, "Subjects are required"),

    role: z.enum(ALLOWED_ROLES, {
      message: "Invalid role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type IRegisterRequest = z.infer<typeof registerSchema>;
export type ILoginRequest = z.infer<typeof loginSchema>;
export type ILogoutParams = {
  refreshToken: string;
  accessToken: string;
};
