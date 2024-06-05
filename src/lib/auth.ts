import { writable } from 'svelte/store';
import type { User } from './types';

export const auth = writable<User | null>(null);
