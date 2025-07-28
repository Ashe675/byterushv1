import { useState, useCallback } from 'react';

interface UseQuantityOptions {
  initial?: number;
  min?: number;
  max?: number;
}

export function useQuantity(options: UseQuantityOptions = {}) {
  const { initial = 1, min = 1, max = 10 } = options;

  const [quantity, setQuantity] = useState(initial);

  const increase = useCallback(() => {
    setQuantity((prev) => {
      if (prev < max) return prev + 1;
      return prev;
    });
  }, [max]);

  const decrease = useCallback(() => {
    setQuantity((prev) => {
      if (prev > min) return prev - 1;
      return prev;
    });
  }, [min]);

  const reset = useCallback(() => {
    setQuantity(initial);
  }, [initial]);

  return {
    quantity,
    increase,
    decrease,
    reset,
    isMin: quantity === min,
    isMax: quantity === max,
  };
}