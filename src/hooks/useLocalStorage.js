
import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }, [key, value]);

  // Keep data synchronized across browser tabs.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(`Error syncing ${key}:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  return [value, setValue];
}
