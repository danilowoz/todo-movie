import { writable } from 'svelte/store';
import { createStorage } from './storage';

const STORAGE_KEY = 'preferences';

const storage = createStorage(STORAGE_KEY);

export const preferences = writable(storage.get({ tab: 'Rate' }));

preferences.subscribe((preferences) => {
  storage.set(preferences);
});
