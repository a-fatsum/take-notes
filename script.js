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
  // Highlight the parent container of the title element
  const parentContainer = titleElement.parentElement;
  parentContainer.classList.add("highlight");

  // Update the output area
  updateOutputArea();
}

function updateOutputArea() {
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
// expectedToChangeButton
const expectedToChangeButton = document.getElementById(
  "expectedToChangeButton"
);
expectedToChangeButton.addEventListener("click", (e) => {
  addNote("expectedToChangeTitle", "noteInput2");
});

// reasonsForHardshipButton
const reasonsForHardshipButton = document.getElementById(
  "reasonsForHardshipButton"
);
reasonsForHardshipButton.addEventListener("click", () => {
  addNote("reasonsForHardshipTitle", "noteInput1");
});

// How many months button
const howManyMonthsButton = document.getElementById("howManyMonthsButton");
howManyMonthsButton.addEventListener("click", () => {
  addNote("howManyMonthsTitle", "howManyMonthsInput");
});

// Is the vehicle currently Insured?
const vehicleCurrentlyInsuredYesCheckbox =
  document.getElementById("insuredYesCheckbox");
const vehicleCurrentlyInsuredNoCheckbox =
  document.getElementById("insuredNoCheckbox");
//
vehicleCurrentlyInsuredYesCheckbox.addEventListener("change", () => {
  toggleCheckbox("isVehicleCurrentlyInsuredTitle", "insuredYesCheckbox");
  vehicleCurrentlyInsuredNoCheckbox.checked = false;
});
vehicleCurrentlyInsuredNoCheckbox.addEventListener("change", () => {
  // toggleCheckbox("isVehicleCurrentlyInsuredTitle", "insuredNoCheckbox");
  vehicleCurrentlyInsuredYesCheckbox.checked = false;
  alert(
    "Vehicle is not insured. Inform the customer that they are in breach of the conditions of their contract."
  );
});

// Is the vehicle currently Registered?
const vehicleCurrentlyRegisteredYesCheckbox = document.getElementById(
  "registeredYesCheckbox"
);
const vehicleCurrentlyRegisteredNoCheckbox = document.getElementById(
  "registeredNoCheckbox"
);
//
vehicleCurrentlyRegisteredYesCheckbox.addEventListener("change", () => {
  toggleCheckbox("isVehicleCurrentlyRegisteredTitle", "registeredYesCheckbox");
  vehicleCurrentlyRegisteredNoCheckbox.checked = false;
  // set the registeration state
  const isRegistered = vehicleCurrentlyRegisteredYesCheckbox.checked;
  if (isRegistered) {
    // var myParent = document.body;
    const parentContainer = document.getElementById(
      "isVehicleCurrentlyRegisteredTitle"
    ).parentElement;

    //Create array of options to be added
    var array = ["Select", "NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"];

    //Create and append select list
    var selectList = document.createElement("select");
    // selectList.id = "stateSelect";
    selectList.classList.add("listOfStates");
    parentContainer.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      selectList.appendChild(option);
    }

    // create a title for the select list
    var title = document.createElement("h3");
    title.id = "stateOfRegistrationTitle";
    title.innerHTML = "State of Registration";
    parentContainer.insertBefore(title, selectList);

    // add event listener to the select list

    selectList.addEventListener("change", () => {
      const selectedState = selectList.value;
      // console.log("Selected state: ", selectedState);
      addNote("stateOfRegistrationTitle", "stateSelect");
    });
  }
});
//
vehicleCurrentlyRegisteredNoCheckbox.addEventListener("change", () => {
  // toggleCheckbox("isVehicleCurrentlyRegisteredTitle", "registeredNoCheckbox");
  vehicleCurrentlyRegisteredYesCheckbox.checked = false;
  alert(
    "Vehicle is not registered. Inform the customer that they are in breach of the conditions of their contract."
  );
});
