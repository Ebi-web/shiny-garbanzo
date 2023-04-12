import { Button, TextInput } from "@mantine/core";
import React, { useCallback } from "react";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Role } from "~/schema/gpt";
import { extractFirstArray } from "~/utils/array";

export const InitialGoalForm: React.FC = () => {
  const updateInitialGoalText = useStore((state) => state.setInitialGoalText);
  const updatePreviousSteps = useStore((state) => state.setPreviousSteps);
  const { initialGoalText } = useStore();

  const { chatMutation } = useGPT({
    onSuccess: (res) => {
      try {
        const vars = extractFirstArray(res.text);
        if (vars == null) {
          window.alert("Something went wrong. Please try again.");
          return;
        }
        updatePreviousSteps(vars);
      } catch (error) {
        console.error(error);
        window.alert("Something went wrong. Please try again.");
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
            content: `{Goal}=${s}. I want to achieve {Goal}. Please break down and identify the process required to achieve this step by step.Output style must be [{step1}, {step2}, ..., {stepn}].`,
          },
          {
            role: Role.System,
            content: "lang=ja",
          },
          {
            role: Role.User,
            content: `Output example when {Goal} is 'Make a cake': [材料を準備する, 材料を混ぜる, ケーキを焼く, ケーキを飾りつける]`,
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
