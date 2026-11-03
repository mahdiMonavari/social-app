import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { flatMessageType } from "../schemas/types";

type MessageStore = {
  messages: flatMessageType[];
  unReadMessageCount: number;
  set: (messages: flatMessageType[]) => void;
  add: (message: flatMessageType) => void;
  remove: (id: string) => void;
  updateUnReadMessageCount: (amount: number) => void;
};

export const useMessageStore = create<MessageStore>()(
  devtools(
    (set) => ({
      messages: [],
      unReadMessageCount: 0,
      add: (id) =>
        set(
          (state) => ({ messages: [...state.messages, id] }),
          false,
          "message/add",
        ),
      remove: (id) =>
        set(
          (state) => ({ messages: state.messages.filter((m) => m.id !== id) }),
          false,
          "message/remove",
        ),
      set: (messages) => set({ messages }, false, "message/set"),
      updateUnReadMessageCount: (amount) =>
        set(
          (state) => ({
            unReadMessageCount: state.unReadMessageCount + amount,
          }),
          false,
          "unRead/set",
        ),
    }),
    { name: "MessageStore" },
  ),
);
