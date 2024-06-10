// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2-osOfpgVmzicjs2bu6zBuWrItwzuBAU",
  authDomain: "kasselcomp.firebaseapp.com",
  projectId: "kasselcomp",
  storageBucket: "kasselcomp.appspot.com",
  messagingSenderId: "755395548246",
  appId: "1:755395548246:web:f5d38b8ffff73adfcf57f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
