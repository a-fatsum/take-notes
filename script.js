import { createIcons, icons } from "https://cdn.skypack.dev/lucide";
createIcons({ icons });

// document.body.append('<i data-lucide="circle-x"></i>');

const myNotesList = [];

// write function to add to myNotesList array
function addNote(titleId, elementId) {
  const titleElement = document.getElementById(titleId);
  const element = document.getElementById(elementId);
  //
  const note = {
    title: titleElement.textContent,
    content: element.value,
  };
  if (myNotesList.includes(note)) {
    return;
  } else {
    myNotesList.push(note);
  }
  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = myNotesList
    .map((note) => `<p>${note.title}</p><p>${note.content}</p>`)
    .join("");

  console.log("THIS", titleElement.textContent);
  console.log("MY NOTES LIST", myNotesList);
  console.log("note", note);
}

function toggleCheckbox(titleId, elementId) {
  const checkbox = document.getElementById(elementId);
  if (checkbox.checked) {
    addNote(titleId, elementId);
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
  console.log("Notes cleared");
}

// button event listeners
const copyButton = document.getElementById("copyBtn");
copyButton.addEventListener("click", copyContents);
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", clearNotes);
//
const addNoteButtons = document.querySelectorAll(".addNoteBtn");
addNoteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addNote("reasonsForHardshipTitle", "noteInput");
  });
});
//
const toggleCheckboxElement = document.getElementById("verbatimCheckbox");
toggleCheckboxElement.addEventListener("change", () => {
  toggleCheckbox("verbatimRead", "verbatimCheckbox");
});

// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
// TESTING DYNAMIC BLOCKS ----
