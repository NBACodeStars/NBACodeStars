// TODO:
//    - Make the website responsive to keyboard strokes
//    - Refactor overall code to simplifly it
//    - Accessibility overall
//    - Wrap API calls in promises that dont proceed with showing page until they are resolved
//    - Create a loading spinner

// ASK: Does .remove() get rid of the event listener on the close icon as well?
// ASK: Check if caps is good with mentors
// ASK: How to make js files split into multiple files?

const NBACodeStars = {};

// 1. init method that kicks everything off
NBACodeStars.init = () => {
  NBACodeStars.getTeamsData();
  NBACodeStars.getUserSelections();
  NBACodeStars.getSelection();
 
};

// Global variables
NBACodeStars.dropdownElem = document.getElementsByClassName("dropdown")[0];
NBACodeStars.cardsContainerElem =
document.getElementsByClassName("teamCards")[0];
NBACodeStars.teamsSelected = ["all"]; // default state is all teams are selected
NBACodeStars.teamsData = null;
NBACodeStars.playerByTeamBiodata = null;
NBACodeStars.playerByTeamStatsData = null;
NBACodeStars.defaultSeason = 2021;

// Team details API
NBACodeStars.url = "https://fly.sportsdata.io";
NBACodeStars.endpoints = {
  teams: "/v3/nba/scores/json/teams",
  playersBio: "/v3/nba/stats/json/Players",
  playersSeasonStats: `/v3/nba/stats/json/PlayerSeasonStatsByTeam/${NBACodeStars.defaultSeason}`,
};
NBACodeStars.apiKey = "44c04f59b59b46e0b83d9f530f7c8e27";

// Function that makes the API call get get teams data
NBACodeStars.getTeamsData = async () => {
  const url = new URL(`${NBACodeStars.url}${NBACodeStars.endpoints.teams}`);
  url.search = new URLSearchParams({
    key: NBACodeStars.apiKey,
  });

  // TODO: Add a throw and catch block
  fetch(url)
    .then((res) =>  {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error (res)
      }
      })
    .then((data) => {
      console.log(data)
      NBACodeStars.teamsData = data;
      NBACodeStars.displayOptions(NBACodeStars.teamsData);
    })
    .catch((error) => {
      console.log(error)
      NBACodeStars.displaySiteLoadError();

      
      // TODO: Error handling
      
    });
};
// Error handle function
  NBACodeStars.displaySiteLoadError = () => {
      // Refactor with displayPlayerDetails
  // Create close icon -> refactor code from above to manage close icon functionality
  const errorMessage = document.createElement('p')
  errorMessage.textContent = "Could not load data. Please try again later!"
  console.log('YOU MAD BRUH??')
  const playerDetailsContainerElem = document.createElement("div");
  playerDetailsContainerElem.classList.add("playerDetailsContainer");
  playerDetailsContainerElem.append(errorMessage);

  const playerDetailsOuterElem = document.createElement("div");
  playerDetailsOuterElem.classList.add("playerDetailsOuterContainer");
  playerDetailsOuterElem.append(playerDetailsContainerElem);

  const bodyElem = document.querySelector("body");
  bodyElem.prepend(playerDetailsOuterElem);

  }









// Function that makes the API call get get players data
NBACodeStars.getPlayersByTeamBiodata = async (teamAbbreviation) => {
  const url = new URL(
    `${NBACodeStars.url}${NBACodeStars.endpoints.playersBio}/${teamAbbreviation}`
  );
  url.search = new URLSearchParams({
    key: NBACodeStars.apiKey,
  });

  // TODO: Add a throw and catch block
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      NBACodeStars.playerByTeamBiodata = data;
    })
    .catch(() => {
      // TODO: Error handling
    });
};

NBACodeStars.getPlayersByTeamStatsData = async (teamAbbreviation) => {
  const url = new URL(
    `${NBACodeStars.url}${NBACodeStars.endpoints.playersSeasonStats}/${teamAbbreviation}`
  );
  url.search = new URLSearchParams({
    key: NBACodeStars.apiKey,
  });

  // TODO: Add a throw and catch block
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      NBACodeStars.playerByTeamStatsData = data;
    })
    .catch(() => {
      // TODO: Error handling
    });
};

