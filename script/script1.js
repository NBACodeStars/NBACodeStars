
// (1) Loading team names to it dynamically (it will likely require some mods to how our JS function was set up for the initial dropdown we worked on yesterday)
// Populating the options on page load
// Populating the options on page load

// replace line 19 up at the top with:
NBACodeStars.teamDropdownUl =
  document.getElementsByClassName("dropdown");

  // called on line 37 as:
  NBACodeStars.displayOptions(NBACodeStars.teamsData);


  // Replacing line 44
NBACodeStars.displayOptions = () => {

  teams.forEach((team) => {
    const teamName = team.full_name;

    const optionLi = document.createElement("li");
    // This could be any header element or a button
    optionUl.innerText = teamName;
    // Do we still need a value here if they are not option elements
    optionLi.value = teamName;
    optionLi.id = team.id;
    optionLi.tabIndex = "0";
    optionLi.role = "option";
    // This will be the css class background color toggled on or off
    

    NBACodeStars.teamDropdownUl.append(optionLi);

    // This still needs to be called 
    NBACodeStars.displayTeamCard(team);
  });

}

// we should try to add the following to the teamDropdownElem when it's created at the top. Hopefully it will apply scroll.
    
    NBACodeStars.teamDropdownElem =
    document.getElementsByClassName("teamDropdown")[0];
    teamDropDownElem.style.overflow.scroll
    teamDropDownElem.style.overflow-x.hidden
    
    // overflow: scroll;
    // overflow-x: hidden;


    // LINE 101 CODE
    // CHANGED
    // (2) When someone clicks on one team from the dropdown, give it a different shade to show its been selected. And when they select it again that the colour style is restored to default
NBACodeStars.highLightOption = () => {
  NBACodeStars.teamDropdownElem.addEventListener("click", (event) => {
    console.log(event.target)
    let selectedChoice =  event.target 
    selectedChoice.toggle("highLight");
  });
}

// called under line 16 as:
NBACodeStars.highLightOption()

    
    // .highLight {
    //   backgroundColor: lightGrey;
    // }

    

   // (3) When no teams are selected, to display all 30 teams (this currently works under the old dropdown we created but not under the new custom dropdown