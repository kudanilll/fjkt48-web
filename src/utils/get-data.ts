export async function getDataFromAPI(endpoint: string) {
  const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
    cache: "no-store",
    method: "GET"
  });
  if(!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}