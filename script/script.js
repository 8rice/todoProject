// Create a "close" button and append it to each list item
/* PAS UTILE C'EST JUSTE POUR LES ELEMENTS LI DEJA PRESENTS*/
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7"); //CROIX
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}



/* PARTIE UTILE */

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var li = this.parentElement;
    li.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'DIV') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  let div =  document.createElement("div"); //juste l'élément text et pas la croix (pour le line-through)
  document.querySelectorAll(".choice").forEach(
    choice => console.log(choice.value)
  ); //get the radio inputs



  div.appendChild(t);
  li.appendChild(div);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}