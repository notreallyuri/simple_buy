import { z } from "zod";
import { purchaseSchema } from "./purchase/purchase.schema";
import { Prisma } from "@prisma/client";

export const userSchema = z.object({
  id: z.string().uuid().optional(), // Optional for creation
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be positive"),
  phone: z.string().min(1, "Phone is required"),
  bornAt: z.date(),
  Purchases: z.array(purchaseSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type userType = Omit<z.infer<typeof userSchema>, "Purchases"> & {
  Purchases?: Prisma.PurchaseCreateNestedManyWithoutByUserInput;
};
