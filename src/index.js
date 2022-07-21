window.addEventListener("DOMContentLoaded", () => {
    fetchPlaces()
})

function fetchPlaces() {
    fetch("http://localhost:3000/places")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
}