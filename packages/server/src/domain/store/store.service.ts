import { prisma } from "@acme/lib";
import { type CreateStoreType, type UpdateStoreType } from "./store.schema";

export const storeService = {
  async create(data: CreateStoreType) {
    try {
      const store = await prisma.store.create({
        data,
      });

      return {
        message: "Store Created Successfully",
        store,
      };
    } catch (err) {
      return { error: "Failed Creating Store" };
    }
  },
  async update(id: string, data: UpdateStoreType) {
    try {
      const store = await prisma.store.update({ where: { id }, data });

      return {
        message: "Store Updated Successfully",
        store,
      };
    } catch (err) {
      return {
        error: "Failed Updating Store",
      };
    }
  },
  async delete(id: string) {
    try {
      const store = prisma.store.findUnique({ where: { id } });

      if (!store) return { error: "Failed To Find Store" };

      await prisma.store.delete({ where: { id } });

      return {
        message: "Store Deleted Successfully",
      };
    } catch (err) {
      return {
        error: "Failed Deleting Store",
      };
    }
  },

  async getAll() {
    const stores = await prisma.store.findMany();

    if (!stores) return { error: "Failed fetching stores" };

    return stores;
  },
  async getByID(id: string) {
    const store = await prisma.store.findUnique({ where: { id } });

    if (!store) return { error: "Store not found" };

    return store;
  },
};
