// import { StorageClient } from "@supabase/storage-js";
import supabase from "./init";

// const storageClient = new StorageClient(
//   process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!,
//   {
//     apikey: process.env.SUPABASE_SERVICE_KEY!,
//     Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
//   }
// );

export async function download(bucket: string, name: string) {
  // const { data, error } = await storageClient.from(bucket).download(name);
  const { data, error } = await supabase.storage.from(bucket).download(name);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
