export function extractFirstArray(input: string): string[] | null {
  const arrayRegex = /\[([^\]]*)\]/;
  const match = input.match(arrayRegex);
  if (match && match[1]) {
    const arrayString = match[1];
    return arrayString.split(",").map((item) => item.trim());
  } else {
    return null;
  }
}
export function extractFirstJSON(input: string): Record<string, string> | null {
  const jsonRegex = /{([^}]*)}/;
  const match = input.match(jsonRegex);
  if (match && match[0]) {
    const jsonString = match[0];
    try {
      return JSON.parse(jsonString) as Record<string, string>;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return null;
    }
  } else {
    return null;
  }
}
