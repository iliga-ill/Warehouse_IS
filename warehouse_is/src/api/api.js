const { response } = require('express');
const XMLHttpRequest = require('xhr2');
const host = 'http://localhost:5000';
  
function apiGetColors() {
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
    xhr.open('GET', host+'/order_goods_by_order', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(this.responseText);
      }
    }
    
    xhr.send("code=1");
}
  
function apiGetOrders() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host+'/orders', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(this.responseText);
      }
    }
    
    xhr.send(null);

    return this.res
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

module.exports = {
    host,
    apiGetOrders
}
