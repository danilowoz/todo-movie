import { writable, derived, get } from 'svelte/store';
import { createStorage } from './storage';
import { preferences } from './preferences';

const STORAGE_KEY = 'movies';

const storage = createStorage(STORAGE_KEY);

export const movies = writable(storage.get([]));

movies.subscribe((movies) => {
  storage.set(movies);
});

export const sortedMovies = () => {};
