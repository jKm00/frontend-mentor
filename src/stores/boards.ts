import { browser } from "$app/environment";
import type { Board } from "@/models/Board";
import { writable } from "svelte/store";

const storedValue = browser ? window.localStorage.getItem('boards') : "[]"

export const boards = writable<Board[]>(storedValue ? JSON.parse(storedValue) : [])

boards.subscribe((value: Board[]) => {
  if (browser) {
    window.localStorage.setItem('boards', JSON.stringify(value))
  }
})

export { boards as default }

