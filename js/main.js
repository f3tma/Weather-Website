//62162d74ff324b0caaa22640240912
//http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7

//https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=62162d74ff324b0caaa22640240912



const findLocation = document.getElementById('findLocation')

findLocation.addEventListener('input',function(e){
console.log(e.target.value)
getDataApi(e.target.value)
})

//get data

async function getDataApi(cityName){
if(cityName.length>2){
  let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=62162d74ff324b0caaa22640240912`)
  // console.log(res)
  let data = await res.json()
  console.log(data)
  displayData(data)

}
  
}

// let date = new Date('2024-12-18')
// console.log(date.getDate()) //يوم كام في الشهر
// console.log(date.getMonth()+1) //شهر كام في السنة
// console.log(date.getFullYear())

// let dayName = date.toLocaleString('ar-ar',{weekday:'narrow'})
// console.log(dayName)

// let monthName = date.toLocaleString('en-us',{month:'long'})
// console.log(monthName)

/////////////////////////////////////////////////display/////////////////////////////////////////////


function displayData(data){
////////////////////////////////today/////////////////////////////////////
let dateToday = new Date(data.current.last_updated)
console.log(dateToday.getDate())
document.getElementById('todayName').innerHTML =  dateToday.toLocaleString('en-us',{weekday:'long'});
document.getElementById('todayDate').innerHTML = dateToday.getDate()+' '+dateToday.toLocaleString('en-us',{month:'long'})
document.getElementById('location').innerHTML = data.location.name;
document.getElementById('todayTemp').innerHTML = data.current.temp_c;
document.getElementById('todayIcon').setAttribute('src',`https:${data.current.condition.icon}`)
document.getElementById('todayCondition').innerHTML = data.current.condition.text;
document.getElementById('humidity').innerHTML = data.current.humidity+'%';
document.getElementById('wind-speed').innerHTML = data.current.wind_kph+'km/h';
document.getElementById('wind-dir').innerHTML =data.current.wind_dir;
//////////////////////////next 2 days/////////////////////////////////////////////////////////
let cartoona =""
 for (let i=1;i<=2;i++){
  let dateNext = new Date (data.forecast.forecastday[i].date)
  console.log(dateNext)
  cartoona = `<div class="forecast-card p-4 rounded-3  ${i==1?'bg-custom-two':'bg-custom'} text-white text-center h-100">
              <div class="day">${dateNext.toLocaleString('en-us',{weekday:'long'})}</div>
              
                <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90">
            
                  <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                  <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>
         
              <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
            
              </div>` 
   document.querySelectorAll('.card-days')[i-1].innerHTML = cartoona
 }

}
console.log(document.querySelectorAll('.card-days'))

/////////////////////////////geolocation///////////////////////////////////////////////////////////////////

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos)
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    getDataApi(`${lat},${lon}`)
  })
}
////////////////////////////////add active class on click///////////////////////////////////////
const links = document.querySelectorAll('.nav-link');
console.log(links)

for(let i = 0;i<links.length;i++){
  links[i].addEventListener('click',function(e){
    e.preventDefault()
    links.forEach(function(link){
      link.classList.remove('active')
    })
    links[i].classList.add('active');
    
  })
}

