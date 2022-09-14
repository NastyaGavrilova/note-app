import createNoteBtns from "./createNoteBtns.js";
export default function createLi(name, created, category, content, dates) {
  const li = document.createElement("li");
  li.className = "note";
  const noteWrapper = document.createElement("div");
  noteWrapper.className = "note__wrapper";
  const noteName = document.createElement("p");
  noteName.className = "note__name note__field";
  noteName.textContent = name;
  const noteCreated = document.createElement("p");
  noteCreated.className = "note__created note__field";
  noteCreated.textContent = created;
  const noteCategory = document.createElement("p");
  noteCategory.className = "note__category note__field";
  noteCategory.textContent = category;
  const noteContent = document.createElement("p");
  noteContent.className = "note__content note__field";
  noteContent.textContent = content;
  const noteDates = document.createElement("p");
  noteDates.className = "note__dates note__field";
  noteDates.textContent = dates;
  const noteBtns = document.createElement("div");
  noteBtns.className = "note__btns";
  createNoteBtns(noteBtns);

  li.appendChild(noteWrapper);
  li.appendChild(noteBtns);
  noteWrapper.appendChild(noteName);
  noteWrapper.appendChild(noteCreated);
  noteWrapper.appendChild(noteCategory);
  noteWrapper.appendChild(noteContent);
  noteWrapper.appendChild(noteDates);

  return li;
}
