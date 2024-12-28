import { useState, useEffect, useCallback } from "react";
import axios from "axios";

if (!process.env.API_URL) {
  throw new Error('Invalid/Missing environment variable: "API_URL"');
}

if (!process.env.API_KEY) {
  throw new Error('Invalid/Missing environment variable: "API_KEY"');
}

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

type FetchOptions<T> = {
  initialData?: T;
  cacheKey?: string;
  hooks?: {
    onFetchStart?: () => void;
    onFetchSuccess?: (data: T) => void;
    onFetchError?: (error: any) => void;
  };
};

export default function useFetch<T>(
  url: string,
  tag?: string,
  options: FetchOptions<T> = {}
): [T | undefined, boolean, boolean] {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const cacheKey = options.cacheKey || url;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      options.hooks?.onFetchStart?.();

      const response = await axios.get(`${apiUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        params: {
          tag: tag ?? "",
        },
      });

      const json = response.data;

      if (response.status === 200 && json.success === true) {
        console.log(json.content);
        setData(json.content);
        options.hooks?.onFetchSuccess?.(json.content);
      } else {
        throw new Error("Fetch failed");
      }
    } catch (error) {
      setError(true);
      options.hooks?.onFetchError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [url, tag, options.hooks]);

  useEffect(() => {
    options.hooks?.onFetchStart?.();
    fetchData();
  }, [fetchData, options.hooks]);

  return [data, !isLoading && !error, error];
}
