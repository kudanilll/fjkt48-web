import useSWR from "swr";

export const defaultFetcher = (url: string, tag: string) =>
  fetch(url, {
    method: "GET",
    next: { tags: [tag] },
  })
    .then((res) => res.json())
    .then((data) => data.content);

export function useFetch<T>(
  url: string,
  fetcher?: any,
  tag: string = ""
): [T, boolean, any] {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    fetcher ? fetcher : defaultFetcher(url, tag)
  );
  return [
    data, // content data from api, type is from T
    !isLoading, // is success?
    error, // is error?
  ];
}
