// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAZYOVz7mUv834oMFC9EYd1vNNqh6bareg",
    authDomain: "todo-project-reb.firebaseapp.com",
    databaseURL: "https://todo-project-reb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-project-reb",
    storageBucket: "todo-project-reb.appspot.com",
    messagingSenderId: "1088175588337",
    appId: "1:1088175588337:web:59f56ba9ae7babe4b13a50",
    measurementId: "G-017W2J36CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);