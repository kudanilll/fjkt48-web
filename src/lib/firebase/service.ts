import {
  collection, doc, getDoc, getDocs, getFirestore
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(name: string) {
  const snapshot = await getDocs(collection(firestore, name));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return data;
}

export async function retrieveDataById(name: string, id: string) {
  const snapshot = await getDoc(doc(firestore, name, id));
  return snapshot.data();
}