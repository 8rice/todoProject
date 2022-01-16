// Create a "close" button and append it to each list item
/* PAS UTILE C'EST JUSTE POUR LES ELEMENTS LI DEJA PRESENTS*/
/*Peut etre utile si on charge des éléments d'une DB ? a voir */
/*let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7"); //CROIX
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}*/

/* PARTIE UTILE */

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

// Create a new list item when clicking on the "Add" button
function newElement() {
  let inputValue = document.getElementById("myInput").value
  let choices = document.querySelectorAll(".choice")

  let li = document.createElement("li")
  let t = document.createTextNode(inputValue)
  let div = document.createElement("div"); //juste l'élément text et pas la croix (pour le line-through)

  let colorLevel = "#68DCE3" // Default level is blue

  choices.forEach(
    choice => {
      if (choice.checked) {
        colorLevel = choice.value //Fetch importance level of todo
      }
    }
  );

  div.appendChild(t);
  div.style.borderWidth = "1px"
  div.style.borderStyle = "solid"
  div.style.borderColor = colorLevel;
  div.style.borderLeftWidth = "10px"
  div.style.borderLeftColor = colorLevel; //Ajoute la couleur d'importance
  li.appendChild(div);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("list").appendChild(li); // Create element
    document.getElementById("myInput").value = ""; //reinisialize written value by user
    countTodos++;
  }

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7"); //Cross
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Click on a close button to hide the current list item
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

//display todos from database in firebase.js
function displayTodos(txt, crossed, lvl) {
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
