import PreviousStepsTable from "~/components/PreviousStepsTable";
import { useGPT } from "~/hooks/useGPT";
import useStore from "~/store/gpt";
import { Button } from "@mantine/core";
import React from "react";

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

  if (!steps.length) {
    return null;
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const prompt = generateChatPrompt(steps, initialGoal);
    chatMutation.mutate({ text: prompt });
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

function generateChatPrompt(steps: string[], initialGoalText: string): string {
  const stepsStringWithQuotes = JSON.stringify(steps);
  const stepsStringWithoutQuotes = stepsStringWithQuotes.replace(/"/g, "");

  return `
  #[このコンテンツは [Goal] を SeekするためのTemplateです］
- このコンテンツを作成するための{Goal}です。
- [Goal]:${initialGoalText}
- Goalを達成するために必要な手順を分解します。
- 分解した手順はカンマ区切りで順番に格納されていて{Steps}の通りです。
- 変数を定義します。
-  Goalを達成するために必要な手順を分解します。
-  {Steps}: ${stepsStringWithoutQuotes}
- 各種変数を使用して、変数を減らすことができないか検対する
- [Goal]の定義を変数を使用して表すことで、［Goal]の設定だけで手順を分解できるようにしたい
- 変数をStepsから取り出して{Added variable}に格納する
- [Output style] :
- [Added variable]を辞書形式で一般化して書き出して下さい。それ以外は出力しないでください。
- lang:ja
  `;
}
