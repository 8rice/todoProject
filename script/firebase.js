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
const db = getDatabase()

/*User creation/identification*/
let user // default user
user = window.prompt("username")
while (!user) {
    alert('You must put a username so that you can retrieve your todos')
    user = window.prompt("username")
}

document.querySelector('.username').appendChild(document.createTextNode(user))
newUser(user)

const txt = ref(db, user)
let id = 0


//fetch user's todos
onValue(txt, (snapshot) => {
    const data = snapshot.val()
    //console.log(Object.values(data))
    Object.values(data).map(todo => { id = todo.uid; displayTodos(todo.text, todo.crossed, todo.level, todo.uid) })
})

function newUser(userName) {
    set(ref(db, userName + "/infoUser"), {
        name: userName,
        uid: 0,
    })
        .then(() => {
            console.log("new user : " + userName)
            user = userName;
        })
        .catch((error) => {
            console.log("Failed : " + error)
        });
}

export function storeData(text, colorLvl, done) {
    id++
    set(ref(db, user + "/todo" + id), {
        crossed: done,
        level: colorLvl,
        text: text,
        uid: id,
    })
        .then(() => {
            console.log("todo added")
        })
        .catch((error) => {
            console.log("Failed : " + error)
        });
}

export function deleteFromDB(todoId) {
    set(ref(db, user + "/todo" + todoId), {
        crossed: null,
        level: null,
        text: null,
        uid: null,
    })
        .then(() => {
            console.log("todo deleted")
        })
        .catch((error) => {
            console.log("Failed : " + error)
        });
}