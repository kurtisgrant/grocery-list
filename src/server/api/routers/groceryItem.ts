import { GroceryItem } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const groceryItemRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.groceryItem.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.groceryItem.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const groceryItem = await ctx.db.groceryItem.findUnique({
        where: { id: input.id },
      });

      if (groceryItem?.createdById !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }

      return ctx.db.groceryItem.delete({
        where: { id: input.id },
      });
    }),

});
