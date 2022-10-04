const bkgd = document.body.style.backgroundColor = "lightblue"

window.addEventListener("DOMContentLoaded", () => {
    fetchPlaces();
    addCreateForm()
})

function addPlace(e) {
    e.preventDefault()
    const locationInput = e.target.children[0]
    const cityInput = e.target.children[1]
    fetch("http://localhost:3000/places", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            location: locationInput.value,
            city: cityInput.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
}

function fetchPlaces() {
    fetch("http://localhost:3000/places")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        const places = document.querySelector("#places-container")
        places.innerHTML = showPlaces(data)
        addPlaceEvents()
    })
}

function addPlaceEvents() {
    const places = document.querySelector("#places-container")
    places.addEventListener("click", deletePlace)
}

function deletePlace(e) {
    console.log(e.target.parentElement.id)
    fetch(`http://localhost:3000/places/${e.target.parentElement.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const placeNode = e.target.parentElement
    document.querySelector("#places-container").removeChild(placeNode)
}

function showPlaces(places) {
    return places.map(place => showOnePlace(place)).join("")
}

function showOnePlace(place) {
    return `
      <div class="place-card" id="${place.id}">
         <div class="place-frame" id="${place.id}">
            <h4 class="center-text">${place.location}, ${place.city}</h4>
            <button data-action="delete" class="place-delete-button">X</button>
         </div>
         <br>
         <br>
      </div>
      `
}

function addCreateForm() {
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form")
    form.innerHTML = `<input id="name-input" placeholder='Place' type='text'/><input id="location-input" placeholder='City' type='text'/><input id="place-submit" value="Create Place" type='submit'/>`
    formContainer.append(form)

    form.addEventListener("submit", addPlace)
}
