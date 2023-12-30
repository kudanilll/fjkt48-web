import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "./init";

const firestore = getFirestore(app);
const storage = getStorage(app);

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

export async function retrieveCollectionDataById(name: string, id: string) {
  const snapshot = await getDocs(collection(firestore, `${name}/${id.replaceAll("-","/")}`));
  
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return data;
}

export async function getScheduleData(year: string, month: string, day: string) {
  /*const snapshot = collection(`schedule/${year}/${month}/${day}`);
  snapshot.add({}).then((reference) => {
    const document = snapshot.doc(reference.id);
    document.get().then((doc) => {
      if(doc.exists) {
        const data = doc.data();
        console.log(data)
        return data;
      }
    });
  }).catch((error) => {
    console.log(`Error: ${error}`);
  });
  return null;*/
}

export async function getDataFromStorage(filePath: string) {
  const fileRef = ref(storage, filePath);
  try {
    const downloadURL = await getDownloadURL(fileRef);
    const res = await fetch(downloadURL);
    const content = await res.text();
    return content;
  } catch(error) {
    return null;
  }
}