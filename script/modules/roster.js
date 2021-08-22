import { createModal, displayErrorModal } from "./modal.js";
import { fetchBioData, fetchStatsData } from "./api.js";
import { tempBioData, tempStatsData } from "./tempData.js";
import { hideLoader } from "./loader.js";
import { bioTableMap, statsTableMap } from "./mapping.js";
import { numberWithCommas, getPlayerByPlayerId } from "./utils.js";
import { test } from "./settings.js";

// Roster modal with toggle, close icon, thead, and tbody
// Toggle button click event
//  - link to player bio
//  - link to player stats
//    - Call player stats
//    - Show player stats
// Call player bio
// Show player bio

// ******************************************************
// GLOBAL DATA OBJECT
// ******************************************************

// Holds data pulled from APIs
const roster = {};

// ******************************************************
// GENERAL FUNCTIONS TO DISPLAY ROSTER INFORMATION
// ******************************************************

// Display player details on the screen
export const displayRoster = (team) => {
  const { Key } = team;

  // Determine if this is the test environment or production
  if (test) {
    // Hide loading screen
    hideLoader();

    // Save the data retrieved
    roster.bioData = tempBioData;

    // Display bio data
    displayRosterModal(team);
    displayRosterBio();
  } else {
    // Fetch bio data from api
    const bioDataPromise = fetchBioData(Key);
    bioDataPromise
      .then((res) => {
        // If there is an error, throw error
        if (res instanceof Error || res.length === 0) {
          throw new Error(res);
        }

        // Return data if there is no error
        else {
          return res;
        }
      })
      .then((data) => {
        // Save the data retrieve
        roster.bioData = data;

        // Display bio data
        displayRosterModal(team);
        displayRosterBio();
      })
      .catch((error) => {
        // Show error modal
        const errorMessage =
          "Could not retrieve bio data. Please try again later!";
        displayErrorModal(errorMessage);
        console.log(error);
      });
  }
};

// Function to display the modal that holds stats and bio data
const displayRosterModal = (team) => {
  // Create toggle button
  const toggleButtonEl = displayToggleBtn(team);

  // roster header
  const headerEl = document.createElement("div");
  headerEl.classList.add("rosterHeader");

  // table header data
  const tableHeadEl = document.createElement("thead");
  tableHeadEl.classList.add("rosterTableHead");

  // table body data
  const tableBodyEl = document.createElement("tbody");
  tableBodyEl.classList.add("rosterTableBody");

  // table
  const tableEl = document.createElement("table");
  tableEl.append(tableHeadEl);
  tableEl.append(tableBodyEl);

  // table vertical scrollbar
  const tableScrollEl = document.createElement("div");
  tableScrollEl.classList.add("rosterTableScroll");
  tableScrollEl.append(tableEl);

  // table container
  const tableContainerEl = document.createElement("div");
  tableContainerEl.classList.add("rosterTableContainer");
  tableContainerEl.append(tableScrollEl);

  // Create player details modal
  const modalEl = createModal();

  // Get modal inner container that houses actual information
  const modalInner = modalEl.querySelector(".modalInnerContainer");
  modalInner.append(toggleButtonEl);
  modalInner.append(headerEl);
  modalInner.append(tableContainerEl);

  // Append modal to the body to display it on screen
  const bodyEl = document.querySelector("body");
  bodyEl.append(modalEl);
};

// Function to create the toggle button between roster bio and stats
// Credits to stackoverflow author for providing this toggle button: https://stackoverflow.com/questions/63410507/how-to-connect-two-options-and-toggle-switch-buttons
const displayToggleBtn = (team) => {
  // Create toggle container
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("toggleBtnContainer");

  // Create toggle input and content
  const inputEl = document.createElement("input");
  inputEl.setAttribute("class", "input");
  inputEl.setAttribute("id", "toggle");
  inputEl.setAttribute("type", "checkbox");

  const toggleHTML = `
    <label class="label" for="toggle">
      <div class="left">
        Bio
      </div>

      <div class="switch">
        <span class="slider round"></span>
      </div>
      
      <div class="right">
        Stats
      </div>
    </label>
    `;

  // Append toggle to show on page
  btnContainer.append(inputEl);
  btnContainer.innerHTML += toggleHTML;

  // Event listener to toggle between bio and stats
  btnContainer.addEventListener("click", () => {
    handleToggle(team);
  });
  btnContainer.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      handleToggle(team);
    }
  });

  return btnContainer;
};

// Function to determine whether to display roster stats or bio
const handleToggle = (team) => {
  const inputEl = document.getElementById("toggle");
  const isChecked = inputEl.checked;

  if (isChecked) {
    getRosterStats(team);
    // displayRosterStats();
  } else {
    displayRosterBio();
  }
};

const createPlayerNameEl = (player) => {
  const { PhotoUrl, FirstName, LastName } = player;

  const playerNameTdEl = `
    <td class="player data">
      <div class="playerImg">
        <img src="${PhotoUrl}" alt="${FirstName} ${LastName}"/>
      </div>
      <div class="nameContainer">
        <span>${FirstName}</span>
        <span>${LastName}</span>
      </div>
    </td>
  `;

  return playerNameTdEl;
};

// Function to create the table heading for the data table
const createTableHeaderRow = (map) => {
  const trEl = document.createElement("tr");

  // Loop through each heading and create a th element with the class name
  map.forEach((obj) => {
    const { header, className } = obj;

    const spanEl = document.createElement("span");
    spanEl.innerText = header;
    spanEl.classList.add(className);
    spanEl.classList.add("header");

    const thEl = document.createElement("th");
    thEl.append(spanEl);

    trEl.append(thEl);
  });

  return trEl;
};

