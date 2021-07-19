import { displayTeamCards } from "./card.js";

// **********************************************
// GLOBAL VARIABLES
// **********************************************

const dropdownEl = document.getElementsByClassName("dropdown")[0];
const teamsSelected = [];

// Function that displays the teams in the dropdown
export const displayDropdownOption = (team) => {
  const { City, Name, TeamID } = team;
  const teamName = `${City} ${Name}`;

  const optionEl = document.createElement("li");
  optionEl.textContent = teamName;

  // Do we still need a value here if they are not option elements
  optionEl.value = TeamID;
  optionEl.tabIndex = "0";
  optionEl.setAttribute("id", TeamID);
  optionEl.setAttribute("role", "option");
  optionEl.setAttribute("aria-selected", "false");
  optionEl.classList.add("dropdownOption");

  // This will be the css class background color toggled on or off
  dropdownEl.append(optionEl);
};

// Function to add event listeners that updates the dropdown and team cards based on the user's selections
export const getUserSelections = (teamsData) => {
  dropdownEl.addEventListener("click", (event) => {
    handleClick(event, teamsData);
  });

  dropdownEl.addEventListener("keyup", (event) => {
    handleClick(event, teamsData);
  });

  // Prevents the dropdown from scrolling when spacebar is selected
  dropdownEl.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  });
};

const handleClick = (event, teamsData) => {
  // Prevent default scroll behaviour for spacebar events
  if (event.code === "Space") {
    event.preventDefault();
  }

  if (
    event.type === "click" ||
    event.code === "Space" ||
    event.code === "Enter"
  ) {
    // Get the element selected
    const selectedEl = event.target.closest("li");

    // Update the global array tracking which teams the user selected
    updateDropdown(selectedEl);
    // Update the cards on the page based on the teams the user has selected
    displayTeamCards(teamsSelected, teamsData);
  }
};

// Function updates the dropdown itself each time the user makes a selection from the dropdown
const updateDropdown = (selectedEl) => {
  // Store the user's selection
  const teamId = selectedEl.id;

  // true if its being selected; false if de-selected
  const isSelected = selectedEl.getAttribute("aria-selected") === "false";

  // Toggle the highlight class and aria-selected values on the element selected
  selectedEl.classList.toggle("highlight");
  selectedEl.setAttribute("aria-selected", isSelected ? "true" : "false");

  // update the attribute for dropdown element for accessibility
  document
    .querySelector(".dropdown")
    .setAttribute("aria-activedescendant", teamId);

  // Add the team selected
  if (isSelected) {
    // Scenario 1: All teams is selected
    // empty selections if all teams is selected
    if (teamId === "all") {
      // Empty all the teams
      teamsSelected.splice(0, teamsSelected.length);

      // Remove highlight from all the teams and update aria-selected attribute
      const highlightedEl = dropdownEl.querySelectorAll(".highlight");

      highlightedEl.forEach((element) => {
        if (element.id !== "all") {
          element.classList.remove("highlight");
          element.setAttribute("aria-selected", "false");
        }
      });
    }

    // Scenario 2: A specific team is selected
    else {
      // remove "all" selection if a specific team is selected
      const index = teamsSelected.indexOf("all");
      index !== -1 && teamsSelected.splice(index, 1);

      // remove highlight from "all" selection and update aria-selected attribute
      const allSelectionEl = dropdownEl.querySelector("#all");
      allSelectionEl.classList.remove("highlight");
      allSelectionEl.setAttribute("aria-selected", "false");
    }

    // Update the teamsSelected array
    teamsSelected.push(teamId);
  }

  // Scenario 3: User deselects
  else {
    // Remove team
    const index = teamsSelected.indexOf(teamId);
    teamsSelected.splice(index, 1);

    // Scenario 3.1: User deselects and does not have any teams selected
    // Add "all" teams if the teamsSelected is empty after removing the most recent team
    if (teamsSelected.length === 0) {
      teamsSelected.push("all");

      // Add highlight from "all" selection
      const allSelectionEl = dropdownEl.querySelector("#all");
      allSelectionEl.classList.add("highlight");
      allSelectionEl.setAttribute("aria-selected", "true");
    }
  }
};
