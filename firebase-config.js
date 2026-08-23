// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// Your Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCu9P5eY1YCoeASRZDwOnKqWApq__2cWpY",

    authDomain: "pizza-n-coke.firebaseapp.com",

    projectId: "pizza-n-coke",

    storageBucket: "pizza-n-coke.firebasestorage.app",

    messagingSenderId: "172843629379",

    appId: "1:172843629379:web:7f7539b409bae3c5c50df6",

    measurementId: "G-QJX45CYPF4"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firebase Authentication
const auth = getAuth(app);


// Firestore Database
const db = getFirestore(app);


// Export for other pages
export {
    app,
    auth,
    db
};
