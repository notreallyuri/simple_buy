import z from "zod";
import { router, publicProcedure } from "@/libs/trpc";
import { productSchema } from "./product.schema";
import { productService } from "./product.service";

export const productRouter = router({
  create: publicProcedure.input(productSchema).mutation(async ({ input }) => {
    const product = await productService.create(input);

    return {
      message: "✅ Product created successfully",
      product,
    };
  }),

  getById: publicProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ input }) => {
      const product = await productService.findById(input.productId);

      if (!product) throw new Error("Product not found");

      return { product };
    }),

  getAll: publicProcedure.query(async () => {
    const products = await productService.findAll();

    return { products };
  }),

  update: publicProcedure
    .input(z.object({ productId: z.number(), data: productSchema }))
    .mutation(async ({ input }) => {
      const product = await productService.update(input.productId, input.data);

      return {
        message: "✅ Product updated successfully!",
        product,
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await productService.delete(input.id);

      return {
        message: "✅ Product deleted successfully!",
      };
    }),
});
