// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Firebase configuration for the first app
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};

// Firebase configuration for the second app
const firebaseConfig2 = {
    apiKey: import.meta.env.VITE_apiKey2,
    authDomain: import.meta.env.VITE_authDomain2,
    projectId: import.meta.env.VITE_projectId2,
    storageBucket: import.meta.env.VITE_storageBucket2,
    messagingSenderId: import.meta.env.VITE_messagingSenderId2,
    appId: import.meta.env.VITE_appId2
};

// Initialize the first Firebase app
const app = initializeApp(firebaseConfig);

// Initialize the second Firebase app with a unique name
const app2 = initializeApp(firebaseConfig2, 'app2'); // Notice the second argument 'app2' to name this instance

// Get Firestore for the first app
const $db = getFirestore(app);

// Get Storage for the second app
const storage = getStorage(app2);

export { $db, storage };
