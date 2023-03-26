import { Table } from "@mantine/core";
import React from "react";

interface Props {
  steps: string[];
}

const PreviousStepsTable: React.FC<Props> = ({ steps }) => {
  if (!steps.length) return null;

  return (
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
  );
};

export default PreviousStepsTable;
