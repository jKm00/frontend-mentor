import { browser } from "$app/environment";
import type { Task } from "@/models/Task";
import { writable } from "svelte/store";

const storedValue = browser ? window.localStorage.getItem('tasks') : "[]"

export const tasks = writable<Task[]>(storedValue ? JSON.parse(storedValue) : [])

tasks.subscribe((value: Task[]) => {
  if (browser) {
    window.localStorage.setItem('tasks', JSON.stringify(value))
  }
})

export { tasks as default }

