import axios from "axios";
import { type Role } from "~/schema/gpt";

interface ChatCompletionResponse {
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

interface Message {
  role: Role;
  content: string;
}

interface RequestOptions {
  messages: Message[];
  model?: string;
  max_tokens?: number;
  n?: number;
}

export async function sendChatCompletionRequest(
  options: RequestOptions
): Promise<string | undefined> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return undefined;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const defaultOptions = {
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    n: 1,
  };

  const body = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await axios.post<ChatCompletionResponse>(
      "https://api.openai.com/v1/chat/completions",
      body,
      config
    );

    const message = response?.data?.choices?.[0]?.message?.content?.trim();
    return message || undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
