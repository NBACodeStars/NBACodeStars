# NBA Code Stars

## About

### Description

NBA Code Stars is a pair programming project developed by Andrew Craig and Kaunain Karmali. It is designed to help NBA fans (like ourselves!) review roster bio data and stats for all 30 NBA teams.

### Key features

The following features exist:
* Custom select dropdown to filter for teams, built following a11y standards to ensure keyboard and screen-reader accessibility 
* Includes error handling to alert the user if errors occur when making RESTful API calls to retrieve roster data from the Sports Data API
* Users can toggle between roster bio and player stats
* Mobile responsive 
* Keyboard and screen-reader accessible

### Project status

This project is complete.

## Getting started

Begin using the app by performing the following:

1. Clone down this repository. You will need `node` or `nodemon` and `npm` installed globally on your machine.

2. Begin running the app in your terminal
  * Run live server VS Code extension (this extension can be found [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  * Go to `localhost:5000` on your browser, or the appropriate port that your live server extension is configured to

3. To visit and use the app:
  * Select your team from the dropdown
  * Click on `Team Details` button to review basic team information
  * Click on `Roster` button to review roster data
  * Toggle between `Bio` and `Stat` to review the desired roster data

## Technology used

The following technology was used in the development of NBA Code Stars:
* HTML5
* SASS / SCSS
* JavaScript (ES6)
* Sports Data API

## Reflection

### How we got started

The project is a pair programming project developed at Juno College's Web Development Bootcamp. Our goal was to cater to NBA fans like us who want to stay up to date with player bio data and stats. We began by brainstorming the features we wanted before prioritizing features between our minimum viable product vs. our stretch goals. Next, we created a desktop and mobile wireframe before pseudo coding the app and beginning to code.

### Technical challenge

Our technical challenge was keeping the app DRY and easy to read, as we began with a single JavaScript file. Given the size of the app, managing everything in one file became difficult to maintain. This is when we began googling and came across stackoverflow posts suggesting the use of JavaScript modules. This helped make our app modular, as we divided the code base into distinct files to separate our logic into distinct but connected modules.
