// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyDQ6aGXDFcNHtFyiLnsl-t7CiOFvityZxo",
    authDomain: "react-cursos-journal-app.firebaseapp.com",
    projectId: "react-cursos-journal-app",
    storageBucket: "react-cursos-journal-app.appspot.com",
    messagingSenderId: "357185861992",
    appId: "1:357185861992:web:25b21458e67f1e54bebedd"
  };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
