import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaHleBMkqx0wxa7SMiwE6FS-inGiRvFaA",
  authDomain: "btl-img.firebaseapp.com",
  projectId: "btl-img",
  storageBucket: "btl-img.appspot.com",
  messagingSenderId: "970720705278",
  appId: "1:970720705278:web:8818143d41c29b65a603af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
