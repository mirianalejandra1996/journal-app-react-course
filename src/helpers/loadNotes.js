import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {

  try {
    const collectionRef = collection(FirebaseDB, `/${uid}/journal/notes`);

    const docs = await getDocs(collectionRef);

    const notes = []

    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    })

    return notes
  } catch (error) {
    console.log('error on LoadNotes', error.message )
    return [];
  }
};
