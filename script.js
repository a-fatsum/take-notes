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
  // const exists = myNotesList.some(
  //   (n) => n.title === note.title && n.content === note.content
  // );

  const exists = checkForDuplicates(note);

  //
  if (!exists) {
    myNotesList.push(note);
  }
  // Highlight the parent container of the title element
  const parentContainer = titleElement.parentElement;
  parentContainer.classList.add("highlight");
  //
  const existingIcon = parentContainer.querySelector(".icon");
  if (!existingIcon) {
    parentContainer.insertAdjacentHTML(
      "afterbegin",
      '<i class="icon" data-lucide="circle-check"></i>'
    );
    lucide.createIcons({ root: parentContainer });
  }

  // check if icon already exists

  // Update the output area
  updateOutputArea();
}

function checkForDuplicates(note) {
  return myNotesList.some(
    (n) => n.title === note.title && n.content === note.content
    // (n) => n.title === note.title
  );
}

function updateOutputArea() {
  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = myNotesList
    .map(
      (n) =>
        `<p class="note-title">${n.title}</p><p class="note-content">${n.content}</p>`
    )
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

// Clear Input fields
function clearInputFields() {
  const inputs = document.querySelectorAll("input[type='text'], textarea");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  // Clear checkboxes
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  // Clear text inputs and textareas
  inputs.forEach((input) => (input.value = ""));
  // Clear highlights and icons
  const highlightedElements = document.querySelectorAll(".highlight");
  highlightedElements.forEach((el) => {
    el.classList.remove("highlight");
    const icon = el.querySelector(".icon");
    if (icon) {
      icon.remove();
    }
  });
}

// Clear button functionality
function clearNotesAndInputs() {
  // confirm before clearing
  const confirmClear = confirm(
    "Are you sure you want to clear all notes and inputs?"
  );
  if (!confirmClear) return;
  clearNotes();
  clearInputFields();
}

// Event listeners for checkboxes ===========================================
// Verbatim read checkbox
const verbatimToggleCheckboxElement =
  document.getElementById("verbatimCheckbox");
verbatimToggleCheckboxElement.addEventListener("change", () => {
  toggleCheckbox("verbatimRead", "verbatimCheckbox");
});

// Is the account currently with an agent?
const accountWithAgentYesCheckbox = document.getElementById(
  "accountWithAgentyesCheckbox"
);
const accountWithAgentNoCheckbox = document.getElementById(
  "accountWithAgentnoCheckbox"
);
//
accountWithAgentYesCheckbox.addEventListener("change", () => {
  toggleCheckbox("accountWithAgentTitle", "accountWithAgentyesCheckbox");
  accountWithAgentNoCheckbox.checked = false;
  // create check list
  const parentContainer = document.getElementById(
    "accountWithAgentTitle"
  ).parentElement;
  //Create and append select list
  var div = document.createElement("div");
  div.innerHTML = `
  <p>Please contact the agent and:</p>
  <ul>
    <li>Advise agent to place file on hold.</li>
    <li>Obtain cost to date from agent.</li>
  </ul>
`;

  div.classList.add("agent-check-container");
  const existingDiv = document.querySelector(".agent-check-container");

  if (accountWithAgentYesCheckbox.checked && !existingDiv) {
    parentContainer.appendChild(div);
    console.log(
      "accountWithAgentYesCheckbox.checked",
      accountWithAgentYesCheckbox.checked
    );
  }
  // else {
  //   document.querySelector(".agent-check-container")?.remove();
  // }
});
accountWithAgentNoCheckbox.addEventListener("change", () => {
  // toggleCheckbox("isAccountWithAgentTitle", "accountWithAgentnoCheckbox");
  accountWithAgentYesCheckbox.checked = false;
  toggleCheckbox("accountWithAgentTitle", "accountWithAgentnoCheckbox");
});
// ==========================================================================

// button event listeners
const copyButton = document.getElementById("copyBtn");
copyButton.addEventListener("click", copyContents);
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", clearNotesAndInputs);
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

vehicleCurrentlyRegisteredNoCheckbox.addEventListener("change", () => {
  vehicleCurrentlyRegisteredYesCheckbox.checked = false;
  document.getElementById("stateSelect")?.remove();
  document.getElementById("stateOfRegistrationTitle")?.remove();
  document.getElementById("regoInfoInput")?.remove();
  document.getElementById("regoInfoButton")?.remove();
  alert(
    "Vehicle is not registered. Inform the customer that they are in breach of the conditions of their contract."
  );
});

// event listener for yes checkbox
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
    selectList.id = "stateSelect";
    selectList.classList.add("listOfStates");
    parentContainer.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      // option.id = "stateSelect";
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
      addNote("stateOfRegistrationTitle", "stateSelect");
      // add a link to the registration info page
      if (selectedState !== "Select") {
        switch (selectedState) {
          case "NSW":
            window.open(
              "https://www.service.nsw.gov.au/transaction/check-a-vehicle-registration"
            );
            break;
          case "QLD":
            window.open(
              "https://www.service.transport.qld.gov.au/checkrego/application/TermAndConditions.xhtml?dswid=9682"
            );
            break;
          case "SA":
            window.open(
              "https://account.ezyreg.sa.gov.au/account/check-registration.htm"
            );
            break;
          case "TAS":
            window.open("https://www.transport.tas.gov.au/rego-status/search");
            break;
          case "VIC":
            window.open(
              "https://www.vicroads.vic.gov.au/registration/buy-sell-or-transfer-a-vehicle/check-vehicle-registration/vehicle-registration-enquiry"
            );
            break;
          case "WA":
            window.open(
              "https://online.transport.wa.gov.au/webExternal/registration/;jsessionid=A0RRcQb59ymT3J8bqd4jw4sO6n_C4BwQsOqv-m-AsVKEogS6UQPQ!-470103551!-613352842?0"
            );
            break;
          case "ACT":
            window.open(
              "https://rego.act.gov.au/regosoawicket/public/reg/FindRegistrationPage?0"
            );
            break;
          case "NT":
            window.open(
              "https://nt.gov.au/driving/rego/existing-nt-registration/rego-check"
            );
            break;
          default:
            break;
        }
      }
      // Create input field for registration info
      if (!document.getElementById("regoInfoInput")) {
        var input = document.createElement("input");
        input.type = "text";
        input.id = "regoInfoInput";
        input.placeholder = "Enter registration details here";
        input.classList.add("small-input");
        parentContainer.appendChild(input);
      }
      // Create button to add rego info to notes
      if (!document.getElementById("regoInfoButton")) {
        var button = document.createElement("button");
        button.id = "regoInfoButton";
        button.innerHTML = "Add Rego Info";
        button.classList.add("smallButton");
        parentContainer.appendChild(button);
        // Add event listener to button
        button.addEventListener("click", () => {
          addNote("stateOfRegistrationTitle", "regoInfoInput");
          // document.getElementById("regoInfoInput").value = "";
        });
      }
    });
    //
  }
  // Clear state registration elements if "No" is selected
  else {
    document.getElementById("stateSelect")?.remove();
    document.getElementById("stateOfRegistrationTitle")?.remove();
    document.getElementById("regoInfoInput")?.remove();
    document.getElementById("regoInfoButton")?.remove();
  }
});
//

// Which industry are you in?
const whichIndustryButton = document.getElementById("whichIndustryButton");
whichIndustryButton.addEventListener("click", () => {
  addNote("whichIndustryTitle", "whichIndustry");
});

// How many days is the account currently overdue by?
const howManyDaysInput = document.getElementById("howManyDaysInput");
howManyDaysInput.addEventListener("change", () => {
  addNote("howManyDaysTitle", "howManyDaysInput");
});

// Direct Debit on Hold button event listeners
const directDebitOnHoldButton = document.getElementById(
  "directDebitOnHoldButton"
);
directDebitOnHoldButton.addEventListener("click", () => {
  addNote("directDebitOnHoldTitle", "directDebitOnHoldInput");
});

// ============ Tab Navigation ===================================
// Navigate between tabs
