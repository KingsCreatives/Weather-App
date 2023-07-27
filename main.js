const form = document.querySelector('.weather-form')
const submitBtn = document.querySelector('.submit-btn')

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
            document.querySelector('.message').textContent = "Please search for a valid city 😩"
        }
     })
     .catch(() =>{
     })


    // clear form after submission
    form.reset()
}

