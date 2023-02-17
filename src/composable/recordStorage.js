import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXX.firebaseapp.com",
  projectId: "XXXXXXXXX",
  storageBucket: "XXXXXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
};

initializeApp(firebaseConfig);

export function useRecordStorage() {
  const collectionName = "words";

  async function read() {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((d) => d.data()).filter((data) => data.show);
  }

  async function write({ search, first, foreign, firstLang, foreignLang }) {
    const db = getFirestore();
    const now = new Date().getTime();

    const q = query(collection(db, collectionName), where("first", "==", first), where("foreign", "==", foreign));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size) {
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const data = { ...querySnapshot.docs[i].data(), date: now, times: querySnapshot.docs[i].data().times + 1 };
        if (!querySnapshot.docs[i].data().show) {
          data.show = true;
          data.forget = true;
        }
        await setDoc(doc(db, collectionName, querySnapshot.docs[i].id), data);
      }
    } else {
      await addDoc(collection(db, collectionName), {
        search,
        foreign,
        first,
        firstLang,
        foreignLang,
        times: 1,
        date: now,
        show: true,
        forget: false,
      });
    }
  }

  async function remove({ first, foreign }) {
    const db = getFirestore();
    const q = query(collection(db, collectionName), where("first", "==", first), where("foreign", "==", foreign));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) return;

    for (let doc in querySnapshot) {
      await setDoc(doc(db, collectionName, doc.id), { ...doc.data(), show: false });
    }
  }

  return {
    read,
    write,
    remove,
  };
}
