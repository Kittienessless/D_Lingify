import { useState } from 'react';

function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const handleServerError = (err: any) => {
    // Обработка ошибок сервера, например, логирование, перенаправление на страницу ошибки и т.д.
    console.error("Server error:", err);
    setError(err); // Сохраняем ошибку для отображения
  };

  const clearError = () => {
      setError(null);
  };

  return { error, handleServerError, clearError };
}

export default useErrorHandler;


