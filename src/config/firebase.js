// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIA0grtRA4Km-P1GpGalkBBH1il1_hVUY",
  authDomain: "suratbaak-f8d2e.firebaseapp.com",
  projectId: "suratbaak-f8d2e",
  storageBucket: "suratbaak-f8d2e.appspot.com",
  messagingSenderId: "799304052080",
  appId: "1:799304052080:web:700398a96f6114811973b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db } ;