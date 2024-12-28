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
  cacheDuration?: number; // in milliseconds
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

      // Check cache
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const now = Date.now();

      if (
        cachedData &&
        cachedTimestamp &&
        options.cacheDuration &&
        now - parseInt(cachedTimestamp, 10) < options.cacheDuration
      ) {
        const parsedData = JSON.parse(cachedData) as T;
        setData(parsedData);
        options.hooks?.onFetchSuccess?.(parsedData);
        setIsLoading(false);
        return;
      }

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

        // Save to cache
        localStorage.setItem(cacheKey, JSON.stringify(json.content));
        localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
      } else {
        throw new Error("Fetch failed");
      }
    } catch (error) {
      setError(true);
      options.hooks?.onFetchError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [options.hooks, options.cacheDuration, cacheKey, url, tag]);

  useEffect(() => {
    options.hooks?.onFetchStart?.();
    fetchData();
  }, [fetchData, options.hooks]);

  return [data, !isLoading && !error, error];
}
