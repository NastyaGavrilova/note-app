export default function createNoteBtns(noteBtns) {
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

  noteBtns.appendChild(noteEditWrapper);
  noteBtns.appendChild(noteArchiveWrapper);
  noteBtns.appendChild(noteDeleteWrapper);

  noteArchiveWrapper.appendChild(noteArchiveIcon);
  noteEditWrapper.appendChild(noteEditIcon);
  noteDeleteWrapper.appendChild(noteDeleteIcon);
}
