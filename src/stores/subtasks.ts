import { browser } from "$app/environment";
import type { Subtask } from "@/models/Subtask";
import { writable } from "svelte/store";

const storedValue = browser ? window.localStorage.getItem('subtasks') : "[]"

export const subtasks = writable<Subtask[]>(storedValue ? JSON.parse(storedValue) : [])

subtasks.subscribe((value: Subtask[]) => {
  if (browser) {
    window.localStorage.setItem('subtasks', JSON.stringify(value))
  }
})

export { subtasks as default }

