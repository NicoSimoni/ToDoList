import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ttPiMPurHhlsGwZ5GjskkT2j3bIt4rU",
  authDomain: "todolist-d7080.firebaseapp.com",
  databaseURL: "https://todolist-d7080-default-rtdb.firebaseio.com",
  projectId: "todolist-d7080",
  storageBucket: "todolist-d7080.appspot.com",
  messagingSenderId: "419709467612",
  appId: "1:419709467612:web:7010900db903929f5c2d19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;