import React from "react";
import { Table } from "@mantine/core";

interface Props {
  steps: string[];
}

const PreviousStepsTable: React.FC<Props> = (props) => {
  const { steps } = props;

  if (!steps.length) return null;

  return (
    <div className="w-full max-w-xl">
      <Table>
        <thead>
          <tr>
            <th>番号</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{step}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PreviousStepsTable;
