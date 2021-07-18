
    
    // key - bc9b7d4e7d76676601ab9360b373eedc
    // example request - https://api.themoviedb.org/3/movie/550?api_key=bc9b7d4e7d76676601ab9360b373eedc
    // Documentation: https://www.themoviedb.org/documentation/api

// First creating our namespace for the application  k
const cageFinder = {}
// holding our api content in memory
cageFinder.baseURL = "https://api.themoviedb.org/3"
cageFinder.apiKey = ""
// hold all of our genres in memory
cageFinder.genres = []
// hold all of the movies from the API that the user has selected
cageFinder.userSelectedMovies = []
// perform a network request
cageFinder.fetchMovieGenres = () => {
    const url = new URL(`${cageFinder.baseURL}/genre/movie/list`)
    url.search = new URLSearchParams({
        api_key: cageFinder.apiKey
    })
    fetch(url)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            // assigning the genres to the yikesMovieApp.genres object
            cageFinder.genres = data.genres
            cageFinder.displayMovies(cageFinder.genres)
        })
}
//displaying the new genres to the dropdown menu
cageFinder.displayMovies = (listOfMovies) => {
    // getting the select element from the screen
    const selectUl = document.getElementsByClassName("cageUl")
    // loop through the list of genres and append to the select element
    listOfMovies.forEach((movie) => {
        // create the new option
        const newLi = document.createElement("option")
        // provide the option with values
        newLi.textContent = movie.name 
        newLi.setAttribute("value", movie.id)
        // append the values to the select element
        selectUl.append(newLi)
    })
}
// add an event listener to the form
// so that we can get the users information
cageFinder.getUserInformation = () => {
    const formEl = document.querySelector("form")
    formEl.addEventListener("submit", (event) => {
        event.preventDefault()
        const userSelection = event.target[0].value
        cageFinder.susan(userSelection)
    })
}
// create function to grab all movies within a genre
// susan = fetch movies by genre plz 😃
cageFinder.susan = (genre) => {
    const url = new URL(`${cageFinder.baseURL}/discover/movie`)
    url.search = new URLSearchParams({
        api_key: cageFinder.apiKey,
        with_genres: genre
    })
    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cageFinder.userSelectedMovies = data.results
            cageFinder.jennifer(cageFinder.userSelectedMovies)
        })
}
//render to the content to the page
cageFinder.jennifer = (movies) => {
    const moviesList = document.getElementById("movies") 
    moviesList.innerHTML = ""
    movies.forEach((movie) => {
        // Create a new list item
        const newListItem= document.createElement("li")
        // Create a new image
        const newListPhoto = document.createElement("img")
        // Append Image information to the image
        const movieImage = `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
        newListPhoto.setAttribute("src", movieImage)
        newListPhoto.setAttribute("alt", `This is a poster for the movie: ${movie.title}`)
        // Create new paragraph elements and add in the content
        const newListTitle = document.createElement("p")
        newListTitle.textContent = movie.title
        const newListOverview = document.createElement("p")
        newListOverview.textContent = movie.overview
        const newListMetric = document.createElement("p")
        newListMetric.textContent = `Average rating of: ${movie.vote_average}; from ${movie.vote_count} users`
        //Add new content to the new list item 
        newListItem.appendChild(newListPhoto)
        newListItem.appendChild(newListTitle)
        newListItem.appendChild(newListOverview)
        newListItem.appendChild(newListMetric)
        // Add content to the screen!
        moviesList.append(newListItem)
    })
}
// random movie button
cageFinder.safi = () => {
 // Will finish off later!
}
//init = paul
cageFinder.paul = () => {
    cageFinder.fetchMovieGenres()
    cageFinder.getUserInformation()
    cageFinder.safi()
}
cageFinder.paul()