

const cageFinder = {}

cageFinder.baseURL = "https://api.themoviedb.org/3"
cageFinder.apiKey = "bc9b7d4e7d76676601ab9360b373eedc"
// AC key - bc9b7d4e7d76676601ab9360b373eedc


cageFinder.movies = []


// ***************************************************
// perform a network request
// ***************************************************

http://api.tmdb.org/3/search/person?api_key=KEY&query=tom%20hanks

cageFinder.findCage = () => {
    const url = new URL(`${cageFinder.baseURL}/search/person?api_key=KEY&query=Nicholas%04Cage`)
    url.search = new URLSearchParams({
        api_key: cageFinder.apiKey,
        q: "Nicholas Cage"
    })
    fetch(url)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            console.log(data)
           
            // cageFinder.movies = data.genres ???
            cageFinder.displayMovies(cageFinder.movies)
        })
}

// ***************************************************
// PUT CAGE ON THE PAGE!!
// ***************************************************

cageFinder.displayCage = (movies) => {
    const cageList = document.getElementsByClassName("cageList") 
    cageList.innerHTML = ""
    movies.forEach((movie) => {
      
        const newListItem= document.createElement("li")
       
        const newCagePhoto = document.createElement("img")
        
        const movieImage = `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
        newCagePhoto.setAttribute("src", movieImage)
        newCagePhoto.setAttribute("alt", `This is a poster for the movie: ${movie.title}`)
   
        const newListTitle = document.createElement("p")
        newListTitle.textContent = movie.title
        const newListOverview = document.createElement("p")
        newListOverview.textContent = movie.overview
        const newListMetric = document.createElement("p")
        newListMetric.textContent = `Average rating of: ${movie.vote_average}; from ${movie.vote_count} users`
      
        newListItem.appendChild(newCagePhoto)
        newListItem.appendChild(newListTitle)
        newListItem.appendChild(newListOverview)
        newListItem.appendChild(newListMetric)
        
        cageList.append(newListItem)
    })
}


cageFinder.getCageOnThePage = () => {
    cageFinder.findCage()
    
    
}
cageFinder.getCageOnThePage()