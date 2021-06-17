//Creating variables for maniplulating or accesing data from elements in HTML
let cityValue = document.getElementById('userInput').value;
let currentWeather = document.getElementById('currentWeatherSubtitle');
let submitButton = document.getElementById('submit');
let currentWatherURL;
let cityName = document.getElementById('cityName');
let country = document.getElementById('country');
let temperature = document.getElementById('temp');
let humidity = document.getElementById('humidity');


submitButton.onclick = async () => {

    //Change display from none to block one user clicks submit.
    document.getElementById('desktopContainer').style.display = 'block';

    //Get input value
    let cityValue = document.getElementById('userInput').value;

    //Fetch data for current weather from API
    currentWatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=a23ae3b876b39f083c12d90f6c69bbf2`;
    let currentWeatherResponse = await fetch(currentWatherURL);
    let data = await currentWeatherResponse.json();


    //Get longitude and latitude for URL parameter in next API fetch. 
    let longitude = data.coord.lon;
    let latitude = data.coord.lat;

    //Get data from API for next 7 days of weather
    let sevenDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&units=metric&lon=${longitude}&appid=a23ae3b876b39f083c12d90f6c69bbf2`
    let sevenDayWeather = await fetch(sevenDayURL);
    let sevenDayWeatherData = await sevenDayWeather.json();

    //Get name of icon from API call
    let imgURL = data.weather[0].icon;

    //Create img element using images from API
    let weatherImage = document.createElement('img');
    weatherImage.src = `http://openweathermap.org/img/wn/${imgURL}@2x.png`;

    //Current weather from API call being updated in HTML
    currentWeather.innerHTML = data.weather[0].description;

    //Updating name of city which the weather is shown for
    cityName.innerHTML = data.name;

    //Updating name of country which the weather is shown for
    country.innerHTML = data.sys.country;

    //Updating temperature of city which the weather is shown for
    temperature.innerHTML = 'Temperature: ' + data.main.temp + '°C';

    //Updating humidity of city which the weather is shown for
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'

    //Appending img from API to the current weather subtitle
    document.getElementById('currentWeatherSubtitle').appendChild(weatherImage);

    //call sevenDays() only if there is no image yet. This prevents multiple images from being appended.
    if (document.getElementById("day1List").childElementCount === 3) {
        sevenDays(sevenDayWeatherData);
    }
    //if an image is already appended from previous api call, clear all images first then call sevenDays();
    else if (document.getElementById("day1List").childElementCount === 4) {
        clearSevenDaysImg()
        sevenDays(sevenDayWeatherData);
    }

}



//Removes all images from 7 days of weather
function clearSevenDaysImg() {

    document.getElementById('image1').remove();
    document.getElementById('image2').remove();
    document.getElementById('image3').remove();
    document.getElementById('image4').remove();
    document.getElementById('image5').remove();
    document.getElementById('image6').remove();
    document.getElementById('image7').remove();
}


