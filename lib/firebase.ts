// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "note-it-4.firebaseapp.com",
  projectId: "note-it-4",
  storageBucket: "note-it-4.appspot.com",
  messagingSenderId: "846122905079",
  appId: "1:846122905079:web:3e0450bd0a6334813a92f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadToFirebase(imageUrl: string, name: string){
    try {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        const file_name = name.replace(' ', '') + Date.now + '.jpeg';
        const storageRef = ref(storage, file_name)
        await uploadBytes(storageRef,buffer,{
            contentType: 'image/jpeg'
        })
        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url

    } catch (error) {
        console.error(error)
    }
}