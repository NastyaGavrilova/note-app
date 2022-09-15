import data from "./data.js";
import checkDatesFromContentNote from "./checkDatesFromContentNote.js";

let notesList = document.getElementById("notesList");
let activeNoteTableShown = true;

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

function createNote(note) {
  data.push(note);
  refreshNotesList();
  // showAnnouncer('Note created successfully!');
}
function updateNote(note) {
  try {
    let index = data.findIndex((n) => n.id === note.id);
    console.log(index);
    if (index < 0) throw "There is no such note!";
    data.splice(index, 1, note);
    console.log(data.splice(index, 1, note));
    refreshNotesList();
    console.log("Note updated successfully!");
  } catch (e) {
    console.error(e);
    console.log("Note wasn't updated!");
  }
}
function deleteNote(noteID) {
  try {
    let index = data.findIndex((n) => n.id === noteID);
    if (index < 0) throw "There is no such note!";
    data.splice(index, 1);
    document.getElementById(noteID).remove();
    // clearInnerHTML(statisticsTable);
    // buildStatisticTable();
    // showAnnouncer("Note deleted successfully!");
  } catch (e) {
    console.error(e);
    console.log("Note wasn't updated!");
  }
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

function createNoteList() {
  data.forEach((note) => {
    if (!note.archived === activeNoteTableShown) {
      notesList.append(createLi(note));
    }
  });
  console.log(data);
}
function checkForm(note) {
  const form = document.getElementById("noteForm");
  const inputNoteName = document.getElementById("noteName");
  inputNoteName.textContent = note.name ? note.name : "";
  // const inputNoteCategory = document.getElementById("noteCategory");
  // const categoryValue = inputNoteCategory.value;
  const inputNoteContent = document.getElementById("noteContent");
  inputNoteContent.textContent = note.content ? note.content : "";
  const modalWindow = document.querySelector(".note__modal");
  const overlay = document.querySelector(".overlay");
  const cancel = document.getElementById("cancel");
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
  cancel.addEventListener("click", () => {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
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
    console.log(typeof Date.now === "number");
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  };
}
function changeArchiveState(note) {
  data[data.findIndex((n) => n.id === note.id)].archived =
    !data[data.findIndex((n) => n.id === note.id)].archived;
  refreshNotesList();
  // showAnnouncer(
  //   `Note ${activeNoteTableShown ? "archived" : "unarchived"} successfully!`
  // );
}
function switchTables() {
  activeNoteTableShown = !activeNoteTableShown;
  clearInnerHTML(notesList);
  createNoteList();
  document.getElementById("notesListName").innerText = activeNoteTableShown
    ? "Active notes"
    : "Archived notes";
  // document.getElementsByClassName("header-icon archive")[0].innerHTML =
  //   activeNoteTableShown ? icons.ARCHIVE_ICON : icons.UNARCHIVE_ICON;
}
function clearAllTables() {
  clearInnerHTML(notesList);
  // clearInnerHTML(statisticsTable);
}
function clearInnerHTML(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

function refreshNotesList() {
  clearAllTables();
  createNoteList();
  // buildStatisticTable();
}
document.getElementById("openModal").addEventListener("click", checkForm);
export { refreshNotesList };
document
  .getElementById("headerArchive")
  .addEventListener("click", switchTables);
