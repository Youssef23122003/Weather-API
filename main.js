let forecast= []
async function getForecast(city){
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e43a8295e45e4e3cbb4131300240410&q=${city}&days=3`)
    let response = await req.json()
    console.log(response.current,response.forecast,response.location);
    forecast = response.forecast.forecastday
    console.log(forecast);     
    displayForecast(response.location.name ,response.current.temp_c,response.current.condition.icon, response.current.condition.text,forecast)
}

getForecast('cairo')

function displayForecast(location,temp,img,text,array){
    let currentDate = new Date()
    let cartona = `<div class="col-lg-4 ">
     <div class="inner1 rounded-start-2">
      <div class="inner-head d-flex justify-content-between px-2 py-2">
        <span class="">${currentDate.toLocaleDateString("en-US",{weekday:"long"})}</span>
        <span class="">${currentDate.getDate()} <span class="">${currentDate.toLocaleDateString("en-US",{month:"long"})}</span> </span>
      </div>
      <div class="inner-content py-4 px-3">
        <span class="location">${location}</span>
        <p class="num d-block m-0 p-0">${temp}<sup>o</sup>C</p>
        <img src="${img}" alt="" srcset="">
        <span class="sun">${text}</span>
        <div class="wheather-icons mt-3 d-flex gap-3 pb-1">
          <span class="d-flex gap-1"><img src="icon-umberella.png" alt="" srcset="">20%</span>
          <span class="d-flex gap-1"><img src="icon-wind.png" alt="" srcset="">18km/h</span>
          <span class="d-flex gap-1"><img src="icon-compass.png" alt="" srcset="">East</span>
        </div>
      </div>
   </div>
 </div>`
    for(let i = 1 ; i<array.length;i++){
    cartona +=` 
  <div class="col-lg-4">
    <div class="${i==1?'inner2':'inner1'} ${i==2?'inner3':''}">
      <div class="inner-head text-center px-2 py-2">
        <span class="text-center">${new Date(array[i].date).toLocaleDateString("en-US",{weekday:"long"})}</span>
      </div>
      <div class="inner-content2 py-3 px-3 d-flex flex-column justify-content-center align-items-center">
        <img class="pb-3" src="${array[i].day.condition.icon}" alt="" srcset="">
        <p class="degree m-0 d-block">${array[i].day.maxtemp_c}<sup>o</sup>C</p>
        <small>${array[i].day.mintemp_c}<sup>o</sup></small>
        <span class="sun mt-4">${array[i].day.condition.text}</span>
      </div>
    </div>
  </div>`
    }
    
  document.querySelector('.myRow').innerHTML=cartona
}

document.getElementById('search').addEventListener('input',function(e) {
  let city = e.target.value;
  if (city.length > 2) { 
    getForecast(city);
  }
});