// Function that displays the teams in the dropdown
NBACodeStars.displayOptions = (teams) => {
  teams.forEach((team) => {
    const teamName = `${team["City"]} ${team["Name"]}`;
    const id = team["TeamID"];
    const optionLi = document.createElement("li");

    // This could be any header element or a button
    optionLi.textContent = teamName;

    // Do we still need a value here if they are not option elements
    optionLi.value = id;
    optionLi.tabIndex = "0";
    optionLi.setAttribute("id", id);
    optionLi.setAttribute("role", "option");
    optionLi.setAttribute("aria-selected", "false");
    optionLi.classList.add("dropdownOption");

    // This will be the css class background color toggled on or off
    NBACodeStars.dropdownElem.append(optionLi);

    // This still needs to be called
    NBACodeStars.displayTeamCard(team);
  });
};

// Function that updates the dropdown and team cards based on the selections made
NBACodeStars.getUserSelections = () => {
  NBACodeStars.dropdownElem.addEventListener("click", (event) => {
    // Get the element selected
    const selectedEl = event.target.closest("li");

    NBACodeStars.updateDropdown(selectedEl);
    NBACodeStars.updateTeamCards();
  });

  NBACodeStars.dropdownElem.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      // Get the element selected
      const selectedEl = event.target.closest("li");

      NBACodeStars.updateDropdown(selectedEl);
      NBACodeStars.updateTeamCards();
    }

    console.log("pressed");
  });

  // Prevents the dropdown from scrolling when spacebar is selected
  NBACodeStars.dropdownElem.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  });
};

// Function updates the dropdown itself each time the user makes a selection from the dropdown
NBACodeStars.updateDropdown = (selectedEl) => {
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
      NBACodeStars.teamsSelected = [];

      // Remove highlight from all the teams and update aria-selected attribute
      const highlightedEl =
        NBACodeStars.dropdownElem.querySelectorAll(".highlight");

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
      const index = NBACodeStars.teamsSelected.indexOf("all");
      index !== -1 && NBACodeStars.teamsSelected.splice(index, 1);

      // remove highlight from "all" selection and update aria-selected attribute
      const allSelectionEl = NBACodeStars.dropdownElem.querySelector("#all");
      allSelectionEl.classList.remove("highlight");
      allSelectionEl.setAttribute("aria-selected", "false");
    }

    // Update the teamsSelected array
    NBACodeStars.teamsSelected.push(teamId);
  }

  // Scenario 3: User deselects
  else {
    // Remove team
    const index = NBACodeStars.teamsSelected.indexOf(teamId);
    NBACodeStars.teamsSelected.splice(index, 1);

    // Scenario 3.1: User deselects and does not have any teams selected
    // Add "all" teams if the teamsSelected is empty after removing the most recent team
    if (NBACodeStars.teamsSelected.length === 0) {
      NBACodeStars.teamsSelected.push("all");

      // Add highlight from "all" selection
      const allSelectionEl = NBACodeStars.dropdownElem.querySelector("#all");
      allSelectionEl.classList.add("highlight");
      allSelectionEl.setAttribute("aria-selected", "true");
    }
  }
};

// Function updated the team cards shown on the screen each time the user makes a selection from the dropdown
NBACodeStars.updateTeamCards = () => {
  // Display team card's based on user's selection from the dropdown
  NBACodeStars.cardsContainerElem.innerHTML = "";

  // Display all the teams by looping through all 30 NBA teams
  if (NBACodeStars.teamsSelected[0] === "all") {
    NBACodeStars.teamsData.forEach((team) => {
      NBACodeStars.displayTeamCard(team);
    });
  }
  // Display only the teams selected by looping through the specific team selected
  else {
    NBACodeStars.teamsSelected.forEach((id) => {
      const team = NBACodeStars.teamsData.find((team) => {
        return team["TeamID"] === parseInt(id);
      });
      NBACodeStars.displayTeamCard(team);
    });
  }
};

