import { type purchaseItemType } from "./purchase_item.schema";
import { prisma } from "@/libs/prisma";

export const purchaseItemService = {
  async create(data: purchaseItemType) {
    return await prisma.purchaseItem.create({
      data: {
        ...data,
      },
    });
  },

  async findAll(id: number) {
    return await prisma.purchaseItem.findUnique({
      where: { id },
    });
  },

  async delete(id: number) {
    return await prisma.purchaseItem.delete({
      where: { id },
    });
  },
};
