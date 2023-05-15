/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = 'MYKEY&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zip =  document.getElementById('zip').value;
  const feelings =  document.getElementById('feelings').value;


  getDataFromAPI(baseURL, zip, apiKey)
  .then(function(data){
    // Add data
    console.log(data);
    console.log("TEMP "+data.main.temp)
    postData('/addData', {temp:data.main.temp, date: newDate, feel:feelings} );
  })
  .then(function(){
        retrieveData()
    }
  )
}

const getDataFromAPI = async (baseURL, zip, apiKey)=>{
  
    const res = await fetch(baseURL+zip+",us&appid="+apiKey)
    try {
      // Transform into JSON
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
       body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log("ALL data: "+allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}
