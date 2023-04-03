import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendChatCompletionRequest } from "~/server/lib/gpt/chat";
import { chatSchema } from "~/schema/gpt";

export const gptRouter = createTRPCRouter({
  chat: publicProcedure.input(chatSchema).mutation(async ({ input }) => {
    try {
      const response = await sendChatCompletionRequest(input);
      const text = response ? response : "I don't know what to say.";
      return { text };
    } catch (error) {
      console.error(error);
      return { text: "An error occurred while fetching response." };
    }
  }),
});
