import { Button, TextInput } from "@mantine/core";
import React, { useCallback } from "react";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Role } from "~/schema/gpt";

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

  const mutateChat = useCallback(
    (s: string) => {
      const prompt = {
        messages: [
          {
            role: Role.User,
            content: `{Goal}=${s}`,
          },
          {
            role: Role.System,
            content:
              "{Goal}を達成したいです。そのために必要な工程をstep by stepで分解して洗い出してください",
          },
          {
            role: Role.System,
            content: "日本語で回答してください",
          },
          {
            role: Role.System,
            content:
              "出力は[(step1の内容), (step2の内容), (step3の内容), ...,(step{END}の内容)]のようなTypeScriptの配列形式です。各stepはダブルクォーテーションで囲ってください。",
          },
        ],
      };
      chatMutation.mutate(prompt);
    },
    [chatMutation]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutateChat(initialGoalText);
    },
    [initialGoalText, mutateChat]
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
