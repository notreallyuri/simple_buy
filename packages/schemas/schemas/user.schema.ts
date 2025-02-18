import { number, z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(4, "Username must be at least 4 character(s)"),
  password: z.string().min(8, "Password must be at least 8 character(s)"),
  email: z.string().email("Please write a valid email"),
  name: z.string().min(8),
  age: z.coerce.number().min(18, "You must be at least 18 years old"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 character(s)")
    .optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = userSchema.partial().omit({
  createdAt: true,
});

export type UserType = z.infer<typeof userSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
