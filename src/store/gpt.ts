import { create } from "zustand";

type State = {
  initialGoalText: string;
  previousSteps: string[];
};

type Actions = {
  setInitialGoalText: (text: string) => void;
  setPreviousSteps: (steps: string[]) => void;
};

const useStore = create<State & Actions>((set) => ({
  initialGoalText: "",
  previousSteps: [],
  setInitialGoalText: (text: string) => set({ initialGoalText: text }),
  setPreviousSteps: (steps: string[]) => set({ previousSteps: steps }),
}));

export default useStore;
