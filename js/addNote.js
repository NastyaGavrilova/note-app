import createNote from "./createNote.js";
export default function addNote() {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNote");
  addNoteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const li = createNote();
    // notesList.innerHTML = li;
    notesList.appendChild(li);
    console.log(li);
    return notesList;
  });
}
