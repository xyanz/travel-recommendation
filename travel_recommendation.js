const searchButton = document.getElementById('search-button')
const clearButton = document.getElementById('search-reset')
let searchResults = [];

function search() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultDiv = document.getElementById('results-container')
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log('travel data', data)
            console.log('input data', input)

            if(input === 'country' || input === 'countries') {
                const index1 = Math.floor(Math.random() * data.length);
                let index2 = Math.floor(Math.random() * data.length);
                
                while (index2 === index1) {
                    index2 = Math.floor(Math.random() * data.length);
                }
                
                searchResults = [data[index1], data[index2]]
            }
            if(input === 'beach' || input === 'beaches') {
                searchResults = data.beaches
            }
            if(input === 'temple' || input === 'temples') {
                searchResults = data.temples
            }

            resultDiv.innerHTML = `<h2>${searchResults[0].name}</h2>`
            resultDiv.innerHTML += `<p>${searchResults[0].description}</p>`


        })
}
searchButton.addEventListener('click', search)