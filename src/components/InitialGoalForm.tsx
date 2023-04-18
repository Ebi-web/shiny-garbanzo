import { Button, TextInput } from "@mantine/core";
import React, { useCallback } from "react";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Role } from "~/schema/gpt";
import { parseSteps, parseTrueGoal, parseVariables } from "~/utils/array";

export const InitialGoalForm: React.FC = () => {
  const updateInitialGoalText = useStore((state) => state.setInitialGoalText);
  const updatePreviousSteps = useStore((state) => state.setPreviousSteps);
  const updateVariables = useStore((state) => state.setVariables);
  const updateEnhancedGoal = useStore((state) => state.setEnhancedGoalText);
  const { initialGoalText } = useStore();

  const { chatMutation } = useGPT({
    onSuccess: (res) => {
      try {
        const vars = parseVariables(res.text);
        if (vars != null) {
          updateVariables(vars);
        }

        const steps = parseSteps(res.text);
        if (steps != null) {
          updatePreviousSteps(steps);
        }

        const enhancedGoal = parseTrueGoal(res.text);
        if (enhancedGoal != null) {
          updateEnhancedGoal(enhancedGoal);
        }
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
            content: `I want to achieve {Goal}. Please break down and identify the process required to achieve this step by step.
Here, you store the steps needed to realize the goal in a variable of type str named step1, step2, ..., stepn .
{Steps} = [{step1}, {step2}, ..., {stepn}]
Then extract the properties in {Steps} that can be changed or arranged, and create the variable name and the contents of the variable. Now output the set of variable names and their contents in JSON format.
{TrueGoal}: Use value of {Variables} to represent the redefinition of {Goal} in more detail.
output example when {Goal} = Cooking cury and rice is follow:
---
{step1} = 材料を準備する
{step2} = 米を研ぎ、炊飯器で炊く
{step3} = 野菜を切り、肉または魚を切って調味料で下味をつける
{step4} = フライパンで野菜と肉または魚を炒める
{step5} = 炒めた野菜と肉または魚にカレールーと水を加えて煮込む
{step6} = 煮込んだカレーと、炊いた米を盛り付ける
{Steps} = [
    “材料を準備する“,
    “米を研ぎ、炊飯器で炊く“,
    “野菜を切り、肉または魚を切って調味料で下味をつける“,
    “フライパンで野菜と肉または魚を炒める“,
    “炒めた野菜と肉または魚にカレールーと水を加えて煮込む“,
    “煮込んだカレーと、炊いた米を盛り付ける“
]
{Variables} = {
    “材料“: “牛肉“,
    “調味料“: [
        “塩”, “胡椒”
    ]
}
{TrueGoal} = Cooking curry and rice with beef and seasoning with salt and pepper
`,
          },
          {
            role: Role.System,
            content: "lang=ja",
          },
          {
            role: Role.User,
            content: `Now set {Goal}=${s}`,
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
