import { browser } from "$app/environment";
import type { List } from "@/models/List";
import { writable } from "svelte/store";

const storedValue = browser ? window.localStorage.getItem('lists') : "[]"

export const lists = writable<List[]>(storedValue ? JSON.parse(storedValue) : [])

lists.subscribe((value: List[]) => {
  if (browser) {
    window.localStorage.setItem('lists', JSON.stringify(value))
  }
})

export { lists as default }

