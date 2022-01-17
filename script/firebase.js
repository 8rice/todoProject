// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { displayTodos } from "./script.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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
const app = initializeApp(firebaseConfig)

const user = "user1/"// a demander a l'utilisateur (gerer si il rentre rien pour ne pas fetch tous les utilisateurs)
const db = getDatabase()
const txt = ref(db, user)

//fetch user's todos
onValue(txt, (snapshot) => {
    const data = snapshot.val()
    console.log(Object.values(data))
    Object.values(data).map(todo => displayTodos(todo.text, todo.crossed, todo.level))
})

export function storeData(text, colorLvl, done) {
    set(ref(db, user + "/newTodoTest"), {
        crossed: done,
        level: colorLvl,
        text: text,
    })

    console.log("todo added")
}