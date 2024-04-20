// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXmtFcOSo3ySSxssJOHCrKTsBZ1XnkvHA",
  authDomain: "doctor-appointment-9b233.firebaseapp.com",
  projectId: "doctor-appointment-9b233",
  storageBucket: "doctor-appointment-9b233.appspot.com",
  messagingSenderId: "735819519164",
  appId: "1:735819519164:web:f3b2bdecc9d9866d066cb9",
  measurementId: "G-DESD92CV9V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
// export default app
export const db = getFirestore(app)
