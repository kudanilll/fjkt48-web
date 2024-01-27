import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "./init";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveData(name: string) {
  const snapshot = await getDocs(collection(firestore, name));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(name: string, id: string) {
  const snapshot = await getDoc(doc(firestore, name, id));
  return snapshot.data();
}

export async function retrieveCollectionDataById(name: string, id: string) {
  const snapshot = await getDocs(
    collection(firestore, `${name}/${id.replaceAll("-", "/")}`)
  );
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getDataFromStorage(filePath: string) {
  const fileRef = ref(storage, filePath);
  try {
    const downloadURL = await getDownloadURL(fileRef);
    const res = await fetch(downloadURL);
    const content = await res.text();
    return content;
  } catch (error) {
    return null;
  }
}
