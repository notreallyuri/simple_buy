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

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userSchemaWithRelations = userSchema.extend({
  Purchases: z.array(purchaseSchema).optional(),
});

export type userType = z.infer<typeof userSchema>;

export type userWithRelationType = Omit<
  z.infer<typeof userSchemaWithRelations>,
  "Purchases"
> & {
  Purchases?: Prisma.PurchaseCreateNestedManyWithoutByUserInput;
};
