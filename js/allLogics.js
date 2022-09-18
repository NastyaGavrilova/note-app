import { data, archiveUnArchiveIcons } from "./data.js";
import checkDatesFromContentNote from "./checkDatesFromContentNote.js";

let notesList = document.getElementById("notesList");
let statisticList = document.getElementById("notesStatics");
let activeNoteListShown = true;

function IconsArchiveUnarchive() {
  const headerArchiveWrapper = document.getElementsByClassName("header-archive")[0];
  if (headerArchiveWrapper.classList.contains("archive")) headerArchiveWrapper.innerHTML = archiveUnArchiveIcons.ArchiveIcon;
}

function createNoteBtns(noteBtns, note, noteID) {
  const noteEditWrapper = document.createElement("div");
  const noteArchiveWrapper = document.createElement("div");
  const noteDeleteWrapper = document.createElement("div");

  noteEditWrapper.className = "note-edit__wrapper";
  noteArchiveWrapper.className = "note-archive__wrapper";
  noteDeleteWrapper.className = "note-delete__wrapper";

  const noteEditIcon = document.createElement("img");
  const noteArchiveIcon = document.createElement("img");
  const noteDeleteIcon = document.createElement("img");

  noteEditIcon.setAttribute("src", "./assets/edit.svg");
  noteEditIcon.setAttribute("alt", "Edit");
  noteEditIcon.className = "note__edit";
  noteDeleteIcon.className = "note__delete";
  noteArchiveIcon.className = "note__archive";

  noteEditIcon.addEventListener("click", () => {
    checkForm(note);
  });
  noteDeleteIcon.addEventListener("click", () => {
    deleteNote(noteID);
  });
  noteArchiveIcon.addEventListener("click", () => {
    changeArchiveState(note);
  });

  noteArchiveIcon.setAttribute("src", "./assets/archive-note.svg");
  noteArchiveIcon.setAttribute("alt", "Archive");

  noteDeleteIcon.setAttribute("src", "./assets/delete.svg");
  noteDeleteIcon.setAttribute("alt", "Delete");

  noteBtns.appendChild(noteEditWrapper);
  noteBtns.appendChild(noteArchiveWrapper);
  noteBtns.appendChild(noteDeleteWrapper);

  noteArchiveWrapper.appendChild(noteArchiveIcon);
  noteEditWrapper.appendChild(noteEditIcon);
  noteDeleteWrapper.appendChild(noteDeleteIcon);
}
function createLi(note) {
  const li = document.createElement("li");
  li.id = note.id;
  li.className = "note";
  const noteWrapper = document.createElement("div");
  noteWrapper.className = "note__wrapper";
  const noteName = document.createElement("p");
  noteName.className = "note__name note__field";
  noteName.textContent = note.name;
  const noteCreated = document.createElement("p");
  noteCreated.className = "note__created note__field";
  noteCreated.textContent = note.created;
  const noteCategory = document.createElement("p");
  noteCategory.className = "note__category note__field";
  noteCategory.textContent = note.category;
  const noteContent = document.createElement("p");
  noteContent.className = "note__content note__field";
  noteContent.textContent = note.content;
  const noteDates = document.createElement("p");
  noteDates.className = "note__dates note__field";
  noteDates.textContent = note.dates;
  const noteBtns = document.createElement("div");
  noteBtns.className = "note__btns";
  createNoteBtns(noteBtns, note, note.id);

  li.appendChild(noteWrapper);
  li.appendChild(noteBtns);
  noteWrapper.appendChild(noteName);
  noteWrapper.appendChild(noteCreated);
  noteWrapper.appendChild(noteCategory);
  noteWrapper.appendChild(noteContent);
  noteWrapper.appendChild(noteDates);

  return li;
}

function createNote(note) {
  data.push(note);
  refreshNotesList();
}

function createNoteList() {
  data.forEach((note) => {
    if (!note.archived === activeNoteListShown) {
      notesList.append(createLi(note));
    }
  });
  console.log(data);
}
function updateNote(note) {
  try {
    let index = data.findIndex((n) => n.id === note.id);
    console.log(index);
    if (index < 0) throw "There is no such note!";
    data.splice(index, 1, note);
    refreshNotesList();
  } catch (e) {
    console.error(e);

  }
}
function deleteNote(noteID) {
  try {
    let index = data.findIndex((n) => n.id === noteID);
    if (index < 0) throw "There is no such note!";
    data.splice(index, 1);
    document.getElementById(noteID).remove();
    clearInnerHTML(statisticList);
    createStatiscticListOfNotes();
  } catch (e) {
    console.error(e);
    console.log("Note wasn't updated!");
  }
}

