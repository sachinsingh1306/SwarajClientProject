
import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item !== null
        ? JSON.parse(item)
        : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore =
          value instanceof Function
            ? value(currentValue)
            : value;

        try {
          window.localStorage.setItem(
            key,
            JSON.stringify(valueToStore)
          );
        } catch (error) {
          console.error(
            `Error saving localStorage key "${key}":`,
            error
          );
        }

        return valueToStore;
      });
    },
    [key]
  );

  // Listen for changes made in other browser tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error syncing localStorage:", error);
        }
      }

      if (event.key === key && event.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;
