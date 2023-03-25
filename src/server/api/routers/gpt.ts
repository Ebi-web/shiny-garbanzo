import z from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gptRouter = createTRPCRouter({
  chat: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        text: `Hello ${input.text}`,
      };
    }),
});
