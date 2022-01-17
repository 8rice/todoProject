import { storeData } from "./firebase.js"
let i, countTodos = 0;

let list = document.querySelector('#list')

// Add a "checked" symbol when clicking on a list item
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'DIV') {
    ev.target.classList.toggle('checked');
  } else if (ev.target.tagName === 'LI') { //si c'est sur l'element
    ev.target.firstChild.classList.toggle('checked'); // on checked le firstChild qui est le div
  }
}, false);

//display todos from database in firebase.js
export function displayTodos(txt, crossed, lvl) {
  let colors = ["#68DCE3", "#FFD79C", "#FF7575"]

  let li = document.createElement("li")
  let t = document.createTextNode(txt)
  let div = document.createElement("div")
  let colorLevel = colors[lvl]

  div.appendChild(t);
  div.style.borderWidth = "1px"
  div.style.borderStyle = "solid"
  div.style.borderColor = colorLevel;
  div.style.borderLeftWidth = "10px"
  div.style.borderLeftColor = colorLevel; //Ajoute la couleur d'importance
  li.appendChild(div);

  if (crossed == 1) {
    div.classList.toggle('checked') //if crossed --- or not
  }

  document.getElementById("list").appendChild(li); // Create element
  document.getElementById("myInput").value = ""; //reinisialize written value by user
  countTodos++;

  let span = document.createElement("SPAN");
  let txtNode = document.createTextNode("\u00D7"); //Cross
  span.className = "close";
  span.appendChild(txtNode);
  li.appendChild(span);

  let close = document.getElementsByClassName("close")
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement
      div.style.display = "none"
      countTodos--
      countElements()
    }
  }
  countElements()
}

document.querySelector('.addBtn').addEventListener('click', addTodo) //If add button clicked then call addTodo()

function addTodo() {
  let inputValue = document.getElementById("myInput").value
  let choices = document.querySelectorAll(".choice") //lvl choice from the 3 radio buttons
  let listElements = list.children //Fetch all todos (list children)

  let colorLevel = "#68DCE3" // Default level is blue if no choice made after load of page

  choices.forEach(
    choice => {
      if (choice.checked) {
        colorLevel = choice.value //Fetch importance level of todo
      }
    }
  )

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    //Clear todos
    for (let a = 0; a < listElements.length; a++) {
      listElements[a].style.display = "none"
    }
    countTodos = 0;
    //add todo to firebase
    storeData(inputValue, findColor(colorLevel), 0) //By default todo not done (not crossed)
  }
}

//Retrieve index of color so that it can be stored (1,2,3)
function findColor(color) {
  let colors = ["#68DCE3", "#FFD79C", "#FF7575"]
  for (let x = 0; x < colors.length; x++) {
    if (colors[x] === color) {
      return x //1 2 ou 3
    }
  }
}

// display sentence if no todos
function countElements() {
  let sentence = document.querySelector(".sentence")
  console.log(countTodos)
  if (countTodos == 0) {
    sentence.style.display = "block"
  }
  else {
    sentence.style.display = "none"
  }
}
