import { useState, useEffect, useCallback } from "react";

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "GET",
        next: { tags: [tag ?? ""] },
      });
      const json = await response.json();

      if (response.ok && String(json.message).toLowerCase() === "success") {
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