// Function that displays the teams card
NBACodeStars.displayTeamCard = (team) => {
  const teamName = `${team["City"]} ${team["Name"]}`;

  const h3Elem = document.createElement("h3");
  h3Elem.innerText = teamName;
  h3Elem.classList.add("cardTeamName");

  const imageURL = team["WikipediaLogoUrl"];
  const imgElem = document.createElement("img");
  imgElem.src = imageURL;
  imgElem.alt = `${teamName} team logo`;
  imgElem.classList.add("cardImg");

  const cardInnerContainerElem = document.createElement("div");
  cardInnerContainerElem.classList.add("cardInnerContainer");
  cardInnerContainerElem.append(imgElem);

  const aElem = document.createElement("a");
  aElem.innerHTML = "Team details";
  aElem.classList.add("btn");
  aElem.classList.add("btnTeamDetails");
  aElem.ariaRole = "button";
  aElem.tabIndex = "0";

  NBACodeStars.teamDetailsListener(aElem);

  const liElem = document.createElement("li");
  liElem.classList.add("card");
  liElem.id = `card-${team["TeamID"]}`;
  liElem.append(cardInnerContainerElem);
  liElem.append(aElem);
  liElem.append(h3Elem);

  NBACodeStars.cardsContainerElem.append(liElem);
};

// Function to set up event listener on the select dropdown
NBACodeStars.getSelection = () => {
  NBACodeStars.dropdownElem.addEventListener("change", () => {
    const options = document.querySelectorAll("li");
    let noSelection = true;

    NBACodeStars.cardsContainerElem.innerHTML = "";

    // Display all the team cards selected
    for (const option in options) {
      // Only show the card if there is an actual team selected
      if (options[option].ariaSelected && options[option].value !== "all") {
        const id = parseInt(options[option].id);

        console.log(typeof id);

        noSelection = false;

        const teamData = NBACodeStars.teamsData.find((team) => {
          console.log(team["TeamID"]);
          console.log(typeof team["TeamID"]);

          return team["TeamID"] === id && team;
        });
        NBACodeStars.displayTeamCard(teamData);
      }
    }

    // Display all team cards if no specific team is selected
    if (noSelection) {
      NBACodeStars.teamsData.forEach((team) => {
        NBACodeStars.displayTeamCard(team);
      });
    }
  });
};

