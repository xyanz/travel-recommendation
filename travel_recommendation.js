const searchButton = document.getElementById('search-button')
const clearButton = document.getElementById('search-reset')
const resultDiv = document.getElementById('results-container')
let searchResults = [];

function search() {
    const input = document.getElementById('search-input').value.toLowerCase();
    

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if(input === 'country' || input === 'countries') {
                const index1 = Math.floor(Math.random() * data.countries.length);
                let index2 = Math.floor(Math.random() * data.countries.length);
                
                while (index2 === index1) {
                    index2 = Math.floor(Math.random() * data.countries.length);
                }

                const country1 = data.countries[index1];
                const country2 = data.countries[index2];

                const city1 = country1.cities[Math.floor(Math.random() * country1.cities.length)]
                const city2 = country2.cities[Math.floor(Math.random() * country2.cities.length)]
                
                searchResults = [city1, city2];
            }
            else if(input === 'beach' || input === 'beaches') {
                searchResults = data.beaches
            }
            else if(input === 'temple' || input === 'temples') {
                searchResults = data.temples
            }

            resultDiv.innerHTML = '';

            searchResults.forEach(item => {
                const cardHtml = `
                    <div class='card'>
                        <img src="${item.imageUrl}" alt="item.description" class="card-img">
                        <div class='card-body'>
                            <h2 class='card-title'>${item.name}</h2>
                            <p class='card-text'>${item.description}</p>
                            <a href='#' class='card-button'>Visit</a>
                        </div>
                    </div>
                `
                resultDiv.innerHTML += cardHtml;
            })

        })
}
searchButton.addEventListener('click', search)

function clearInput() {
    document.getElementById('search-input').value = '';
    resultDiv.innerHTML = '';
}

clearButton.addEventListener('click', clearInput)