import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCp3mcPIBwmgRUkP9MsW23sHSPCZsmlPBg",
  authDomain: "twitter-clone-f2957.firebaseapp.com",
  projectId: "twitter-clone-f2957",
  storageBucket: "twitter-clone-f2957.appspot.com",
  messagingSenderId: "729136889964",
  appId: "1:729136889964:web:181fbe9e06155055bfd849",
}
const app = initializeApp(firebaseConfig)

export const database = getDatabase()
export const storage = getStorage(app)
