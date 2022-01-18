import { storeData, deleteFromDB } from "./firebase.js"

let countTodos = 0;

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
export function displayTodos(txt, crossed, lvl, id) {
  if (id === 0) { } // id : 0 is first element of collection with infos of user we dont display
  else {
    let colors = ["#68DCE3", "#FFD79C", "#FF7575"]

    let li = document.createElement("li")
    li.className = id
    let text = document.createTextNode(txt)
    let div = document.createElement("div")
    let colorLevel = colors[lvl]
    let listElements = list.children //Fetch all todos (list children)

    div.appendChild(text);

    /*to-do's style*/
    div.style.borderWidth = "1px"
    div.style.borderStyle = "solid"
    div.style.borderColor = colorLevel;
    div.style.borderLeftWidth = "10px"
    div.style.borderLeftColor = colorLevel;

    li.appendChild(div);

    if (crossed == 1) {
      div.classList.toggle('checked') //If to-do crossed --- or not
    }

    list.appendChild(li) //Create child list element
    document.getElementById("myInput").value = "" //Reinisialize text input
    countTodos++;

    /*Create span for delete to-do button*/
    let deleteCrossContainer = document.createElement("SPAN");
    let deleteCross = document.createTextNode("\u00D7") //Cross
    deleteCrossContainer.className = "close";
    deleteCrossContainer.appendChild(deleteCross)
    li.appendChild(deleteCrossContainer)

    /*Delete a to-do*/
    let close = document.getElementsByClassName("close")
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let liParentElement = this.parentElement
        for (let a = 0; a < listElements.length; a++) {
          listElements[a].style.display = "none"
        }
        countTodos = 0
        deleteFromDB(liParentElement.className)
      }
    }
    countElements()
  }

}

/*Adding a new to-do*/
document.querySelector('.addBtn').addEventListener('click', addTodo) //If add button clicked then call addTodo()

function addTodo() {
  let inputValue = document.getElementById("myInput").value
  let choices = document.querySelectorAll(".choice") //lvl choice from the 3 radio buttons
  let listElements = list.children //Fetch all todos (list children)

  let colorLevel = "#68DCE3" //Default level is blue if no choice made after load of page

  choices.forEach(
    choice => {
      if (choice.checked) { //If selected (radio button)
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
  console.log("todo count : " + countTodos)
  if (countTodos == 0) {
    sentence.style.display = "block"
  }
  else {
    sentence.style.display = "none"
  }
}
