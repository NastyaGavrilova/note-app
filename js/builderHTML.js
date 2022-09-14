import data from "./data.js";

let notesList = document.getElementById("notesList");
let activeNoteTableShown = true;
function getDatesFromText(text) {
  let results = text.match(
    /[0-9]{1,2}([\-\/ \.])[0-9]{1,2}([\-\/ \.])((19)|(20))[0-9]{2}/g
  );

  if (results && results.length) return results;
  return [];
}

function createNoteBtns(noteBtns, note) {
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

  noteArchiveIcon.setAttribute("src", "./assets/archive-note.svg");
  noteArchiveIcon.setAttribute("alt", "Archive");

  noteDeleteIcon.setAttribute("src", "./assets/delete.svg");
  noteDeleteIcon.setAttribute("alt", "Delete");

  noteEditIcon.addEventListener("click", checkForm(note));

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

function createLi(note) {
  const li = document.createElement("li");
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
  createNoteBtns(noteBtns, note);

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
  // const inputNoteName = document.getElementById("noteName");
  // const inputNoteCategory = document.getElementById("noteCategory");
  // const categoryValue = inputNoteCategory.value;
  // const inputNoteContent = document.getElementById("noteContent");

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
      dates: getDatesFromText(event.target.content.value),
      archived: typeof note.name === "string" ? note.archived : false,
    };
    // if (typeof note.name === "string") updateNote(newNote);
    // else
    createNote(newNote);
  };
  console.log(typeof note.name === "string");
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

export { refreshNotesList };