// ******************************************************
// FUNCTIONS TO DISPLAY ROSTER BIO INFORMATION
// ******************************************************

// Function to populate table elements with bio data
const displayRosterBio = () => {
  // Populate the table header row
  const tableHeadRow = createTableHeaderRow(bioTableMap);
  const tableHeadEl = document.querySelector(".rosterTableHead");
  // Clear previous results
  tableHeadEl.innerHTML = "";

  tableHeadEl.append(tableHeadRow);

  // Populate the table body
  const tableBodyEl = document.querySelector(".rosterTableBody");
  // Clear previous results
  tableBodyEl.innerHTML = "";

  const tableBodyRowsArr = createBioTableBodyRows();
  // Loop through player rows and append to the body
  tableBodyRowsArr.forEach((rowEl) => {
    tableBodyEl.append(rowEl);
  });
};

// Function to create the table body for the bio data table
const createBioTableBodyRows = () => {
  // Array to hold all the rows created
  const bodyRowsArr = [];

  // Create a table row for each player in the roster
  roster.bioData.forEach((player) => {
    const { PlayerID } = player;

    // Player name
    const playerNameTdEl = createPlayerNameEl(player);

    // Player row
    const trEl = document.createElement("tr");
    trEl.setAttribute("data-bio-playerId", PlayerID);
    trEl.innerHTML = playerNameTdEl;

    // Loop through each data heading to create and display a td element
    bioTableMap.forEach((obj) => {
      const { className, key } = obj;

      if (key !== null) {
        let data = player[key];
        let formatData = "N/A";

        // Error handling: proceed if data has a value
        if (data) {
          // Format api data based on the nature of the data
          if (key === "BirthDate") {
            formatData = data.split("T")[0];
          } else if (key === "Salary") {
            formatData = numberWithCommas(data);
          } else {
            formatData = data;
          }
        }

        // Create a container to hold data
        const spanEl = document.createElement("span");
        spanEl.innerText = formatData;
        spanEl.classList.add(className);
        spanEl.classList.add("data");

        const tdEl = document.createElement("td");
        tdEl.append(spanEl);

        trEl.append(tdEl);
      }
    });

    bodyRowsArr.push(trEl);
  });

  return bodyRowsArr;
};

// ******************************************************
// FUNCTIONS TO DISPLAY ROSTER STATS INFORMATION
// ******************************************************

// Display player details on the screen
const getRosterStats = (team) => {
  const { Key } = team;

  // Determine if this is the test environment or production
  if (test) {
    // Hide loading screen
    hideLoader();

    // Save the data retrieved
    roster.statsData = tempStatsData;

    // Display stats data
    displayRosterStats();
  } else {
    // Fetch stats data from api
    const statsDataPromise = fetchStatsData(Key);
    statsDataPromise
      .then((res) => {
        // If there is an error, throw error
        if (res instanceof Error || res.length === 0) {
          throw new Error(res);
        }

        // Return data if there is no error
        else {
          return res;
        }
      })
      .then((data) => {
        // Save the data retrieve
        roster.statsData = data;

        // Display bio data
        displayRosterStats();
      })
      .catch((error) => {
        // Remove existing bio data
        const modalEl = document.querySelector(".modalOuterContainer");
        modalEl.remove();

        // Show error modal
        const errorMessage =
          "Could not retrieve roster stats. Please try again later!";
        displayErrorModal(errorMessage);
        console.log(error);
      });
  }
};

// Function to display roster stats
const displayRosterStats = () => {
  // Populate the table header row
  const tableHeadRow = createTableHeaderRow(statsTableMap);
  const tableHeadEl = document.querySelector(".rosterTableHead");

  // Clear previous results
  tableHeadEl.innerHTML = "";
  tableHeadEl.append(tableHeadRow);

  // Populate the table body
  const tableBodyEl = document.querySelector(".rosterTableBody");
  // Clear previous results
  tableBodyEl.innerHTML = "";

  // Populate the table body
  const tableBodyRowsArr = createStatsTableBodyRows();
  // Loop through player rows and append to the body
  tableBodyRowsArr.forEach((rowEl) => {
    tableBodyEl.append(rowEl);
  });
};

// Function to create the table body for the stats data table
const createStatsTableBodyRows = () => {
  const bodyRowsArr = [];

  // Loop through each heading and create a th element with the class name
  roster.statsData.forEach((statsObj) => {
    const { PlayerID } = statsObj;

    const player = getPlayerByPlayerId(roster.bioData, PlayerID);

    if (player) {
      // Player name
      const playerNameTdEl = createPlayerNameEl(player);

      // Player row
      const trEl = document.createElement("tr");
      trEl.setAttribute("data-bio-playerId", PlayerID);
      trEl.innerHTML = playerNameTdEl;

      // Loop through each data heading to create and display a td element
      statsTableMap.forEach((obj) => {
        const { className, key } = obj;

        if (key !== null) {
          let data = statsObj[key];

          // Create element to hold the data and append to it
          const spanEl = document.createElement("span");

          // Error handling: proceed if data has a value
          spanEl.innerText = data ? numberWithCommas(data) : "N/A";
          spanEl.classList.add(className);
          spanEl.classList.add("data");

          const tdEl = document.createElement("td");
          tdEl.append(spanEl);
          trEl.append(tdEl);
        }
      });

      bodyRowsArr.push(trEl);
    }
  });

  return bodyRowsArr;
};
