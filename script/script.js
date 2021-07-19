// TODO:
//    - Make the website responsive to keyboard strokes
//    - Refactor overall code to simplifly it
//    - Accessibility overall
//    - Wrap API calls in promises that dont proceed with showing page until they are resolved
//    - Create a loading spinner

// ******************************************************
// IMPORTS
// ******************************************************

import { showLoader, hideLoader } from "./modules/loader.js";
import { fetchTeamsData } from "./modules/api.js";
import { displayErrorModal } from "./modules/modal.js";
import { displayDropdownOption } from "./modules/dropdown.js";
import { displayTeamCard } from "./modules/card.js";
import { tempTeamData } from "./modules/tempData.js";
import { test } from "./modules/settings.js";

// ******************************************************
// NAMESPACE APP
// ******************************************************

const nbaCodeStars = {};

// ******************************************************
// GLOBAL VARIABLES
// ******************************************************

nbaCodeStars.dropdownEl = document.getElementsByClassName("dropdown")[0];
nbaCodeStars.cardsContainerEl = document.getElementsByClassName("teamCards")[0];
nbaCodeStars.teamsSelected = ["all"]; // default state is all teams are selected
nbaCodeStars.teamsData = null;
nbaCodeStars.teamAbbreviation = null; // traks the player details container of the team being viewed
nbaCodeStars.loaderEle = document.getElementById("loader");
nbaCodeStars.mainEle = document.querySelector("main");

// ******************************************************
// FUNCTIONS
// ******************************************************

// Init method that kicks everything off
nbaCodeStars.init = () => {
  nbaCodeStars.displayTeamData(test);
  nbaCodeStars.getUserSelections();
  nbaCodeStars.getSelection();
};

// Function to get team data from the api and them load the team cards to the screen
nbaCodeStars.displayTeamData = (test = false) => {
  // If in testing, avoid making multiple api calls and get data cached
  if (test) {
    // Hide loading screen
    hideLoader();

    // Save the data retrieve
    nbaCodeStars.teamsData = tempTeamData;

    // Loop through each team to show the dropdown option and team card
    nbaCodeStars.teamsData.forEach((team) => {
      displayDropdownOption(team, nbaCodeStars.dropdownEl);
      displayTeamCard(team, nbaCodeStars.cardsContainerEl);
    });
  } else {
    // Api call to get team data
    const teamDataPromise = fetchTeamsData();

    teamDataPromise
      .then((res) => {
        // If there is an error, throw error
        if (res instanceof Error) {
          throw new Error(res);
        }

        // Return data if there is no error
        else {
          return res;
        }
      })
      .then((data) => {
        // Save the data retrieve
        nbaCodeStars.teamsData = data;

        // Loop through each team to show the dropdown option and tam card
        nbaCodeStars.teamsData.forEach((team) => {
          displayDropdownOption(team, nbaCodeStars.dropdownEl);
          displayTeamCard(team, nbaCodeStars.cardsContainerEl);
        });
      })
      .catch((error) => {
        // Show error modal
        const showCloseIcon = false;
        const errorMessage = "Could not retrieve data. Please try again later!";
        displayErrorModal(errorMessage, showCloseIcon);
        console.log(error);
      });
  }
};

// Function that updates the dropdown and team cards based on the selections made
nbaCodeStars.getUserSelections = () => {
  nbaCodeStars.dropdownEl.addEventListener("click", (event) => {
    // Get the element selected
    const selectedEl = event.target.closest("li");

    nbaCodeStars.updateDropdown(selectedEl);
    nbaCodeStars.displayTeamCards();
  });

  nbaCodeStars.dropdownEl.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      // Get the element selected
      const selectedEl = event.target.closest("li");

      nbaCodeStars.updateDropdown(selectedEl);
      nbaCodeStars.displayTeamCards();
    }

    console.log("pressed");
  });

  // Prevents the dropdown from scrolling when spacebar is selected
  nbaCodeStars.dropdownEl.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  });
};

