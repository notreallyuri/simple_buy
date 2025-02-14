import { type productType } from "./product.schema";
import { prisma } from "@/libs/prisma";

export const productService = {
  async create(data: productType) {
    const product = await prisma.product.create({
      data: {
        ...data,
      },
      include: {
        Store: true,
      },
    });

    return product;
  },

  async findById(productId: number) {
    const product = await prisma.product.findUnique({
      where: { productId },
      include: {
        Store: true,
      },
    });

    return product;
  },

  async findAll() {
    const products = await prisma.product.findMany({
      include: { Store: true },
    });
    return products;
  },

  async update(productId: number, data: Partial<productType>) {
    const product = await prisma.product.update({
      where: { productId },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
      include: {
        Store: true,
      },
    });

    return product;
  },

  async delete(productId: number) {
    await prisma.product.delete({
      where: { productId },
    });
  },
};
