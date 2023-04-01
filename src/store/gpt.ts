import { create } from "zustand";

type State = {
  initialGoalText: string;
  previousSteps: string[];
  variables: Record<string, string>;
};

type Actions = {
  setInitialGoalText: (text: string) => void;
  setPreviousSteps: (steps: string[]) => void;
  setVariables: (variables: Record<string, string>) => void;
};

const useStore = create<State & Actions>((set) => ({
  initialGoalText: "",
  previousSteps: [],
  variables: {},
  setInitialGoalText: (text: string) => set({ initialGoalText: text }),
  setPreviousSteps: (steps: string[]) => set({ previousSteps: steps }),
  setVariables: (variables: Record<string, string>) =>
    set({ variables: variables }),
}));

export default useStore;