// Add event listener to the team details buttons populated
// Call the function when team details button has been created
NBACodeStars.teamDetailsListener = (btnElement) => {
  btnElement.addEventListener("click", (e) => {
    // Determine which team was selected based on the id of the card it is in
    const cardId = e.target.closest(".card").id;
    const teamId = cardId.split("-")[1];

    // Collect team details in a variable
    const teamDetailsObj = NBACodeStars.teamsData.find(
      (team) => team["TeamID"] === parseInt(teamId)
    );

    // Create team details card

    // Create elements to hold team details

    // TODO: REFACTOR THIS CODE TO INNER HTML
    const closeIconElem = document.createElement("i");
    closeIconElem.classList.add("fas", "fa-times", "closeIcon");
    closeIconElem.tabIndex = "0";

    const cityElem = document.createElement("p");
    cityElem.innerHTML = teamDetailsObj["City"];
    cityElem.classList.add("city");

    const cityLabelElem = document.createElement("p");
    cityLabelElem.innerHTML = "City";
    cityLabelElem.classList.add("teamDetailsLabel");

    const conferenceElem = document.createElement("p");
    conferenceElem.innerHTML = teamDetailsObj["Conference"];
    conferenceElem.classList.add("conference");

    const conferenceLabelElem = document.createElement("p");
    conferenceLabelElem.innerHTML = "Conference";
    conferenceLabelElem.classList.add("teamDetailsLabel");

    const divisionElem = document.createElement("p");
    divisionElem.innerHTML = teamDetailsObj["Division"];
    divisionElem.classList.add("division");

    const divisionLabelElem = document.createElement("p");
    divisionLabelElem.innerHTML = "Division";
    divisionLabelElem.classList.add("teamDetailsLabel");

    // Create an overlay container to hold team details and append details into it
    const teamDetailsCardElem = document.createElement("div");
    teamDetailsCardElem.classList.add("teamDetailsCard");
    teamDetailsCardElem.append(closeIconElem);
    teamDetailsCardElem.append(cityLabelElem);
    teamDetailsCardElem.append(cityElem);

    teamDetailsCardElem.append(conferenceLabelElem);
    teamDetailsCardElem.append(conferenceElem);

    teamDetailsCardElem.append(divisionLabelElem);
    teamDetailsCardElem.append(divisionElem);

    // append overlay to card inner div for the card selected
    const cardElem = document.getElementById(cardId);
    const cardInnerContainer =
      cardElem.getElementsByClassName("cardInnerContainer")[0];

    cardInnerContainer.append(teamDetailsCardElem);

    // Event listener to close the team details card when close icon is clicked
    // ASK: Does .remove() get rid of the event listener on the close icon as well?
    closeIconElem.addEventListener("click", (e) => {
      const teamDetailsCard = e.target.closest(".teamDetailsCard");

      // Refactor to create a general fadeout animation
      teamDetailsCard.classList.add("fadeOut");
      setTimeout(function () {
        teamDetailsCard.remove();
      }, 500);

      // Remove the team details button and add the player details button
      // Refactor with team details button being removed and player details being added
      const playerDetailsBtn =
        cardElem.getElementsByClassName("btnPlayerDetails")[0];
      playerDetailsBtn.remove();

      const aElem = document.createElement("a");
      aElem.innerHTML = "Team details";
      aElem.classList.add("btn");
      aElem.classList.add("btnTeamDetails");
      aElem.ariaRole = "button";
      aElem.tabIndex = "0";

      cardInnerContainer.parentNode.insertBefore(
        aElem,
        cardInnerContainer.nextSibling
      );

      // Add event listener to the team details button
      NBACodeStars.teamDetailsListener(aElem);
    });

    // Remove the team details button and add the player details button
    // Refactor this code with the player details event listener code
    const teamDetailsBtn = cardElem.getElementsByClassName("btnTeamDetails")[0];
    teamDetailsBtn.remove();

    const aElem = document.createElement("a");
    aElem.innerHTML = "Roster";
    aElem.classList.add("btn");
    aElem.classList.add("btnPlayerDetails");
    aElem.ariaRole = "button";
    aElem.tabIndex = "0";

    aElem.addEventListener("click", (e) => {
      const cardId = e.target.closest(".card").id;
      const teamId = cardId.split("-")[1];

      NBACodeStars.displayPlayerDetails(teamId);
    });
    aElem.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        const cardId = e.target.closest(".card").id;
        const teamId = cardId.split("-")[1];
        NBACodeStars.displayPlayerDetails(teamId);
      }
    });

    cardInnerContainer.parentNode.insertBefore(
      aElem,
      cardInnerContainer.nextSibling
    );
  });
};

