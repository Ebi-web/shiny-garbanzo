import { api } from "~/utils/api";
import { chatSchema } from "~/schema/gpt";

interface UseGPTProps {
  onSuccess?:
    | ((
        data: { text: string },
        variables: typeof chatSchema.shape,
        context: unknown
      ) => unknown)
    | undefined;
}

export function useGPT({ onSuccess }: UseGPTProps = {}) {
  const chatMutation = api.gpt.chat.useMutation({
    onSuccess: (data) => {
      onSuccess?.(data, chatSchema.shape, undefined);
    },
  });

  return { chatMutation };
}
