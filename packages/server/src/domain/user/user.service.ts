import { prisma } from "@/lib/prisma";
import { type CreateUserType, type UpdatedUserType } from "./user.schema";

export const userService = {
  async create(data: CreateUserType) {
    try {
      const hash = await Bun.password.hash(data.password);

      const user = await prisma.user.create({
        data: {
          ...data,
          password: hash,

        },
      });

      return {
        message: "User Created Successfully",
        user,
      };
    } catch (err) {
      console.log("Error Creating User:", err);
      return { error: "Failed Creating User" };
    }
  },
  async update(id: string, data: UpdatedUserType) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });

      return {
        message: "User updated successfully",
        user,
      };
    } catch (err) {
      console.log("Error Updating User:", err);
      return { error: "Failed Updating User" };
    }
  },
  async delete(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) return { error: "User Not Found" };

      await prisma.user.delete({
        where: { id },
      });

      return {
        message: "User deleted successfully",
      };
    } catch (err) {
      console.log("Error Deleting User:", err);
      return {
        error: "Failed Deleting User",
      };
    }
  },

  async getAll() {
    const users = await prisma.user.findMany();

    if (!users) return { error: "Failed Fetching Users" };

    return users;
  },
  async getByID(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return { error: "User Not Found" };

    return user;
  },
};
