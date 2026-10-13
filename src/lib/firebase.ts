import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBuNRiaV85_ZeqPnUjRfPKEP37bVxhakLs",
    authDomain: "ourtech-f58d4.firebaseapp.com",
    databaseURL: "https://ourtech-f58d4-default-rtdb.firebaseio.com",
    projectId: "ourtech-f58d4",
    storageBucket: "ourtech-f58d4.firebasestorage.app",
    messagingSenderId: "391651452028",
    appId: "1:391651452028:web:c332351ef2618075e255f9",
    measurementId: "G-F91P8PZK4F"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "default");
export const storage = getStorage(app);