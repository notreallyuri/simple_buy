import { type PurchaseType } from "./purchase.schema";
import { prisma } from "@/libs/prisma";

export const purchaseService = {
  async create(data: PurchaseType) {
    return await prisma.purchase.create({
      data: {
        ...data,
      },
    });
  },

  async findByIdWithUserId() {},

  async findAllByUserId() {},

  async addItems() {},

  async delete() {},
};
