import { create } from "zustand";

type State = {
  initialGoalText: string;
  previousSteps: string[];
  variables: Record<string, unknown>;
  enhancedGoalText: string;
};

type Actions = {
  setInitialGoalText: (text: string) => void;
  setPreviousSteps: (steps: string[]) => void;
  setVariables: (variables: Record<string, unknown>) => void;
  setEnhancedGoalText: (text: string) => void;
};

const useStore = create<State & Actions>((set) => ({
  initialGoalText: "",
  previousSteps: [],
  variables: {},
  enhancedGoalText: "",
  setInitialGoalText: (text: string) => set({ initialGoalText: text }),
  setPreviousSteps: (steps: string[]) => set({ previousSteps: steps }),
  setVariables: (variables: Record<string, unknown>) =>
    set({ variables: variables }),
  setEnhancedGoalText: (text: string) => set({ enhancedGoalText: text }),
}));

export default useStore;
