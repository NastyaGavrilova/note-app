import createLi from "./createLI.js";

export default function createNoteList(notesList, data) {
  notesList.innerHTML = data
    .map((d, index) => {
      return createLi(d.name, d.created, d.category, d.content, d.dates)
        .outerHTML;
    })
    .join("");
}
