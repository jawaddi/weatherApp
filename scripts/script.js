const key = "dENX1hfUPeIqzgLBJM3kcvqs8TVgZrlk";
const getCityKey = async (city) => {
  // making request to get key city to use it for another request down below I think the getWeather function will take care of auther request
  const based = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  const respond = await fetch(based + query);
  const data = await respond.json();
  // here data is kinda of objects inside array cuze I think there a lot of places are have the same name but we are interested in the fisrt one in this array and we want to return the wholly object
  return data[0];
};
const getWeather = async (weatherkey) => {
  // making end point for our api to get weather conditions
  const based = `http://dataservice.accuweather.com/currentconditions/v1/${weatherkey}`; // the weatherkey we will get from getCityKey function
  // key is global var it declared and initialized above
  // this key we get it from this wbsite https://developer.accuweather.com/
  const query = `?apikey=${key}`;
  // here we did our request to get a Promise
  const respond = await fetch(based + query);
  // here we convert our data to json format
  const dataWeather = await respond.json();
  // finaly we pull our weather data
  return dataWeather[0];
};
// testing the
// getCityKey("manchester")
//   .then((e) => {
//     return getWeather(e);
//   })
//   .then((e) => console.log(e))
//   .catch((e) => console.log(e));
