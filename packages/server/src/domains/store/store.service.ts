import { type storeType } from "./store.schema";
import { prisma } from "@/libs/prisma";

export const storeService = {
  async create(data: storeType) {
    const store = await prisma.store.create({
      data: {
        ...data,
      },
      include: {
        products: true,
      },
    });

    return store;
  },

  async findById(id: string) {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    return store;
  },

  async findAll() {
    const stores = await prisma.store.findMany({ include: { products: true } });
    return stores;
  },

  async update(id: string, data: Partial<storeType>) {
    const store = await prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
      include: {
        products: true,
      },
    });

    return store;
  },

  async delete(id: string) {
    await prisma.store.delete({
      where: { id },
    });
  },
};
