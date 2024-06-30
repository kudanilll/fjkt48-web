export async function getDataFromAPI(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export async function getNewsFromStorage(filename: string) {
  // const content = await getDataFromStorage(`news/content/${filename}.md`);
  // return content;
}
