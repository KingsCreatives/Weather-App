const form = document.querySelector('.weather-form')
const submitBtn = document.querySelector('.submit-btn')
let message = document.querySelector('.message')
let cities = document.querySelector('.cities')
let city = document.querySelector('city')
let userInput = document.querySelector('.user-input')



submitBtn.addEventListener('click', e =>{
    // prevent form 
    e.preventDefault()
    let cityName = userInput.value;
    
    
    getWeatherData(cityName)
})

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

