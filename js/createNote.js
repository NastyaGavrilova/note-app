import createLi from "./createLi.js";

function getDatesFromText(text) {
  let results = text.match(
    /[0-9]{1,2}([\-\/ \.])[0-9]{1,2}([\-\/ \.])((19)|(20))[0-9]{2}/g
  );

  if (results && results.length) return results;
  return [];
}

const createNote = (note, data) => {
  const form = document.getElementById("noteForm");
  const inputNoteName = document.getElementById("noteName");
  const inputNoteCategory = document.getElementById("noteCategory");
  const categoryValue = inputNoteCategory.value;
  const inputNoteContent = document.getElementById("noteContent");

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
  console.log(inputCreated);

  const li = createLi(
    inputNoteName.value,
    inputCreated,
    categoryValue,
    inputNoteContent.value,
    getDatesFromText(inputNoteContent.value)
  );

  const newNote = {
    id: Date.now(),
    name: inputNoteName.value,
    created: inputCreated,
    category: categoryValue,
    content: inputNoteContent.value,
    dates: getDatesFromText(inputNoteContent.value),
  };
  data.push(newNote);
  console.log(data);
  return li;
};

function createNoteList(notesList, data) {
  notesList.innerHTML = data
    .map((d, index) => {
      return createLi(d.name, d.created, d.category, d.content, d.dates)
        .outerHTML;
    })
    .join("");
}
