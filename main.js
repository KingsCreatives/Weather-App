const form = document.querySelector('.weather-form')
const submitBtn = document.querySelector('.submit-btn')
let message = document.querySelector('.message')
let cities = document.querySelector('.cities')
let userInput = document.querySelector('.user-input')



submitBtn.addEventListener('click', e =>{
    // prevent form 
    e.preventDefault()
    let  cityName = userInput.value;
    const cityList = cities.querySelectorAll('.city')
    const cityArray = Array.from(cityList)

    if (cityArray.length > 0) {
        const filteredArray = cityArray.filter(el => {
          let content = "";
          //athens,gr
          if (cityName.includes(",")) {
            //athens,grrrrrr->invalid country code, so we keep only the first part of cityName
            if (cityName.split(",")[1].length > 2) {
              cityName = cityName.split(",")[0];
              content = el
                .querySelector(".city-name span")
                .textContent.toLowerCase();
            } else {
              content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
          } else {
            //athens
            content = el.querySelector(".city-name span").textContent.toLowerCase();
          }
          return content == cityName.toLowerCase();
        });
    
        if (filteredArray.length > 0) {
          message.textContent = `You already know the weather for ${
            filteredArray[0].querySelector(".city-name span").textContent
          } ...otherwise be more specific by providing the country code as well 😉`;
          form.reset();
          userInput.focus();
          return;
        }
      }



    getWeatherData(cityName)
})

function filterCities(){
    let cityList = cities.querySelectorAll(city)
    let citiesArray = Array.from(cityList)

    if(citiesArray.length > 0 ){
        console.log(citiesArray)
    }
}

function getWeatherData(cityName){
    // Fectch weather dat
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=7031c1382e369cd984df4a9c5e8c2675`)
     .then(res => res.json())
     .then(data =>{
        console.log(data)
        // Log message if City is not available
        if(data.message == 'city not found'){
            message.textContent = "Please search for a valid city 😩"
        }
        
        const {main, name, sys, weather} = data
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
        // Use city data to create li
        const li = document.createElement('li')
        li.classList.add("city")

        const cityWeatherData = `
            <h2 class="city-name" data-name="${name},${sys.country}"> 
            <span class "name-of-city">${name}</span> 
            <sup>${sys.country}</sup> 
            </h2> 
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div> 
            <figure> 
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}> 
            <figcaption>${weather[0]["description"]}</figcaption> 
            </figure>
        `

        
        li.innerHTML = cityWeatherData
        cities.appendChild(li)

     })
     .catch(() =>{
     })


    // clear form after submission
    form.reset()
    message.textContent = ""
    document.querySelector('.user-input').focus()
}

