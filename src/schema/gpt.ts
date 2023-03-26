import z from "zod";

export const chatSchema = z.object({
  text: z.string(),
});

export type chatInput = z.TypeOf<typeof chatSchema>;
