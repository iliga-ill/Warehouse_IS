const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const index = require('./src/index')
const db = require('./queries')
const port = 5000
var XMLHttpRequest = require('xhr2');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/colors', db.getColors)
app.get('/zones', db.getZones)
app.post('/shelf_set', db.setShelfs)

function apiGetZones() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/zones', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

apiGetZones()

function apiSetShelf() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/shelf_set', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          println("It's working")
      }
  }
  xhr.send("name=полка 1&shelf_num=1&rack_num=1&capacity=100&shelf_space=");
}

//apiSetShelf()
 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})