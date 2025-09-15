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
  //
  const existingIcon = parentContainer.querySelector(".icon");
  if (!existingIcon) {
    parentContainer.insertAdjacentHTML(
      "afterbegin",
      '<i class="icon" data-lucide="circle-check"></i>'
    );
    lucide.createIcons({ root: parentContainer });
  }
  // Update the output area
  updateOutputArea();
}
//
// addNote("titleId", "elementId");
function createElement(titleId, elementId) {
  //
  const newDiv = document.createElement("div");

  // return element;
}

// ============================================
// function to update output area
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

// =======================================================================================
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
  createElement("div", "spacer", "");
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

vehicleCurrentlyRegisteredNoCheckbox.addEventListener("change", () => {
  // toggleCheckbox("isVehicleCurrentlyRegisteredTitle", "registeredNoCheckbox");
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
      // console.log("Selected state: ", selectedState);
      addNote("stateOfRegistrationTitle", "stateSelect");
      // add a link to the registration info page
      if (selectedState !== "Select") {
        switch (selectedState) {
          case "NSW":
            window.open(
              "https://www.service.nsw.gov.au/transaction/renew-vehicle-registration",
              "_blank"
            );
            break;
          case "QLD":
            window.open(
              "https://www.qld.gov.au/transport/registration/renew",
              "_blank"
            );
            break;
          case "SA":
            window.open(
              "https://www.sa.gov.au/topics/driving-and-transport/vehicles-and-registration/renew-your-registration",
              "_blank"
            );
            break;
          case "TAS":
            window.open(
              "https://www.transport.tas.gov.au/registration/renewing_your_registration",
              "_blank"
            );
            break;
          case "VIC":
            window.open(
              "https://www.vicroads.vic.gov.au/registration/renew-or-cancel-your-registration/renew-your-registration",
              "_blank"
            );
            break;
          case "WA":
            window.open(
              "https://www.transport.wa.gov.au/registration/renew-your-registration.asp",
              "_blank"
            );
            break;
          case "ACT":
            window.open(
              "https://www.accesscanberra.act.gov.au/app/answers/detail/a_id/2085/~/vehicle-registration-renewals",
              "_blank"
            );
            break;
          case "NT":
            window.open(
              "https://nt.gov.au/driving/registration/renew-your-vehicle-registration",
              "_blank"
            );
            break;
          default:
            break;
        }

        // Create and append rego information input box
        var regoInfoInput = document.createElement("input");
        regoInfoInput.type = "text";
        regoInfoInput.id = "regoInfoInput";
        regoInfoInput.classList.add("small-input");
        regoInfoInput.placeholder = "Enter Rego Expiry Date";
        // Style the input box
        regoInfoInput.classList.add("rego-info-input");
        parentContainer.appendChild(regoInfoInput);

        // Create and append button
        var regoInfoButton = document.createElement("button");
        regoInfoButton.id = "regoInfoButton";
        regoInfoButton.innerHTML = "Add Rego Info";
        regoInfoButton.classList.add("addNoteBtn");
        parentContainer.appendChild(regoInfoButton);

        // Add event listener to button
        regoInfoButton.addEventListener("click", () => {
          addNote("stateOfRegistrationTitle", "regoInfoInput");
          // clear the input box
          regoInfoInput.value = "";
        });
      }
    });
    //
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
