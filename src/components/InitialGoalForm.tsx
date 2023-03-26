import { Button, TextInput } from "@mantine/core";
import React, { useCallback } from "react";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";

export const InitialGoalForm: React.FC = () => {
  const updateInitialGoalText = useStore((state) => state.setInitialGoalText);
  const updatePreviousSteps = useStore((state) => state.setPreviousSteps);
  const { initialGoalText } = useStore();

  const { chatMutation } = useGPT({
    onSuccess: (res) => {
      try {
        const vars = JSON.parse(res.text) as string[];
        updatePreviousSteps(vars);
      } catch (error) {
        console.error(error);
        return;
      }
    },
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const processedText = generateChatPrompt(initialGoalText);
      chatMutation.mutate({ text: processedText });
    },
    [chatMutation, initialGoalText]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
    >
      <TextInput
        required
        withAsterisk
        id="text"
        label="What do you want to do?"
        radius="sm"
        placeholder="Enter text here"
        onChange={(e) => {
          updateInitialGoalText(e.target.value);
        }}
      />
      <Button
        variant="gradient"
        color="blue"
        style={{ marginTop: 8 }}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

function generateChatPrompt(text: string): string {
  return `{Goal} = ${text}
  
{Goal}を達成したいです。そのために必要な工程をstep by stepで分解して洗い出し、配列形式で出力してください。
配列形式とは、[要素1, 要素2, 要素3, ...]のように、要素をカンマで区切って並べたものです。各要素はダブルクォーテーションで囲ってください。`;
}
