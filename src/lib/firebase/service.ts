import {
  collection,
  doc,
  getDoc,
  getDocs,
  // getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "./init";

// const firestore = getFirestore(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true, // this line
  // useFetchStreams: false, // and this line
});
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
    console.error(error);
    return null;
  }
}

export async function getImageFromStorage(image: string, output: string) {
  // https://firebase.google.com/docs/storage/web/download-files
  // error: page-de572231d71fb24b.js:1 Uncaught (in promise) FirebaseError: Firebase Storage: No default bucket found. Did you set the 'storageBucket' property when initializing the app? (storage/no-default-bucket)
  // idk why :( i will fix it :b
  const fileRef = ref(storage, `member-trainee-profile-image/${image}.jpg`);
  getDownloadURL(fileRef)
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (_) => {
        const blob = xhr.response;
        const file = new File([blob], output, { type: blob.type });
        const link = document.createElement("a");
        link.download = file.name;
        link.href = URL.createObjectURL(file);
      };
      xhr.open("GET", url);
      xhr.send();
    })
    .catch((error) => {
      console.error(error);
      switch (error.code) {
        case "storage/object-not-found":
          console.log("File doesn't exist");
          break;
        case "storage/unauthorized":
          console.log("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          console.log("User canceled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred, inspect the server response");
          break;
      }
    });
  // const fileRef = ref(storage, `member-trainee-profile-image/${image}.jpg`);
  // try {
  //   const url = await getDownloadURL(fileRef);
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = `${output}.jpg`;
  //   link.click();
  // } catch (error) {
  //   console.error("Error downloading image:", error);
  // }
}
