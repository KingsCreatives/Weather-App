const form = document.querySelector('.weather-form')
const submitBtn = document.querySelector('.submit-btn')
let message = document.querySelector('.message')


submitBtn.addEventListener('click', e =>{
    // prevent form 
    e.preventDefault()
    getWeatherData()
})

function getWeatherData(){
    // Get user input
    const city = document.querySelector('.user-input').value

    // Fectch weather dat
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7031c1382e369cd984df4a9c5e8c2675`)
     .then(res => res.json())
     .then(data =>{
        console.log(data)
        // Log message if City is not available
        if(data.message == 'city not found'){
            message.textContent = "Please search for a valid city 😩"
        }
        
        const {main, name, sys, weather} = data
        const icon = `https://openweathermap.org/img/wn/${ weather[0]["icon"]}@2x.png`

        // Use city data to create li
        const li = document.createElement('li')
        li.classList.add("city")

        const cityWeatherData = `
            <h2 class="city-name" data-name="${name},${sys.country}"> 
            <span>${name}</span> 
            <sup>${sys.country}</sup> 
            </h2> 
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div> 
            <figure> 
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}> 
            <figcaption>${weather[0]["description"]}</figcaption> 
            </figure>
        `

        li.innerHTML = cityWeatherData
        document.querySelector('.cities').appendChild(li)
     })
     .catch(() =>{
     })


    // clear form after submission
    form.reset()
    message.textContent = ""
    document.querySelector('.user-input').focus()
}

