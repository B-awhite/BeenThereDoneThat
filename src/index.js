const bkgd = document.body.style.backgroundColor = "lightblue"

window.addEventListener("DOMContentLoaded", () => {
    fetchPlaces();
    addCreateForm()
})

function addPlace(event) {
    event.preventDefault()
    const locationInput = event.target.children[0]
    const cityInput = event.target.children[1]
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
    })
}

function showPlaces(places) {
    return places.map(place => showOnePlace(place)).join("")
}

function showOnePlace(place) {
    return `
      <div class="place-card" id="${place.id}">
         <div class="place-frame">
            <h4 class="center-text">${place.location}, ${place.city}</h4>
         </div>
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