function sevenDays(jsonData) {

    //Creating variables for each day of the seven days.
    let day1 = document.getElementById('day1');
    let day2 = document.getElementById('day2');
    let day3 = document.getElementById('day3');
    let day4 = document.getElementById('day4');
    let day5 = document.getElementById('day5');
    let day6 = document.getElementById('day6');
    let day7 = document.getElementById('day7');

    let day1Weather = document.getElementById('day1Weather');
    let day2Weather = document.getElementById('day2Weather');
    let day3Weather = document.getElementById('day3Weather');
    let day4Weather = document.getElementById('day4Weather');
    let day5Weather = document.getElementById('day5Weather');
    let day6Weather = document.getElementById('day6Weather');
    let day7Weather = document.getElementById('day7Weather');

    let day1Temp = document.getElementById('sevenDayTemp1');
    let day2Temp = document.getElementById('sevenDayTemp2');
    let day3Temp = document.getElementById('sevenDayTemp3');
    let day4Temp = document.getElementById('sevenDayTemp4');
    let day5Temp = document.getElementById('sevenDayTemp5');
    let day6Temp = document.getElementById('sevenDayTemp6');
    let day7Temp = document.getElementById('sevenDayTemp7');

    //Updating temperature 
    day1Temp.innerHTML = 'Temperature: ' + jsonData.daily[0].temp.day + '°C';
    day2Temp.innerHTML = 'Temperature: ' + jsonData.daily[1].temp.day + '°C';
    day3Temp.innerHTML = 'Temperature: ' + jsonData.daily[2].temp.day + '°C';
    day4Temp.innerHTML = 'Temperature: ' + jsonData.daily[3].temp.day + '°C';
    day5Temp.innerHTML = 'Temperature: ' + jsonData.daily[4].temp.day + '°C';
    day6Temp.innerHTML = 'Temperature: ' + jsonData.daily[5].temp.day + '°C';
    day7Temp.innerHTML = 'Temperature: ' + jsonData.daily[6].temp.day + '°C';

    //Updating weather description
    day1Weather.innerHTML = jsonData.daily[0].weather[0].description;
    day2Weather.innerHTML = jsonData.daily[1].weather[0].description;
    day3Weather.innerHTML = jsonData.daily[2].weather[0].description;
    day4Weather.innerHTML = jsonData.daily[3].weather[0].description;
    day5Weather.innerHTML = jsonData.daily[4].weather[0].description;
    day6Weather.innerHTML = jsonData.daily[5].weather[0].description;
    day7Weather.innerHTML = jsonData.daily[6].weather[0].description;


    //Calculates the next 7 days of the week from the current day.
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    //gets current day and adds number of days, which reference array.
    day1.innerHTML = days[d.getDay()];
    day2.innerHTML = days[d.getDay() + 1];
    day3.innerHTML = days[d.getDay() + 2];
    day4.innerHTML = days[d.getDay() + 3];
    day5.innerHTML = days[d.getDay() + 4];
    day6.innerHTML = days[d.getDay() + 5];
    day7.innerHTML = days[d.getDay() + 6];


    //Appending images for each day of the week
    let dayImgURL = jsonData.daily[0].weather[0].icon;
    let dayImage = document.createElement('img');
    dayImage.id = 'image1';
    dayImage.src = `http://openweathermap.org/img/wn/${dayImgURL}@2x.png`;
    document.getElementById('day1List').appendChild(dayImage);

    //Appending images for each day of the week
    let dayImgURL2 = jsonData.daily[1].weather[0].icon;
    let dayImage2 = document.createElement('img');
    dayImage2.id = 'image2';
    dayImage2.src = `http://openweathermap.org/img/wn/${dayImgURL2}@2x.png`;
    document.getElementById('day2List').appendChild(dayImage2);

    //Appending images for each day of the week
    let dayImgURL3 = jsonData.daily[2].weather[0].icon;
    let dayImage3 = document.createElement('img');
    dayImage3.id = 'image3';
    dayImage3.src = `http://openweathermap.org/img/wn/${dayImgURL3}@2x.png`;
    document.getElementById('day3List').appendChild(dayImage3);

    //Appending images for each day of the week
    let dayImgURL4 = jsonData.daily[3].weather[0].icon;
    let dayImage4 = document.createElement('img');
    dayImage4.id = 'image4';
    dayImage4.src = `http://openweathermap.org/img/wn/${dayImgURL4}@2x.png`;
    document.getElementById('day4List').appendChild(dayImage4);

    //Appending images for each day of the week
    let dayImgURL5 = jsonData.daily[4].weather[0].icon;
    let dayImage5 = document.createElement('img');
    dayImage5.id = 'image5';
    dayImage5.src = `http://openweathermap.org/img/wn/${dayImgURL5}@2x.png`;
    document.getElementById('day5List').appendChild(dayImage5);

    //Appending images for each day of the week
    let dayImgURL6 = jsonData.daily[5].weather[0].icon;
    let dayImage6 = document.createElement('img');
    dayImage6.id = 'image6';
    dayImage6.src = `http://openweathermap.org/img/wn/${dayImgURL6}@2x.png`;
    document.getElementById('day6List').appendChild(dayImage6);

    //Appending images for each day of the week
    let dayImgURL7 = jsonData.daily[6].weather[0].icon;
    let dayImage7 = document.createElement('img');
    dayImage7.id = 'image7';
    dayImage7.src = `http://openweathermap.org/img/wn/${dayImgURL7}@2x.png`;
    document.getElementById('day7List').appendChild(dayImage7);

}


