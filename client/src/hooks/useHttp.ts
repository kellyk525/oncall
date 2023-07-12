import { useCallback, useState } from "react";

type RequestConfig = {
  method?: string | null;
  headers: HeadersInit;
  body?: { [key: string]: string } | null;
  url: string;
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: (data: any) => void) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }).then((res) => res.json());

        if (!response.success) {
          throw new Error(response.message);
        }

        applyData(response);
      } catch (e) {
        let message = "Unknown Error!";
        if (e instanceof Error) message = e.message;
        setError(message);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
