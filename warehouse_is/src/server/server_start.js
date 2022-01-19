const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 5000
const host = 'http://localhost:5000'
const XMLHttpRequest = require('xhr2');
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/colors', db.getColors)
app.get('/zones', db.getZones)
app.get('/racks', db.getRacks)
app.get('/racks_by_zone', db.getRacksByZone)
app.get('/shelfs', db.getShelfs)
app.get('/shelfs_by_racks', db.getShelfsByRacks)
app.get('/order_goods', db.getOrderGoods)
app.get('/order_goods_by_order', db.getOrderGoodsByOrder)
app.get('/orders', db.getOrders)
app.post('/shelfs', db.setShelfs)
app.put('/update_inventory', db.updateInventory)
app.put('/update_order', db.updateOrder)

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  }
)

const apiGetColors = function apiGetColors() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/colors', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetZones() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/zones', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetRacks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/racks', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetRacksByZones() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/racks_by_zone', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send("code=1");
}

function apiGetShelfs() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/shelfs', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetShelfsByRacks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/shelfs_by_racks', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send("code=1");
}

function apiGetGoods() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/order_goods', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsByOrder() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/order_goods_by_order'+"?"+"code=1", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

apiGetGoodsByOrder()

function apiGetOrders() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/orders', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiSetShelf() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", host+'/shelf_set', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          console.log("New shelf set")
      }
  }
  xhr.send("name=полка 1&shelf_num=1&rack_num=1&capacity=100&shelf_space=");
}

function apiUpdateInventory() {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', host+'/update_inventory', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send("status_text=1");
}

function apiUpdateOrder() {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', host+'/update_order', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send("status_text=1");
}

//apiGetZones()
//apiGetRacksByZones()
//apiSetShelf()
 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

