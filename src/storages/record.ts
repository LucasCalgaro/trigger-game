import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface RecordState {
  record: number;
  setRecord: (record: number) => void;
}

export const useRecord = create<RecordState>(
  persist(
    (set) => ({
      record: 0,
      setRecord: (record: number) => set({ record }),
    }),
    {
      name: "record",
    }
  ) as StateCreator<RecordState>
);
