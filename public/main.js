const filmDetails = document.getElementById("film-descr")

//Fetches all our data from our film api
function loadFilms() {
    fetch("https://jacobmuchori.github.io/db.json")
    .then((response)=> response.json())
    .then((data => data.films.forEach(films => displayfilmNames(films))));
}

//fetches and displays the first films data
function dispfirstfilm() {
    fetch("https://jacobmuchori.github.io/db.json")
    .then((response)=> response.json())
    .then((data => displayMovieDetails(data.films[0])))
}

//displays all the films titles on the left menu
function displayfilmNames(films) {
    const filmNames = document.createElement("li")
    filmNames.className= ("film-list")
    filmNames.textContent= films.title
    filmDetails.append(filmNames)

    //displays a films data when a film title is clicked
    filmNames.addEventListener("click", function onclick() {
       displayMovieDetails(films);
    })
   
}

//This code shows a films details
function displayMovieDetails(films) {
    const filmName = document.getElementById("film-name")
    const filmImg = document.getElementById("film-image")
    const filmDescr = document.getElementById("film-description")
    const filmRuntime = document.getElementById("film-runtime")
    const filmShowtime = document.getElementById("film-showtime")
    const availabletickets = document.getElementById("available-tickets")
    filmName.textContent= films.title
    filmImg.src= films.poster
    filmDescr.textContent= films.description
    filmRuntime.textContent=`Runtime: ${films.runtime}minutes`
    filmShowtime.textContent=`Time: ${films.showtime}`
    let remaindertickets = films.capacity - films.tickets_sold
    availabletickets.textContent=`Available tickets: ${remaindertickets}`
    const filmButton = document.getElementById("ticket-buyer")
    filmButton.dataset.id = films.id

    //This button enables us to purchase a ticket
    filmButton.addEventListener("click", function reduceTickets() {
        if (remaindertickets>=0) {
            availabletickets.textContent =`Available tickets: ${remaindertickets--}`
        }
        else if (remaindertickets < 0) {
            availabletickets.textcontent=`Available tickets: ${remaindertickets=0}`
            filmButton.innerText= 'Sold out'
        }
    })


}


document.addEventListener("DOMContentLoaded", (e) => {
    console.log("The DOM has loaded")
    loadFilms()
    dispfirstfilm()

})