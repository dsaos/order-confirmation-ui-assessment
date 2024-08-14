import { useState } from 'react';

export const useOrderIdValidation = (orderId: number | string) => {
  const [error, setError] = useState(true);

  const validate = (inputValue: string) => {
    if (inputValue.trim() !== orderId.toString()) {
      setError(true);
      return false;
    }

    setError(false);
    return true;
  };

  return { validate, error };
};
