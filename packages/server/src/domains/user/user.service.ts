import { type userType } from "./user.schema";
import { prisma } from "@/libs/prisma";
import { hash } from "bcryptjs";

export const userService = {
  async create(data: userType) {
    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  },

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  },

  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  },

  async update(id: string, data: Partial<userType>) {
    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  },

  async delete(id: string) {
    await prisma.user.delete({
      where: { id },
    });
  },
};
