import { browser } from '$app/environment';
import { writable } from 'svelte/store'

const defaultValue = 'dark';
const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue

export const theme = writable<string>(initialValue);

theme.subscribe((value: string) => {
  if (browser) {
    window.localStorage.setItem('theme', value);
  }
})

export { theme as default }