function createStatisticsNote(category, active, total) {
  const li = document.createElement("li");
  li.className = 'notes__statics-item'
  const noteCategory = document.createElement("p");
  noteCategory.className = 'statistics-item__paragraph'
  const counterWrapper = document.createElement('div');
  counterWrapper.className = "statistics-item__wrapper";

  const countActiveNotes = document.createElement("p");
  countActiveNotes.className = 'statistics-item__paragraph'
  const countArchiveNotes = document.createElement("p");
  countArchiveNotes.className = 'statistics-item__paragraph'
  noteCategory.textContent = category;
  countActiveNotes.textContent = active;
  countArchiveNotes.textContent = total - active;
  li.appendChild(noteCategory);
  li.appendChild(counterWrapper);
  counterWrapper.appendChild(countActiveNotes)
  counterWrapper.appendChild(countArchiveNotes);
  return li.outerHTML;
}
function createStatiscticListOfNotes() {
  let Idias = 0;
  let Qoutes = 0;
  let RandomThought = 0;
  let Tasks = 0;
  let IdiasActive = 0;
  let QoutesActive = 0;
  let RandomThoughtActive = 0;
  let TasksActive = 0;
  data.forEach((note) => {
    if (note.category === "Idea") {
      Idias++;
      if (!note.archived) IdiasActive++;
    }
    if (note.category === "Quote") {
      Qoutes++;
      if (!note.archived) QoutesActive++;
    }
    if (note.category === "Task") {
      Tasks++;
      if (!note.archived) TasksActive++;
    }
    if (note.category === "Random Thought") {
      RandomThought++;
      if (!note.archived) RandomThoughtActive++;
    }
  });
  statisticList.innerHTML += Idias
    ? createStatisticsNote("Idea", IdiasActive, Idias)
    : ``;
  statisticList.innerHTML += Qoutes
    ? createStatisticsNote("Quote", QoutesActive, Qoutes)
    : ``;
  statisticList.innerHTML += Tasks
    ? createStatisticsNote("Task", TasksActive, Tasks)
    : ``;
  statisticList.innerHTML += RandomThought
    ? createStatisticsNote("Random Thought", RandomThoughtActive, RandomThought)
    : ``;
}

function checkForm(note) {
  const form = document.getElementById('noteForm');
  const modal = document.getElementsByClassName('note__modal')[0];
  modal.classList.remove('hidden')
  form.innerHTML = `
  <input name="name" type="text" id="noteName" placeholder="Note Name" value="${typeof note.name === 'string' ? note.name : ""}" required ></input>

  <select id="noteCategory" name="categories">
    <option value="Task">Task</option>
    <option value="Random Thought">Random Thought</option>
    <option value="Idea">Idea</option>
    <option value="Qoute">Quote</option>
  </select>

  <textarea placeholder="Content of your note" id="noteContent" name="content">${note.content ? note.content : ""}</textarea>

  <button id="addNote" type="submit">Add Note</button>
  <button id="cancel">Cancel</button>`

  document.getElementById("cancel").addEventListener("click", () => {
    modal.classList.add('hidden');
    console.log(modal)
  });

  const created = new Date();
  const month = created.getMonth();
  const day = created.getDate();
  const year = created.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const inputCreated = `${monthNames[month]} ${day}, ${year}`;

  form.onsubmit = (event) => {
    event.preventDefault();
    let newNote = {
      id: typeof note.name === "string" ? note.id : Date.now(),
      name: event.target.name.value,
      created: typeof note.name === "string" ? note.created : inputCreated,
      category: event.target.categories.value,
      content: event.target.content.value,
      dates: checkDatesFromContentNote(event.target.content.value),
      archived: typeof note.name === "string" ? note.archived : false,
    };
    if (typeof note.name === "string") updateNote(newNote);
    else createNote(newNote);
    modal.classList.add('hidden');
  };
}

function changeArchiveState(note) {
  data[data.findIndex((n) => n.id === note.id)].archived =
    !data[data.findIndex((n) => n.id === note.id)].archived;
  refreshNotesList();
}
function switchTables() {
  const iconArchivesWrapper = document.getElementsByClassName('header-archive')[0];

  activeNoteListShown = !activeNoteListShown;
  clearInnerHTML(notesList);
  createNoteList();
  iconArchivesWrapper.innerHTML = activeNoteListShown ? archiveUnArchiveIcons.ArchiveIcon : archiveUnArchiveIcons.UnArchiveIcon
  console.log(iconArchivesWrapper.UnArchiveIcon)
}
function clearAllTables() {
  clearInnerHTML(notesList);
  clearInnerHTML(statisticList);
}
function clearInnerHTML(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

function refreshNotesList() {
  clearAllTables();
  createNoteList();
  createStatiscticListOfNotes();
}

document.getElementById("openModal").addEventListener("click", checkForm);
document
  .getElementById("headerArchive")
  .addEventListener("click", switchTables);

export { refreshNotesList, IconsArchiveUnarchive };