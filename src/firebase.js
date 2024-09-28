
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD7Eadiyy0HJ2OHQm58bmTmg5NAZ8mcwSg",
  authDomain: "the-card-game-5.firebaseapp.com",
  projectId: "the-card-game-5",
  storageBucket: "the-card-game-5.appspot.com",
  messagingSenderId: "1034127986627",
  appId: "1:1034127986627:web:5fcdf1e1bde94ef4317776",
  measurementId: "G-4P9PDE46EY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };
