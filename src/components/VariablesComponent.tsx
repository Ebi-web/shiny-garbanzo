import React from "react";
import { api } from "~/utils/api";

interface VariablesComponentProps {
  text: string;
}

const VariablesComponent: React.FC<VariablesComponentProps> = function ({
  text,
}) {
  const queryResult = api.gpt.chat.useQuery({ text });

  return (
    <div>
      {queryResult.isLoading && <p>Loading...</p>}
      {queryResult.data && <p>{queryResult.data.text}</p>}
    </div>
  );
};

export default VariablesComponent;
