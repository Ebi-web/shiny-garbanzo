import PreviousStepsTable from "~/components/PreviousStepsTable";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Button } from "@mantine/core";
import React, { useCallback } from "react";
import { Role } from "~/schema/gpt";

interface Props {
  steps: string[];
}

export const PreviousStepsForm: React.FC<Props> = (props) => {
  const { steps } = props;
  const updateVariables = useStore((state) => state.setVariables);
  const updatePreviousSteps = useStore((state) => state.setPreviousSteps);
  const initialGoal = useStore((state) => state.initialGoalText);

  const { chatMutation } = useGPT({
    onSuccess: (res) => {
      try {
        const vars = JSON.parse(res.text) as Record<string, string>;
        updateVariables(vars);
      } catch (error) {
        console.error(error);
        return;
      }
    },
  });

  const mutateChat = useCallback(
    (steps: string[]) => {
      const prompt = {
        messages: [
          {
            role: Role.User,
            content: "全ての{Steps}から可変な変数を取り出してください。",
          },
          {
            role: Role.System,
            content: "{Goal}を達成したいです。",
          },
          {
            role: Role.System,
            content: `{Goal}=${initialGoal}`,
          },
          {
            role: Role.System,
            content: "日本語で出力してください",
          },
          {
            role: Role.System,
            content: `出力はJSON形式で変数のみを羅列してください。それ以外の形式や余計な情報は含めないでください。`,
          },
          {
            role: Role.System,
            content: `例: {"材料": "牛肉", "調味料": ["塩","胡椒"]}`,
          },
          {
            role: Role.Assistant,
            content: `{Steps}=${JSON.stringify(steps)}`,
          },
        ],
      };
      chatMutation.mutate(prompt);
    },
    [chatMutation, initialGoal]
  );

  if (!steps.length) {
    return null;
  }
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutateChat(steps);
  };

  return (
    <>
      <PreviousStepsTable
        steps={steps}
        updatePreviousSteps={updatePreviousSteps}
      />
      <Button
        variant="gradient"
        color="blue"
        style={{ marginTop: 8 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};
