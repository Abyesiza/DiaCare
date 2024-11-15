// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore,collection} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhpg14mP59V5jUEkv89lE9RxJzi3GaoFk",
  authDomain: "diabapp-7fa81.firebaseapp.com",
  projectId: "diabapp-7fa81",
  storageBucket: "diabapp-7fa81.appspot.com",
  messagingSenderId: "805731893363",
  appId: "1:805731893363:web:16e14258f099f133116a06",
  measurementId: "G-P3KH19TZ50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app)

export const usersRef = collection(db,'users');
export const roomRef = collection(db,'rooms');