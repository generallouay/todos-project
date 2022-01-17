//fetch elements or select .....
const noteInput = document.querySelector(".noteInput");
const addNoteBtn = document.querySelector(".addNoteBtn");
const notesList = document.querySelector(".notesList");
const notesFilter = document.getElementById("notesFilter");
//////////////

// functions
const createNoteFunc = (param) => {
  param.preventDefault();
  const noteDivContainer = document.createElement("div");
  noteDivContainer.classList.add("NTC");
  const noteDiv = document.createElement("div"); //first of all the function creates a div that has a static value not an input .. the div contains what we've typed and two buttons
  noteDiv.classList.add("note"); //we are giving it a class for the size and the white background/ border radios
  const noteContent = document.createElement("li"); // now the function creating a space where we gonna inter the text
  noteContent.classList.add("noteContent"); // we gave it a class so we adjust the style
  noteContent.innerText = noteInput.value;
  const completedButton = document.createElement("button"); //creating normal button for completed tasks
  completedButton.classList.add("completedBtn"); // giving a class
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  const deleteButton = document.createElement("button"); // another button to delete the note
  deleteButton.classList.add("deleteBtn"); // giving a class
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // now we done with creating we append childeren

  notesList.prepend(noteDivContainer);
  noteDivContainer.appendChild(noteDiv);
  noteDivContainer.appendChild(completedButton);
  noteDivContainer.appendChild(deleteButton);
  noteDiv.appendChild(noteContent);

  saveToLocalStorage(noteInput.value);
  noteInput.value = "";
};

const deleteNote = (param) => {
  const elem = param.target;
  if (elem.classList[0] === "deleteBtn") {
    const pr = elem.parentElement;
    pr.classList.add("fallAnimation");
    setTimeout(function () {
      pr.remove();
    }, 300);
    deleteFromLocalStorage(pr)
    // pr.addEventListener("transitionend", function() {
    //     pr.remove();
    // })
  }
  if (elem.classList[0] === "completedBtn") {
    const pr = elem.parentElement;
    pr.classList.add("done"); // or .toggle('')
    elem.classList.add("fallAnimation02");
    setTimeout(function () {
      elem.remove();
    }, 300);
  }
};

const filterFunc = (param) => {
  const notes = notesList.childNodes;
  notes.forEach((z) => {
    switch (param.target.value) {
      case "all":
        z.style.display = "flex";
        break;
      case "checked":
        if (z.classList.contains("done")) {
          z.style.display = "flex";
        } else {
          z.style.display = "none";
        }
        break;
      case "unchecked":
        if (!z.classList.contains("done")) {
          z.style.display = "flex";
        } else {
          z.style.display = "none";
        }
        break;
    }
  });
};

const saveToLocalStorage = (param) => {
  let notes;
  if (localStorage.getItem("theNotes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("theNotes"));
  }
  notes.push(param);
  localStorage.setItem("theNotes", JSON.stringify(notes));
};

const getNotes = () => {
    const notes01 = JSON.parse(localStorage.getItem("theNotes"));
    notes01.forEach((z) => {
    const noteDivContainer = document.createElement("div");
    noteDivContainer.classList.add("NTC");
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    const noteContent = document.createElement("li");
    noteContent.classList.add("noteContent");
    noteContent.innerText = z;
    const completedButton = document.createElement("button");
    completedButton.classList.add("completedBtn");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    notesList.prepend(noteDivContainer);
    noteDivContainer.appendChild(noteDiv);
    noteDivContainer.appendChild(completedButton);
    noteDivContainer.appendChild(deleteButton);
    noteDiv.appendChild(noteContent);
  });
};

const deleteFromLocalStorage = (param) => {
    // since we are going to delete an existing item in the local storage we better fetch it first of all
    const notes = JSON.parse(localStorage.getItem("theNotes"));
    const validation = param.firstChild.firstChild.textContent;
    notes.forEach(z => {
        if (z === validation){
            notes.splice(notes.indexOf(validation), 1);
            localStorage.setItem("theNotes", JSON.stringify(notes))
        }
    })
}



// add events
document.addEventListener("DOMContentLoaded", getNotes);
addNoteBtn.addEventListener("click", createNoteFunc); //everytime i click on the add activate the function
notesList.addEventListener("click", deleteNote);
notesFilter.addEventListener("click", filterFunc);



// i wanna fix the check when i refresh the page it goes away.
