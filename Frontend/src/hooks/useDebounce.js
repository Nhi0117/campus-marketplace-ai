import { useState, useEffect } from 'react';

/**
 * Hook làm chậm thao tác tìm kiếm (tránh search liên tục mỗi khi gõ phím)
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
