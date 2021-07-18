// Function that displays the teams in the dropdown
export const displayDropdownOption = (team, dropdownEl) => {
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
