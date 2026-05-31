import { useState, useEffect } from "react";

type LocalStorageEventDetail = {
  key: string;
  value: unknown;
};

const LOCAL_STORAGE_EVENT = "exdetox:local-storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(
          new CustomEvent<LocalStorageEventDetail>(LOCAL_STORAGE_EVENT, {
            detail: { key, value: valueToStore },
          }),
        );
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== key) return;
      try {
        if (e.newValue === null) setStoredValue(initialValue);
        else setStoredValue(JSON.parse(e.newValue) as T);
      } catch {
        setStoredValue(initialValue);
      }
    };

    const onCustom = (e: Event) => {
      const customEvent = e as CustomEvent<LocalStorageEventDetail>;
      if (customEvent.detail?.key !== key) return;
      setStoredValue(customEvent.detail.value as T);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(LOCAL_STORAGE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LOCAL_STORAGE_EVENT, onCustom);
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}
