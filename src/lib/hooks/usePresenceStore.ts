import { create } from "zustand";

type PreseceState = {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};

export const usePreseceStor = create<PreseceState>((setState) => ({
  members: [],
  add: (id) =>
    setState((state) =>
      state.members.includes(id) ? state : { members: [...state.members, id] },
    ),
  remove: (id) =>
    setState((state) => ({
      members: state.members.filter((m) => m !== id),
    })),
  set: (ids) => setState({ members: ids }),
}));
