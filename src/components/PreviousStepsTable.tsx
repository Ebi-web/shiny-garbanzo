import { useState } from "react";
import { Table, Button, TextInput } from "@mantine/core";

interface Props {
  steps: string[];
  updatePreviousSteps: (steps: string[]) => void;
}

const PreviousStepsTable: React.FC<Props> = (props) => {
  const { steps, updatePreviousSteps } = props;
  const [newStep, setNewStep] = useState("");

  if (!steps.length) return null;

  const handleStepChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    updatePreviousSteps(newSteps);
  };

  const handleAddStep = () => {
    if (newStep) {
      const updatedSteps = [...steps, newStep];
      updatePreviousSteps(updatedSteps);
      setNewStep("");
    }
  };

  const handleDeleteStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    updatePreviousSteps(updatedSteps);
  };

  return (
    <div className="w-full max-w-xl">
      <Table>
        <thead>
          <tr>
            <th>番号</th>
            <th>内容</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextInput
                    value={step}
                    onChange={(e) => handleStepChange(e, index)}
                  />
                </form>
              </td>
              <td>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => handleDeleteStep(index)}
                >
                  削除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4 flex items-center space-x-4">
        <TextInput
          value={newStep}
          placeholder="新しいステップを追加"
          onChange={(e) => setNewStep(e.target.value)}
        />
        <Button variant="gradient" color="blue" onClick={handleAddStep}>
          追加
        </Button>
      </div>
    </div>
  );
};

export default PreviousStepsTable;
