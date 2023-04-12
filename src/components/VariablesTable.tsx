import { Table } from "@mantine/core";

interface VariablesTableProps {
  variables: Record<string, string>;
}

const VariablesTable: React.FC<VariablesTableProps> = ({ variables }) => {
  if (!Object.keys(variables).length) return null;
  const rows = Object.entries(variables).map(([key, value]) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{value}</td>
    </tr>
  ));

  return (
    <Table striped>
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