// Function updates the dropdown itself each time the user makes a selection from the dropdown
nbaCodeStars.updateDropdown = (selectedEl) => {
  // Store the user's selection
  const teamId = selectedEl.id;
  const isSelected = selectedEl.getAttribute("aria-selected") === "false"; // true if its being selected; false if de-selected

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
      nbaCodeStars.teamsSelected = [];

      // Remove highlight from all the teams and update aria-selected attribute
      const highlightedEl =
        nbaCodeStars.dropdownEl.querySelectorAll(".highlight");

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
      const index = nbaCodeStars.teamsSelected.indexOf("all");
      index !== -1 && nbaCodeStars.teamsSelected.splice(index, 1);

      // remove highlight from "all" selection and update aria-selected attribute
      const allSelectionEl = nbaCodeStars.dropdownEl.querySelector("#all");
      allSelectionEl.classList.remove("highlight");
      allSelectionEl.setAttribute("aria-selected", "false");
    }

    // Update the teamsSelected array
    nbaCodeStars.teamsSelected.push(teamId);
  }

  // Scenario 3: User deselects
  else {
    // Remove team
    const index = nbaCodeStars.teamsSelected.indexOf(teamId);
    nbaCodeStars.teamsSelected.splice(index, 1);

    // Scenario 3.1: User deselects and does not have any teams selected
    // Add "all" teams if the teamsSelected is empty after removing the most recent team
    if (nbaCodeStars.teamsSelected.length === 0) {
      nbaCodeStars.teamsSelected.push("all");

      // Add highlight from "all" selection
      const allSelectionEl = nbaCodeStars.dropdownEl.querySelector("#all");
      allSelectionEl.classList.add("highlight");
      allSelectionEl.setAttribute("aria-selected", "true");
    }
  }
};

// Function updated the team cards shown on the screen each time the user makes a selection from the dropdown
nbaCodeStars.displayTeamCards = () => {
  // Display team card's based on user's selection from the dropdown
  nbaCodeStars.cardsContainerEl.innerHTML = "";

  // Display all the teams by looping through all 30 NBA teams
  if (nbaCodeStars.teamsSelected[0] === "all") {
    nbaCodeStars.teamsData.forEach((team) => {
      displayTeamCard(team, nbaCodeStars.cardsContainerEl);
    });
  }
  // Display only the teams selected by looping through the specific team selected
  else {
    nbaCodeStars.teamsSelected.forEach((id) => {
      const team = nbaCodeStars.teamsData.find((team) => {
        return team["TeamID"] === parseInt(id);
      });
      displayTeamCard(team, nbaCodeStars.cardsContainerEl);
    });
  }
};

// Function to set up event listener on the select dropdown
nbaCodeStars.getSelection = () => {
  nbaCodeStars.dropdownEl.addEventListener("change", () => {
    const options = document.querySelectorAll("li");
    let noSelection = true;

    nbaCodeStars.cardsContainerEl.innerHTML = "";

    // Display all the team cards selected
    for (const option in options) {
      // Only show the card if there is an actual team selected
      if (options[option].ariaSelected && options[option].value !== "all") {
        const id = parseInt(options[option].id);

        console.log(typeof id);

        noSelection = false;

        const teamData = nbaCodeStars.teamsData.find((team) => {
          console.log(team["TeamID"]);
          console.log(typeof team["TeamID"]);

          return team["TeamID"] === id && team;
        });
        displayTeamCard(teamData, nbaCodeStars.cardsContainerEl);
      }
    }

    // Display all team cards if no specific team is selected
    if (noSelection) {
      nbaCodeStars.teamsData.forEach((team) => {
        displayTeamCard(team, nbaCodeStars.cardsContainerEl);
      });
    }
  });
};

// Calling the init to hit it off
nbaCodeStars.init();

// FUN STRETCH GOAL
// 	1. Cage Finder!
// 	2. A button in the top right hand corner of the screen with Nicholas Cages face that says CAGE FINDER
// 	3. It throws up 10 movie posters of Nicholas Cage with titles
// 	4. There is a button that says back to basketball which takes us back to the original site.
