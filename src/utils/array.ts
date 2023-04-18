export function parseSteps(input: string): string[] {
  const stepsRegex = /\{Steps\} = \[(.*?)\]/gs;
  const stepsMatch = stepsRegex.exec(input);

  if (!stepsMatch || !stepsMatch[1]) {
    return [];
  }

  const stepsString = stepsMatch[1].trim();
  const elementRegex = /"([^"]*)"/g;
  const steps = [];

  let elementMatch;
  while ((elementMatch = elementRegex.exec(stepsString)) !== null) {
    if (!elementMatch[1]) {
      continue;
    }
    steps.push(elementMatch[1]);
  }

  return steps;
}

export function parseVariables(input: string): Record<string, unknown> {
  const variablesRegex = /\{Variables\s*?\} = (\{[\s\S]*?\})/gs;
  const variablesMatch = variablesRegex.exec(input);

  if (!variablesMatch || !variablesMatch[1]) {
    return {};
  }

  const variablesString = variablesMatch[1].trim();
  console.log("variablesString", variablesString);

  try {
    return JSON.parse(variablesString) as Record<string, unknown>;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {};
  }
}

export function parseTrueGoal(input: string): string {
  const trueGoalRegex = /\{TrueGoal\} = (.*)/gs;
  const trueGoalMatch = trueGoalRegex.exec(input);

  console.log("trueGoalMatch", trueGoalMatch![1]);

  if (!trueGoalMatch || !trueGoalMatch[1]) {
    return "";
  }

  return trueGoalMatch[1];
}
