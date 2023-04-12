import PreviousStepsTable from "~/components/PreviousStepsTable";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Button } from "@mantine/core";
import React, { useCallback } from "react";
import { Role } from "~/schema/gpt";
import { extractFirstArray, extractFirstJSON } from "~/utils/array";

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
        const vars = extractFirstJSON(res.text);
        if (!vars) return;
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
        temperature: 0,
        messages: [
          {
            role: Role.User,
            // 一括でまるっと出してみる(Yudaiの例)
            content: `Extract the variables in {Steps} that can be changed or arranged, and create the variable name and the contents of the variable. Now output the JSON of set of variable names and their contents.`,
          },
          {
            role: Role.User,
            content: "I want to achieve {Goal}.",
          },
          {
            role: Role.User,
            content: `{Goal}=${initialGoal}`,
          },
          {
            role: Role.System,
            content: "lang=ja",
          },
          {
            role: Role.System,
            content: `You are an API that provides structured JSON responses.`,
          },
          {
            role: Role.User,
            // Goalも入れた方が良いかも。あるいはshotを増やすか？
            content: `Example when input if {Goal}=カレーを料理する {Steps}=[
    "材料を準備する,
    "お米をといで炊飯器で炊く",
    "野菜と肉や魚を切って調味料で味付けする",
    "フラインパンで野菜と肉や魚を炒める",
    "野菜と肉や魚を炒め、カレールーと水を加えて煮込む",
    "カレーを炊き上がったご飯に添える"
] then Your output should be as follows:
"""JSON
 {"ingredients": "牛肉", "seasoning": ["塩", "胡椒"]}
"""
 `,
          },
          {
            role: Role.User,
            content: `Here, you store the steps needed to realize the {Goal} in a variable of type str named step1, step2, ..., stepn.
{Steps} = [{step1}, {step2}, ..., {stepn}] {Steps}=${JSON.stringify(steps)}`,
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
