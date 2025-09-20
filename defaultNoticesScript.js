import { copyContents } from "./hardshipScript.js";

import { createIcons, icons } from "https://cdn.skypack.dev/lucide";
createIcons({ icons });

// ============ Tab Navigation ===================================
// Navigate between tabs

const financialAssistanceNavBtn = document.getElementById(
  "financialAssistanceNavBtn"
);
const financialAssistanceTab = document.getElementById(
  "financialAssistanceTab"
);
const todoNavBtn = document.getElementById("todoNavBtn");
const todoTab = document.getElementById("todoTab");

const defaultNoticesNavBtn = document.getElementById("defaultNoticesNavBtn");
const defaultNoticesTab = document.getElementById("defaultNoticesTab");

financialAssistanceNavBtn.addEventListener("click", () => {
  financialAssistanceNavBtn.classList.add("activeNavButton");
  todoNavBtn.classList.remove("activeNavButton");
  defaultNoticesNavBtn.classList.remove("activeNavButton");
  financialAssistanceTab.style.display = "grid";
  defaultNoticesTab.style.display = "none";
  todoTab.style.display = "none";
});

defaultNoticesNavBtn.addEventListener("click", () => {
  defaultNoticesNavBtn.classList.add("activeNavButton");
  todoNavBtn.classList.remove("activeNavButton");
  financialAssistanceNavBtn.classList.remove("activeNavButton");
  financialAssistanceTab.style.display = "none";
  defaultNoticesTab.style.display = "grid";
  todoTab.style.display = "none";
});

todoNavBtn.addEventListener("click", () => {
  todoNavBtn.classList.add("activeNavButton");
  financialAssistanceNavBtn.classList.remove("activeNavButton");
  defaultNoticesNavBtn.classList.remove("activeNavButton");
  financialAssistanceTab.style.display = "none";
  defaultNoticesTab.style.display = "none";
  todoTab.style.display = "grid";
});

// Set initial tab visibility
financialAssistanceTab.style.display = "grid";
defaultNoticesTab.style.display = "none";
todoTab.style.display = "none";

// ===============================================================
// ============ Default Notices Tab ============================

const todaysDate = new Date();
const formattedDate = todaysDate.toLocaleDateString("en-GB"); // DD/MM/YYYY format

// Add 7 days to today's date
const expiryDate7Days = new Date(todaysDate);
expiryDate7Days.setDate(todaysDate.getDate() + 7);
const formattedExpiryDate7Days = expiryDate7Days.toLocaleDateString("en-GB");

// Add 5 days to expiry date for postage
const expiryDate7DaysPostage = new Date(expiryDate7Days);
expiryDate7DaysPostage.setDate(expiryDate7Days.getDate() + 5);
const formattedExpiryDate7DaysPostage =
  expiryDate7DaysPostage.toLocaleDateString("en-GB");

// add today's date to the 7 Days DFN notice
document.getElementById("7DaysDFNDate").textContent = formattedDate;
document.getElementById("7DaysDFNExpiryDate").textContent =
  formattedExpiryDate7Days;
document.getElementById("7DaysDFNExpiryDatePostage").textContent =
  formattedExpiryDate7DaysPostage;

// Add 30 days to today's date
const expiryDate30Days = new Date(todaysDate);
expiryDate30Days.setDate(todaysDate.getDate() + 30);
const formattedExpiryDate30Days = expiryDate30Days.toLocaleDateString("en-GB");

// Add 5 days to expiry date for postage
const expiryDate30DaysPostage = new Date(expiryDate30Days);
expiryDate30DaysPostage.setDate(expiryDate30Days.getDate() + 5);
const formattedExpiryDate30DaysPostage =
  expiryDate30DaysPostage.toLocaleDateString("en-GB");

// add today's date to the 30 Days DFN notice
document.getElementById("30DaysDFNDate").textContent = formattedDate;
document.getElementById("30DaysDFNExpiryDate").textContent =
  formattedExpiryDate30Days;
document.getElementById("30DaysDFNExpiryDatePostage").textContent =
  formattedExpiryDate30DaysPostage;

// ==============================================================
// ============ Copy to Clipboard Functionality =================

const copy7DaysDFNButton = document.getElementById("copy7DaysDFNButton");
copy7DaysDFNButton.addEventListener("click", () =>
  copyContents("7DaysDFNParagraph")
);

const copy30DaysDFNButton = document.getElementById("copy30DaysDFNButton");
copy30DaysDFNButton.addEventListener("click", () =>
  copyContents("30DaysDFNParagraph")
);

// ==============================================================
