// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Callback to debug

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req,res) {
    console.log("returning all data")
    res.send(projectData)
}
  
// Post Route
  
app.post('/addData', addData);

function addData(req,res){
  console.log("sending post")
  /*newEntry = {
    temperature: req.body.temp,
    date: req.body.date,
    user_response: req.body.feel
  }*/
  projectData["temp"]=req.body.temp
  projectData["date"]=req.body.date
  projectData["feel"]=req.body.feel

  console.log(projectData)
}

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
     console.log("server running"); 
     console.log(`running on localhost: ${port}`);
}


