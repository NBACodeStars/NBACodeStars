// Function to create an icon that comes with event listener to close elements
export const createCloseIcon = (closingEl) => {
  // Create the icon element
  const iconEl = document.createElement("i");
  iconEl.classList.add("fas", "fa-times", "closeIcon");
  iconEl.tabIndex = "0";

  // Add event listener to close and remove modal on click
  iconEl.addEventListener("click", () => {
    removeElement(closingEl);
  });

  // Add event listener to close and remove modal on pressing enter key
  iconEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      removeElement(closingEl);
    }
  });

  return iconEl;
};

// Function that adds a fadeout animation when removing elements from the page
const removeElement = (closingEl) => {
  closingEl.classList.add("fadeOut");
  setTimeout(function () {
    closingEl.remove();
  }, 500);
};

// Retrieve the team data object based on the team id provided
export const getTeamByTeamId = (teamsData, teamId) => {
  return teamsData.find((team) => team.TeamID === parseInt(teamId));
};

// Retrieve the player data object based on the player id provided
export const getPlayerByPlayerId = (teamData, playerId) => {
  return teamData.find((team) => team.PlayerID === parseInt(playerId));
};

// Create a button
export const createBtn = () => {
  const btn = document.createElement("a");
  btn.innerHTML = "Button";
  btn.classList.add("btn");
  btn.ariaRole = "button";
  btn.tabIndex = "0";

  return btn;
};

// Format a number to have commas
// Credits: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
