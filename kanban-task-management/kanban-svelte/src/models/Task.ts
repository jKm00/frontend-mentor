import type { Subtask } from "./Subtask";

export type Task = {
  id: number,
  name: string,
  desc: string,
  subtasks?: Subtask[],
  status: string,
}