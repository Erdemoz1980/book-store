import { useEffect } from "react";

export const useLocalStorage = (key: string, value: any) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
};

