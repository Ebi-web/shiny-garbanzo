import axios from "axios";

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

export async function sendChatCompletionRequest(
  prompt: string
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

  const body = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    n: 1,
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