// Display player details on the screen
NBACodeStars.displayPlayerDetails = (teamId) => {
  // Create player details modal
  // Create close icon -> refactor code from above to manage close icon functionality
  const closeIconElem = document.createElement("i");
  closeIconElem.classList.add("fas", "fa-times", "closeIcon");
  closeIconElem.tabIndex = "0";

  const playerDetailsContainerElem = document.createElement("div");
  playerDetailsContainerElem.classList.add("playerDetailsContainer");
  playerDetailsContainerElem.append(closeIconElem);

  const playerDetailsOuterElem = document.createElement("div");
  playerDetailsOuterElem.classList.add("playerDetailsOuterContainer");
  playerDetailsOuterElem.append(playerDetailsContainerElem);

  const bodyElem = document.querySelector("body");
  bodyElem.prepend(playerDetailsOuterElem);

  closeIconElem.addEventListener("click", (e) => {
    const playerDetailsOuterContainerElem = e.target.closest(
      ".playerDetailsOuterContainer"
    );

    // Refactor to create a general fadeout animation
    playerDetailsOuterContainerElem.classList.add("fadeOut");
    setTimeout(function () {
      playerDetailsOuterContainerElem.remove();
    }, 500);
  });

  // Determine which team was selected
  const teamDetailsObj = NBACodeStars.teamsData.find(
    (team) => team["TeamID"] === parseInt(teamId)
  );

  const teamAbbreviation = teamDetailsObj["Key"];

  // Make async api call to get player details on page load
  // const promise = [];
  // promise.push(NBACodeStars.getPlayersByTeamBiodata(teamAbbreviation));
  // promise.push(NBACodeStars.getPlayersByTeamStatsData(teamAbbreviation));

  // const promises = Promise.all(promise);
  // promises
  //   .then(() => {
  //     console.log(NBACodeStars.playerByTeamBiodata);
  //     console.log(NBACodeStars.playerByTeamStatsData);
  //   })
  //   .then(() => NBACodeStars.displayPlayerBio());

  //  - Stats data shown (2020-2021 Regular Season stats)
  //    - Games
  //    - Started
  //    - Minutes / Games
  //    - FieldGoalsPercentage
  //    - ThreePointersPercentage
  //    - FreeThrowsPercentage
  //    - Points / Games
  //    - Rebounds / Games
  //    - Assists / Games
  //    - Steals / Games
  //    - BlockedShots / Games
  //    - Turnovers / Games
  //    - FantasyPointsDraftKings
  //    - FantasyPointsFanDuel
  //    - FantasyPointsFantasyDraft
  //    - FantasyPointsYahoo

  // Internal table fixed with same elements for player img, name
  //  - make div position absolute
};

NBACodeStars.displayPlayerBio = () => {

  
  // Create following elements to create stat table
  //  - div
  //  - table
  //  - thead
  //  - tr with th elements
  //  - tbody
  //  - tr with td elements
  //  - wrap img element with span
  //  - img element for pictures
  //  - button on top right to toggle from bio data and player data
  //  - Bio data shown
  //    - PlayerID
  //    - img: UsaTodayHeadshotNoBackgroundUrl
  //    - name FirstName LastName
  //    - Primary position: Position
  //    - Jersey
  //    - BirthDate
  //    - BirthCountry
  //    - Experience
  //    - Salary

  // table header data
  const tableHeadEl = NBACodeStars.createBioTableHead();

  // table body data
  const tableBodyEl = NBACodeStars.createBioTableBody();
  tableBodyEl.classList.add("playerBioTableBody");

  // table
  const tableEl = document.createElement("table");
  tableEl.append(tableHeadEl);
  tableEl.append(tableBodyEl);

  // table container
  const tableContainerEl = document.createElement("div");
  tableContainerEl.classList.add("rosterTableContainer");
  tableContainerEl.append(tableEl);

  // roster header
  const toggleContainer = document.createElement('div')
  toggleContainer.innerHTML = 'i'
  const headerEl = document.createElement("div");
  headerEl.classList.add("rosterHeader");

  // roster container
  const playerDetailsContainerEl = document.querySelector(
    ".playerDetailsContainer"
  );
  playerDetailsContainerEl.append(headerEl);
  playerDetailsContainerEl.append(tableContainerEl);
};



// Function to create the table heading for the bio data table
NBACodeStars.createBioTableHead = () => {
  const tableHeadEl = document.createElement("thead");
  const trEl = document.createElement("tr");

  const headerObj = [
    "Player",
    "Position",
    "Jersey",
    "Birthday",
    "Country",
    "Experience",
    "Salary",
  ];

  headerObj.forEach((heading) => {
    const thEl = document.createElement("th");
    thEl.innerText = heading;
    trEl.append(thEl);
  });

  tableHeadEl.append(trEl);

  return tableHeadEl;
};

