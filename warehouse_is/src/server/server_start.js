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
app.get('/shipment_order_goods', db.getShipmentOrderGoods)
app.get('/shipment_order_goods_id', db.getShipmentOrderGoodsByOrderId)
app.get('/shipment_order_goods_all', db.getShipmentOrderGoodsAll)
app.get('/shipment_order_goods_by_order', db.getOrderGoodsByShipmentOrder)
app.get('/orders', db.getOrders)
app.get('/orders_all', db.getOrdersAll)
app.get('/orders_goods', db.getOrdersGoods)
app.get('/clients', db.getClients)
app.get('/goods_type_code', db.getGoodsTypeByCode)
app.get('/goods_type_cats', db.getGoodsTypeWithCat)
app.get('/goods_type', db.getGoodsType)
app.get('/goods_cat', db.getCategories)
app.get('/goods_subcat2', db.getSubCategories2)
app.get('/goods_subcat3', db.getSubCategories3)
app.get('/goods_subcat4', db.getSubCategories4)
app.get('/shelf_space', db.getShelfSpace)
app.post('/shelf_set', db.setShelfs)
app.post('/post_user', db.postNewUser)
app.post('/post_goods_to_shelfs', db.postGoodsToShelfSpace)
app.post('/post_order', db.postNewOrder)
app.put('/update_inventory', db.updateInventory)
app.put('/update_order', db.updateOrder)
app.put('/update_order_goods', db.updateOrderGoods)
app.put('/update_order_goods_expend', db.updateOrderGoodsExpend)
app.post('/update_shipment_orders', db.updateShipmentOrders)

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('../api/api.js', (request, response) => {
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
  xhr.open('GET', host+'/racks_by_zone'+"?"+"code=1", true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
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
  xhr.open('GET', host+'/shelfs_by_racks'+"?"+"code=1", true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetOrderGoods() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/order_goods'+ "?" + `order_id=4`, true);
  
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

//apiGetGoodsByOrder()

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

function apiGetShipmentOrderGoodsByOrderId() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/shipment_order_goods_id', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetClients() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/clients', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsTypeByCode() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_type_code'+'?'+"code=1", true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsTypeCats() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_type_cats', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsType() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_type', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsCat() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_cat', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat2() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat2', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat3() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat3', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat4() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat4', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetShelfSpace() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/shelf_space', true);
  
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

function apiPostNewUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", host+'/post_user', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          console.log("New shelf set")
      }
  }
  xhr.send("name=Имя&surname=Фамилия&patronymic=Отчество&login=Логин&password=Пароль&phone_num=Телефон&duty=Должность");
}

function apiPostGoodsToShelfs(value) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", host+'/post_goods_to_shelfs', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          console.log("New shelf set")
      }
  }
  xhr.send(JSON.stringify(value));
}

function apiPostNewOrderAndGoods(value) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", host+'/post_order', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          console.log("new order posted")
      }
  }
  xhr.send(JSON.stringify(value));
}

function apiUpdateInventory() {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', host+'/update_inventory'+'?'+'status_text=1', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiUpdateOrder() {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', host+'/update_order'+'?'+"status_text=1", true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiUpdateOrderGoods() {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', host+'/update_order_goods'+'?'+'"amount=1&code=2"', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiUpdateShipmentOrder(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', host+'/update_shipment_orders', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(JSON.stringify(value));
}

//apiGetZones()
//apiGetRacksByZones()
//apiSetShelf()
 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

