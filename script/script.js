// ******************************************************
// IMPORTS
// ******************************************************

import { showLoader, hideLoader } from "./modules/loader.js";
import { fetchTeamsData } from "./modules/api.js";
import { displayErrorModal } from "./modules/modal.js";
import { getUserSelections } from "./modules/dropdown.js";
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

nbaCodeStars.loaderEle = document.getElementById("loader");
nbaCodeStars.mainEle = document.querySelector("main");

// ******************************************************
// FUNCTIONS
// ******************************************************

// Init method that kicks everything off
nbaCodeStars.init = () => {
  nbaCodeStars.displayTeamData(test);
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
      displayDropdownOption(team);
      displayTeamCard(team);
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

        // Start listenining and getting user selections if data is received
        getUserSelections(nbaCodeStars.teamsData);
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

// ******************************************************
// INIT FUNCTION CALL
// ******************************************************
// Calling the init to hit it off
nbaCodeStars.init();
