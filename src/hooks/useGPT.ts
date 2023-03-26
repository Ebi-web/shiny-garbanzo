import { api } from "~/utils/api";

interface UseGPTProps {
  onSuccess?:
    | ((
        data: { text: string },
        variables: { text: string },
        context: unknown
      ) => unknown)
    | undefined;
}

export function useGPT({ onSuccess }: UseGPTProps = {}) {
  const chatMutation = api.gpt.chat.useMutation({ onSuccess });

  return { chatMutation };
}
