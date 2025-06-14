import { useState, useEffect } from 'react';

type SetValue<T> = T | ((value: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // 初期値を取得する関数
  const getValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getValue);

  // 値をセットする関数
  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      // エラーを無視
    }
  };

  // ページ読み込み時に最新の値を取得
  useEffect(() => {
    setStoredValue(getValue());
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;