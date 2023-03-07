import type { Subtask } from "./Subtask";

export type Task = {
  id: number,
  listId: number,
  name: string,
  desc: string,
  status: string,
}