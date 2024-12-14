var searchInput = document.getElementById('search');
var submitInput = document.getElementById('submit');

  
async function getWeather(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=73cedcc1e160449c9ef214022241212&q=${city}&days=3`);
        const result = await response.json();

        console.log(result);

        display(result.forecast.forecastday , result.location.name , result.location.country)

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
  
  searchInput.addEventListener('input',function(){
    getWeather(searchInput.value)
  
  })

  submitInput.addEventListener('click',function(){
    weather(searchInput.value)
  })
  

function display(data, city) {
    let cartona = '';

    for (let i = 0; i < data.length; i++) {
        const day = data[i];
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = `${date.getDate()} ${date.toLocaleDateString("en-US", { month: "long" })}`;

        const isSecondOrThird = (i === 1 || i === 2);

        if (isSecondOrThird) {
            cartona += `
                <div class="col-md-12 col-lg-4 ${i === 1 ? 'weather3' : 'weather2'}">
                    <div class="overlay">
                        <div class="d-flex justify-content-center day">
                            <p>${dayName}</p>
                        </div>
                    </div>
                    <div class="text-center thursday">
                        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="py-4">
                        <div class="d-flex justify-content-center degree2">
                            <p>${day.day.avgtemp_c}</p>
                            <p class="deg2">°</p>
                            <p>C</p>
                        </div>
                        <div class="d-flex justify-content-center degree3">
                            <p>${day.day.mintemp_c}</p>
                            <p class="deg3">°</p>
                        </div>
                        <p class="cloud py-3">${day.day.condition.text}</p>
                    </div>
                </div>
            `;
        } else {
            cartona += `
                <div class="col-md-12 col-lg-4 ${i === 1 ? 'weather3' : 'weather2'}">
                    <div class="overlay">
                        <div class="d-flex justify-content-between day">
                            <p>${dayName}</p>
                            <p>${formattedDate}</p>
                        </div>
                    </div>
                    <div>
                        <p class="my-4 mx-3">${city}</p>
                    </div>
                    <div class="d-flex degree px-4">
                        <p>${day.day.avgtemp_c}</p>
                        <p class="deg">°</p>
                        <p>C</p>
                    </div>
                    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="w-25 mx-4">
                    <p class="mx-4 cloud">${day.day.condition.text}</p>
                    <div class="py-4 px-4">
                        <span class="px-2">
                            <img src="./imgs/icon-umberella@2x.png" alt="icon-umbrella" width="25">
                            ${day.day.daily_chance_of_rain}%
                        </span>
                        <span class="px-2">
                            <img src="./imgs/icon-wind@2x.png" alt="icon-wind" width="25">
                            ${day.day.maxwind_kph} km/h
                        </span>
                        <span class="px-2">
                            <img src="./imgs/icon-compass@2x.png" alt="icon-compass" width="25">
                            ${day.day.wind_dir || 'N/A'}
                        </span>
                    </div>
                </div>
            `;
        }
    }

    document.getElementById('demo').innerHTML = cartona;
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                console.log("Latitude:", lat, "Longitude:", lon);

                try {
                    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=73cedcc1e160449c9ef214022241212&q=${lat},${lon}&days=3`);
                    const result = await response.json();
                    console.log(result);

                    const country = result.location.country;

                    display(result.forecast.forecastday, country);
                } catch (error) {
                    console.error("Error fetching weather data for user's location:", error);
                }
            },
            function (error) {
                console.error("Error getting location:", error);
                alert("Unable to fetch location. Please search manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Call getUserLocation when the page loads
getUserLocation();


