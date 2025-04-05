// SOURCE: https://bitbucket.org/geo-jobe/weather/src/master/

// Check if the browser supports the Geolocation API
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => { // success
            // Store the user's latitude and longitude
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Logs the latitude and longitude to the console
            console.log(
                `%clatitude: ${latitude}, longitude: ${longitude}`,
                "color: green"
            )
            // Call the function to get weather API endpoints
            getEndpoints(latitude, longitude)
        },
        (error) => console.error( // error
            `%cError getting location: ${error.message}`,
            "color: red"
        )
    )
} else { // Browser does not support the Geolocation API
    console.error(
        "%cGeolocation is not supported by this browser.",
        "color: red"
    )
}

// weather.gov endpoint API
async function getEndpoints(latitude, longitude){
    try {
        // Use latitude and longitude to retrieve gridpoints
        const response = await fetch(
            `https://api.weather.gov/points/${latitude},${longitude}`
        )
        // If the fetch response fails
        if(!response.ok) {
            throw new Error(
                `Fetching endpoints failed. Network response: ${response.status}`
            )
        }
        // Await the response, parse the JSON, and store the data
        const data = await response.json();
        // Store the office and points from the data
        const office = data.properties.gridId;
        const gridX  = data.properties.gridX;
        const gridY  = data.properties.gridY;
        // Call the weather API to get the forecast using the data
        getForecast(office, gridX, gridY);
    } catch(error) {
        console.error(`%c${error.message}`, "color: red")
    }
}

// weather.gov forecast API
async function getForecast(office, gridX, gridY){
    try {
        const response = await fetch(
            //`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`
            `https://api.weather.gov/gridpoints/TOP/25,25/forecast`
        )
        // If the fetch response fails
        if (!response.ok){
            throw new Error(
                `Fetching forecast failed. Network response: ${response.status}`
            )
        }
        // Await the response, parse the JSON, and store the data
        const data = await response.json()
        // Store the periods from the data
        const periods = data.properties.periods
        // Create the weather cards on the web page
        createWeatherCards(periods)
    } catch (error){
        console.error(`%c${error.message}`, "color: red");
    }
}

// Populate web page with weather information cards
function createWeatherCards(periods) {
    // Store the card container div from index.html
    const cardContainer = document.getElementById("card-container")
    // Create a card for each element in the periods array
    let i = 0
    periods.forEach((element) => {
        if (i % 2 == 0) {
            // Create the html elements
            const div = document.createElement("div")
            const h2  = document.createElement("h2")
            const img = document.createElement("img")
            const p   = document.createElement("p")
            // Set the icon to be used as the large version
            const icon = element.icon.replace("medium", "large")
            // Set the new div class to "card"
            div.setAttribute("class", "card")
            // Set the new img attributes
            img.setAttribute("src", icon)
            img.setAttribute("alt", element.shortForecast)
            // Set the text content for the card title and forecast
            h2.textContent = element.name
            p.textContent  = element.shortForecast
            // Append the title, image, and forecast to the card div
            div.appendChild(h2)
            div.appendChild(img)
            div.appendChild(p)
            // Append the card to the card container div
            cardContainer.appendChild(div)
        }
        if (element.name == "Tonight") i++;
        i++;
    })
    // Set favicon to the first weather icon
    const head = document.getElementsByTagName("head")[0]
    const link = document.createElement("link")
    link.rel   = "icon"
    link.href  = periods[0].icon.replace("medium", "small")
    head.appendChild(link)
}