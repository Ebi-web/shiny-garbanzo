import React from "react";
import { Table } from "@mantine/core";

interface VariablesTableProps {
  variables: Record<string, unknown>;
}

const VariablesTable: React.FC<VariablesTableProps> = ({ variables }) => {
  if (!Object.keys(variables).length) return null;
  const rows = Object.entries(variables).map(([key, value]) => {
    const displayValue = Array.isArray(value)
      ? value.join(", ")
      : String(value);
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{displayValue}</td>
      </tr>
    );
  });

  return (
    <Table striped className="w-full max-w-xl">
      <thead>
        <tr>
          <th>Variable name</th>
          <th>Variable value</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default VariablesTable;
