import { prisma } from "@acme/lib";
import type { CreateUserType, UpdateUserType } from "@acme/schemas";

export const userService = {
  async create(data: CreateUserType) {
    const { email, password, ...rest } = data;
    const hash = await Bun.password.hash(password);
    try {
      return await prisma.user.create({
        data: { email, password: hash, ...rest },
      });
    } catch (err) {
      console.error("Error Creating user:", err);
      throw err;
    }
  },
  async update(id: string, data: UpdateUserType) {
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