NBACodeStars.createBioTableBody = () => {
  const tableBodyEl = document.createElement("tbody");

  //  - Bio data shown
  //    - PlayerID
  //    - img: UsaTodayHeadshotNoBackgroundUrl
  //    - name FirstName LastName
  //    - Primary position: Position
  //    - Jersey
  //    - BirthDate
  //    - BirthCountry
  //    - Experience
  //    - Salary

  NBACodeStars.playerByTeamBiodata.forEach((player) => {
    const { PlayerID, PhotoUrl, FirstName, LastName } = player;

    const statsKeys = [
      "Position",
      "Jersey",
      "Birthday",
      "BirthCountry",
      "Experience",
      "Salary",
    ];

    // Player name
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", PhotoUrl);
    imgEl.setAttribute("alt", `${FirstName} ${LastName}`);

    const firstNameEl = document.createElement("span");
    firstNameEl.textContent = FirstName;

    const lastNameEl = document.createElement("span");
    lastNameEl.textContent = LastName;

    const nameContainerEl = document.createElement("div");
    nameContainerEl.append(firstNameEl);
    nameContainerEl.append(lastNameEl);

    const playerNameTdEl = document.createElement("td");
    playerNameTdEl.append(imgEl);
    playerNameTdEl.append(nameContainerEl);

    // Create the table row for the player
    const trEl = document.createElement("tr");
    trEl.setAttribute("data-playerId", PlayerID);
    trEl.append(playerNameTdEl);

    // Player stats
    statsKeys.forEach((key) => {
      const stat = player[key];
      const tdEl = document.createElement("td");
      tdEl.textContent = stat;
      trEl.append(tdEl);
    });

    tableBodyEl.append(trEl);
  });

  return tableBodyEl;
};


NBACodeStars.displayToggleButton = () => {
  const toggleButtonContainer = document.createElement('div')
    const toggleButtonHtml = `
  <input class="input" id="toggle" type="checkbox">
<label class="label" for="toggle">
  <div class="left">
    Option A
  </div>

  <div class="switch">
    <span class="slider round"></span>
  </div>

  <div class="right">
    Option B
  </div>
</label>
  `;

  toggleButtonContainer.innerHTML = toggleButtonHtml;


  toggleButtonLocation = document.querySelector('.teamCardsSection')
  toggleButtonLocation.append(toggleButtonContainer)
}

NBACodeStars.displayToggleButton();
console.log(displayToggleButton)












// 0. Calling the init to hit it off
NBACodeStars.init();

// TODO:
// Error handling on landing to the page
// Format the bio modal
//  - have a darker hover state over the cell highlighted
//  - add scroll bar to modal
// Create a button on the modal to flip between stats and bio data
// Display stats data when stats button is clicked
//  - Format stats data
// Error handling when trying to retrieve roster stats
// Loading spinner

// STRETCH GOALS
//  1. Show players to the user after they have clicked the show player button.
// 	2. Create event listener to listen for the click on the specific team. Use the event variable to extract the ID of the element that the user clicked.
// 	     a. Filter the player details variable to extract all the players that have the same team ID as what we extracted.
// 	      b. Save the player names in  a separate variable
// 	3. Create html elements to store players first name, last name and position.
// 	4. Display on screen over the team image container. Create link for each player to show their stats.
// 	5. Make API Call to retrieve player headshot and create an html element that displays with player name on the screen.
// FINAL STRETCH GOALS 2 MORE STRETCHY
// 	1. Display player stats
// 		2. Populate the link on each player so their individual stats are shown: points, rebounds, assists, blocks, steals, field goal percentage, turnover.
// FUN STRETCH GOAL
// 	1. Cage Finder!
// 	2. A button in the top right hand corner of the screen with Nicholas Cages face that says CAGE FINDER
// 	3. It throws up 10 movie posters of Nicholas Cage with titles
// 	4. There is a button that says back to basketball which takes us back to the original site.





