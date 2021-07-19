import { createCloseIcon, createBtn } from "./utils.js";
import { displayRoster } from "./roster.js";

// *************************************************
// TEAM CARD FUNCTIONS
// *************************************************

// Function that displays the teams card
export const displayTeamCard = (team, cardsContainerEl) => {
  const { City, Name, WikipediaLogoUrl, TeamID } = team;
  const teamName = `${City} ${Name}`;

  // Team name
  const teamNameEl = document.createElement("h3");
  teamNameEl.innerText = teamName;
  teamNameEl.classList.add("cardTeamName");

  // Team image
  const teamImgEl = document.createElement("img");
  teamImgEl.src = WikipediaLogoUrl;
  teamImgEl.alt = `${teamName} logo`;
  teamImgEl.classList.add("cardImg");

  // Team image container
  const cardInnerEl = document.createElement("div");
  cardInnerEl.classList.add("cardInnerContainer");
  cardInnerEl.append(teamImgEl);

  // Team card
  const cardEl = document.createElement("li");

  // Team details button
  const teamBtnEl = createTeamDetailsBtn(team, cardInnerEl, cardEl);

  // Append elements to the card
  cardEl.classList.add("card");
  cardEl.setAttribute("data-card-id", TeamID);
  cardEl.append(cardInnerEl);
  cardEl.append(teamBtnEl);
  cardEl.append(teamNameEl);

  // Append to container
  cardsContainerEl.append(cardEl);
};

// *************************************************
// DISPLAY TEAM DETAILS FUNCTIONS
// *************************************************

// Function to create a button that shows team details card
const createTeamDetailsBtn = (team, cardInnerEl, cardEl) => {
  // Create the button that shows team details
  const teamBtnEl = createBtn();
  teamBtnEl.innerHTML = "Team details";
  teamBtnEl.classList.add("btnTeamDetails");

  // Add event listeners to show the team details for clicks and enter keypress
  teamBtnEl.addEventListener("click", () => {
    displayTeamDetails(team, cardInnerEl, cardEl);
  });
  teamBtnEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      displayTeamDetails(team, cardInnerEl, cardEl);
    }
  });

  return teamBtnEl;
};

// Function displays the team details to the user
const displayTeamDetails = (team, cardInnerEl, cardEl) => {
  const { TeamID, City, Conference, Division } = team;

  // Team details container
  const teamDetailsContainer = document.createElement("div");
  teamDetailsContainer.classList.add("teamDetailsContainer");

  // Team details container
  teamDetailsContainer.innerHTML += `
    <p class="teamDetailsLabel">City</p>
    <p class="city">${City}</p>
    
    <p class="teamDetailsLabel">Conference</p>
    <p class="city">${Conference}</p>
    
    <p class="teamDetailsLabel">Division</p>
    <p class="city">${Division}</p>
  `;

  // Create close icon that shows team details button again and closes team details container
  const closeIconEl = createCloseIcon(teamDetailsContainer);
  closeIconEl.addEventListener("click", () => {
    // Function to replace the player details button with team details button
    handleCloseIconClick(team, cardInnerEl, cardEl);
  });

  closeIconEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      // Function to replace the player details button with team details button
      handleCloseIconClick(team, cardInnerEl, cardEl);
    }
  });

  teamDetailsContainer.append(closeIconEl);

  // Display the card to the user
  cardInnerEl.append(teamDetailsContainer);

  // Change team details to player details button by removing team details button and creating player details button
  const teamBtn = cardEl.getElementsByClassName("btnTeamDetails")[0];
  teamBtn.remove();

  // Player details button
  const playerBtnEl = createBtn();
  playerBtnEl.innerHTML = "Roster";
  playerBtnEl.classList.add("btnPlayerDetails");

  // Event listener to show player details to the user on click or keyup
  playerBtnEl.addEventListener("click", () => {
    displayRoster(team);
  });
  playerBtnEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      displayRoster(team);
    }
  });

  // Show the button between the inner container and team name
  cardInnerEl.parentNode.insertBefore(playerBtnEl, cardInnerEl.nextSibling);
};

// Function to replace the player details button with team details button
const handleCloseIconClick = (team, cardInnerEl, cardEl) => {
  const playerBtn = cardEl.getElementsByClassName("btnPlayerDetails")[0];
  playerBtn.remove();

  const teamBtnEl = createTeamDetailsBtn(team, cardInnerEl, cardEl);
  cardEl.append(teamBtnEl);
  cardInnerEl.parentNode.insertBefore(teamBtnEl, cardInnerEl.nextSibling);
};
