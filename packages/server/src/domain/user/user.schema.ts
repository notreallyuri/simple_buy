import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
  name: z.string(),
  age: z.number().int().positive(),
  phone: z.string().min(10).optional(),
  bornAt: z.coerce.date(),
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
