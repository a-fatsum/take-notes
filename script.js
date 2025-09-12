import { createIcons, icons } from "https://cdn.skypack.dev/lucide";
createIcons({ icons });

// document.body.append('<i data-lucide="circle-x"></i>');

const myNotesList = [];

// write function to add to myNotesList array
function addNote(titleId, elementId) {
  const titleElement = document.getElementById(titleId);
  const element = document.getElementById(elementId);

  const note = {
    title: titleElement.innerText.trim(),
    content: element.value.trim(),
  };

  // Check if note already exists
  const exists = myNotesList.some(
    (n) => n.title === note.title && n.content === note.content
  );

  if (!exists) {
    myNotesList.push(note);
  }

  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = myNotesList
    .map((n) => `<p>${n.title}</p><p>${n.content}</p>`)
    .join("");
}

// console.log("MY-NOTES-LIST", myNotesList);
function toggleCheckbox(titleId, elementId) {
  const checkbox = document.getElementById(elementId);
  if (checkbox.checked) {
    addNote(titleId, elementId);
    // console.log("MY-NOTES-LIST", myNotesList);
  } else {
    // checkbox.checked = true;
  }
}
// function to copy contents of outputArea to clipboard
function copyContents() {
  const outputArea = document.getElementById("outputArea");
  const textToCopy = outputArea.innerText;
  navigator.clipboard.writeText(textToCopy).then(
    function () {
      alert("Notes copied to clipboard!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}
function clearNotes() {
  myNotesList.length = 0; // Clear the array
  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = ""; // Clear the displayed notes
  // console.log("Notes cleared");
}

// Toggle box
const toggleCheckboxElement = document.getElementById("verbatimCheckbox");
toggleCheckboxElement.addEventListener("change", () => {
  toggleCheckbox("verbatimRead", "verbatimCheckbox");
});

// button event listeners
const copyButton = document.getElementById("copyBtn");
copyButton.addEventListener("click", copyContents);
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", clearNotes);
//
const expectedToChangeButton = document.getElementById(
  "expectedToChangeButton"
);

expectedToChangeButton.addEventListener("click", (e) => {
  addNote("expectedToChangeTitle", "noteInput2");
  // console.log("Button clicked:", e.target);
});
//

// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
