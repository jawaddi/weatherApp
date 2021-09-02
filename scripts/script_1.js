// our selectors from html page
const cityForm = document.querySelector("form");
// document.querySelector("body").style.backgroundImage =
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon_img");
// this function is responsible updating userInterface after we get our data or you you can say display data in userInterface
const updateUI = (data) => {
  // data = { cityDetails, weather}
  // destructing data
  const { cityDetails, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
  `;
  // we garantie that in the beginning we won't show our card
  card.classList.remove("d-none");
  // check if day or night
  let timeSrc = weather.IsDayTime ? "/img/day.svg" : "/img/night.svg";

  // we can use setAttribute property
  // display if day or night
  time.src = timeSrc;
  // display weather icon
  icon.src = `/img/icons/${weather.WeatherIcon}.svg`;
};

// this function is responsible to return our data after we give it the name of the city and it's async function
const updateCity = async (city) => {
  // getCityKey function and getWeather are from script.js page check it out
  // await is that we will not asigne cityDetails until getCityKey function finish its task
  const cityDetails = await getCityKey(city);
  // after cityDetials get cityData we intersted on the key value that we will use to get data weather
  const weather = await getWeather(cityDetails.Key); // here we send the key through getweather function.
  // finally we can return all data about the city and her weather
  return { cityDetails, weather };
};
// here we touch our form to get city name
cityForm.addEventListener("submit", function (e) {
  // prevent the page not be refreched
  e.preventDefault();
  // get city name
  const city = this.city.value.trim();
  this.reset();
  // we pass the name city to return all data
  // updateCity function return A Promise so we have to use then funcion to solve it
  updateCity(city)
    .then((data) => updateUI(data)) // we pass the data that we get from updateCity fucntion to updateUI function to display it
    .catch((e) => console.log("something wrong check your code motherF*cker")); // if some thing doesn't going well we display this messg
});
