const apiKey = "d5e1096fdf421aaf3e4075ba44da14e8";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

const searchBox = document.querySelector(".input input");
const searchBtn = document.querySelector(".input button");
const weatherIcon = document.querySelector(".weather-icon");

async function fetchData(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "inline";
    document.querySelector(".all").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/ph";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/sun.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".error").style.display = "none";
    document.querySelector(".all").style.display = "inline";
  }
}

searchBox.addEventListener('keydown',(e)=>{
  if(e.key === "Enter"){
     fetchData(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  fetchData(searchBox.value);
});
