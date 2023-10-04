const createSafeLocalStorage = (): Storage => {
  try {
    return window.localStorage;
  } catch {
    return {
      clear: () => {},
      getItem: () => {},
      setItem: () => {}
    } as unknown as Storage;
  }
};

const safeLocalStorage = createSafeLocalStorage();

export const createStorage = (key: string) => ({
  set: (value) => safeLocalStorage.setItem(key, JSON.stringify(value)),
  get: (defaultValue) => {
    try {
      return JSON.parse(safeLocalStorage.getItem(key)) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  },
  remove: () => safeLocalStorage.removeItem(key)
});
