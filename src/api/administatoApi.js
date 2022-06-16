
import { Vector3 } from 'three';
import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export class Api {

    getClients () {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"clients/", true);
            var accounts = []
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("GetClients answer: ")
                    console.log(answer)
                    
                    answer.map( function(item, i) {
                        accounts.push({
                          id: i, 
                          code: item.code, 
                          number:i+1, 
                          name: item.name, 
                          surname: item.surname, 
                          patronymic: item.patronymic, 
                          login: item.login, 
                          password: item.password, 
                          phone_num: item.phone_num, 
                          duty: item.duty
                        }) 
                    })
                    resolve(accounts)
                }
            } 
            xhr.send(null);
            
        }) 
    }
  
    postClients (value) {
      var xhr = new XMLHttpRequest();
 
      return new Promise(function(resolve, reject){
          xhr.open("POST", host+"post_user/", true);
         //Send the proper header information along with the request
          xhr.setRequestHeader("Content-Type", "application/json");
      
          xhr.onreadystatechange = function() { // Call a function when the state changes.
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                  // Request finished. Do processing here.
                  alert("Данные успешно отправлены")
                  console.log("Данные успешно отправлены")
                  resolve("Данные успешно отправлены")
              }
          }
          //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
          xhr.send(JSON.stringify(value));
      }) 
    }

    getRacksType () {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"racks_virtual_shelves/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    var answer = JSON.parse(this.response)
                    var buf = {}

                    answer.map((item, i) => {
                        var transition = item.translation.split('/') 
                        console.log(item.translation)
                        var color = parseInt(item.color)
                        buf[`rack_${item.code}`] = {
                            depth: item.depth,
                            shelfWidth: item.shelf_width,
                            shelfHeight: item.shelf_height,
                            columsAmount: item.columns_amount,
                            rowsAmount: item.rows_amount,
                            borderWidth: item.rows_amount,
                            freeSpaceX: item.free_space_x,
                            freeSpaceY: item.free_space_y,
                            color: item.color,
                            translation: new Vector3(parseInt(transition[0]), parseInt(transition[1]), parseInt(transition[2])),
                            shelfs: item.shelves
                        }
                    })

                    console.log("Данные успешно получены")
                    console.log(answer)
                    console.log(buf)
                    resolve(buf)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(null)
        }) 
    }

    postRacksType (value) {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_post/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    console.log("Данные успешно отправлены")
                    resolve("Данные успешно отправлены")
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }

    updateRacksType (value) {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_update/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    console.log("Данные успешно отправлены")
                    resolve("Данные успешно отправлены")
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }
    
    deleteRacksType (id) {
        var xhr = new XMLHttpRequest();
        var value = {id: id}
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_delete/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    console.log("Данные успешно отправлены")
                    resolve("Данные успешно отправлены")
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }

    getWarehouseModel () {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"warehouse_model/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    console.log("administratorApi getWarehouseModel answer")
                    console.log(this.response)
                    var answer = JSON.parse(this.response)
                    console.log("administratorApi getWarehouseModel answer")
                    console.log(answer)
                    var buf = {width: 1500, length: 1500, zones: []}
                    answer.map(elm => {
                        var racks = []
                        elm.racks.map(elm2 => {
                            let shelves = []
                            elm2.shelfs.map(elm3 => {
                                shelves.push({
                                    name: elm3.name,
                                    number: elm3.code,
                                    id: elm3.code,
                                    space: elm3.space
                                })
                            })

                            let center_point =  elm2.center_point.toString().split('/')
                            let rotation = elm2.rotation.toString().split('/')
                            racks.push({
                                name: elm2.name,
                                id: elm2.code,
                                centerPoint: new Vector3(Number(center_point[0]), Number(center_point[1]), Number(center_point[2])),
                                rotation: {x: Number(rotation[0]), y: Number(rotation[1]), z: Number(rotation[2])},
                                racksTypeId: elm2.rack_type_id,
                                type: elm2.type,
                                shelfs: shelves
                            })
                        })
                        let center_point =  elm.center_point.toString().split('/')
                        let rotation = elm.rotation.toString().split('/')
                        buf.zones.push({
                            name: elm.name,
                            id: elm.code,
                            centerPoint: new Vector3(Number(center_point[0]), Number(center_point[1]), Number(center_point[2])),
                            rotation: {x: Number(rotation[0]), y: Number(rotation[1]), z: Number(rotation[2])},
                            zoneTypeId: elm.zone_type_id,
                            type: elm.type,
                            racks: racks
                        })
                       
                    })

                    console.log("administratorApi getWarehouseModel buf")
                    console.log(buf)
                    resolve(buf)
                }
            }
            xhr.send(null)
        }) 
    }

    getZones () {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"zones_virtual/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    var answer = JSON.parse(this.response)
                    var buf = {}

                    answer.map((item, i) => {
                        var messageAlighment = item.message_alighment.split('/') 
                        buf[`zone_${item.code}`] = {
                            code: item.code,
                            width: item.width,
                            length: item.height,
                            color: item.color,
                            lineWidth: item.line_width,
                            chamferLendth: item.chamfer_length,
                            message: item.name,
                            textSize: item.text_size,
                            gapLengthX: item.name.length * 15,
                            gapLengthY: item.name.length * 15,
                            messageAlighment: [messageAlighment],
                        }
                    })

                    console.log("Данные успешно получены")
                    console.log(answer)
                    console.log(buf)
                    resolve(buf)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(null)
        }) 
    }

    postZones(value) {
        console.log("PostZones")
        console.log(value)
        let center_point = `${value.centerPoint.x}/${value.centerPoint.y}/${value.centerPoint.z}`
        let rotation = `${value.rotation.x}/${value.rotation.y}/${value.rotation.z}`
        let body = {
            id: value.id,
            name: value.name,
            center_point: center_point,
            rotation: rotation,
            zone_type_id: value.zoneTypeId,
            type: value.type
        }

        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_post/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }

    updateZones(value) {
        console.log("updateZones")
        console.log(value)
        let center_point = `${value.centerPoint.x}/${value.centerPoint.y}/${value.centerPoint.z}`
        let rotation = `${value.rotation.x}/${value.rotation.y}/${value.rotation.z}`
        let body = {
            id: value.id,
            name: value.name,
            center_point: center_point,
            rotation: rotation,
            zone_type_id: value.zoneTypeId,
        }

        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_update/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }
    
    deleteZones (value) {
        console.log("deleteZones")
        console.log(value)
        let body = {
            id: value.id,
        }

        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_delete/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }

    postRacks(value, value2) {
        console.log("postRacks")
        console.log(value)
        console.log(value2.userData)
        let center_point = `${value.centerPoint.x}/${value.centerPoint.y}/${value.centerPoint.z}`
        let rotation = `${value.rotation.x}/${value.rotation.y}/${value.rotation.z}`
        let body = {
            id: value.id,
            name: value.name,
            zone_num: value2.userData.id,
            center_point: center_point,
            rotation: rotation,
            rack_type_id: value.racksTypeId,
            type: value.type
        }

        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_post/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }

    updateRacks(value) {
        console.log("updateRacks")
        console.log(value)
        let center_point = `${value.centerPoint.x}/${value.centerPoint.y}/${value.centerPoint.z}`
        let rotation = `${value.rotation.x}/${value.rotation.y}/${value.rotation.z}`
        let body = {
            id: value.id,
            name: value.name,
            center_point: center_point,
            rotation: rotation,
            rack_type_id: value.racksTypeId,
        }

        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_update/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }

    deleteRacks(value) {
        console.log("deleteRacks")
        console.log(value)
        let body = {
            id: value.id,
        }

        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_delete/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(body));
        }) 
    }

    getGoodsType() {
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"goods_type_virtual/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    var answer = JSON.parse(this.response)
                    var buf = {}

                    answer.map((item, i) => {
                        var translation = item.translation.split('/') 
                        buf[`good_${item.id}`] = {
                            code: item.id,
                            width: item.width,
                            height: item.height,
                            depth: item.depth,
                            color: item.color,
                            translation: new Vector3(parseInt(translation[0]), parseInt(translation[1]), parseInt(translation[2])),
                        }
                    })

                    console.log("getGoodsTypeVirtual res")
                    console.log(answer)
                    console.log(buf)
                    resolve(buf)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(null)
        }) 
    }

    postVirtualGoodsType(value) {
        console.log("updateVirtualGoodsType")
        console.log(value)

        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"goods_type_insert/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log("Данные успешно отправлены")
                    resolve("Данные успешно отправлены")
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }

    updateVirtualGoodsType(value) {
        console.log("updateVirtualGoodsType")
        console.log(value)
       
        var xhr = new XMLHttpRequest();
 
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"goods_type_update/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log("Данные успешно отправлены")
                    resolve("Данные успешно отправлены")
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }
    
    deleteVirtualGoodsType (id) {
        var xhr = new XMLHttpRequest();
        var value = {id: id}
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"goods_type_delete/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    let answer = this.responseText
                    resolve(answer)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(JSON.stringify(value));
        }) 
    }

    getVirtualGoodsType() {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"goods_type_with_virtual_info/", true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    var answer = JSON.parse(this.response)
                    let buf = []
                    answer.map(elm => {
                        let translation = elm.translation
                        translation = translation.toString().split('/')
                        // let color = elm.color.toString().replace("rgba(", "").replace(")", "").split(',')
                        let color = elm.color.replace(/^rgba?(|\s+|)$/g, '').split(',');
                        // const hex = `#${((1 << 24) + (parseInt(color[0]) << 16) + (parseInt(color[1]) << 8) + parseInt(color[2])).toString(16).slice(1)}`;
                        const hex = rgbToHex(elm.color)

                        let body = {
                            id: elm.virtual_id,
                            text: elm.text,
                            goodName: elm.text,
                            depth: elm.depth,
                            width: elm.width,
                            height: elm.height,
                            color: {hex: hex, rgba: elm.color},
                            translationX: Number(translation[0]),
                            translationY: Number(translation[1]),
                            translationZ: Number(translation[2]),
                        }
                        buf.push(body)
                    })
                    console.log('getVirtualGoodsType answer')
                    console.log(buf)
                    resolve(buf)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(null);
        }) 
    }

    getVirtualRacks() {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"racks_virtual_shelves/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    let buf = []
                    console.log(answer)
                    answer.map(elm => {
                        let color = elm.color.replace(/^rgba?(|\s+|)$/g, '').split(',');
                        // const hex = `#${((1 << 24) + (parseInt(color[0]) << 16) + (parseInt(color[1]) << 8) + parseInt(color[2])).toString(16).slice(1)}`;
                        const hex = rgbToHex(elm.color)
                        let translation = elm.translation.split('/')
                        let body = {
                            id: elm.code,
                            text: `Стеллаж ${elm.code}`,
                            depth: elm.depth,
                            width: elm.shelf_width,
                            height: elm.shelf_height,
                            color: {rgba: elm.color, hex: hex},
                            translationX: Number(translation[0]),
                            translationY: Number(translation[1]),
                            translationZ: Number(translation[2]),
                            liftingCapacity: elm.shelves.shelf_1.lifting_capacity,
                            freeSpaceX: elm.free_space_x,
                            freeSpaceY: elm.free_space_y,
                            borderWidth: elm.border_width,
                            columsAmount: elm.columns_amount,
                            rowsAmount: elm.rows_amount
                        }
                        buf.push(body)
                    })
                    console.log('getVirtualRacks answer')
                    console.log(buf)
                    resolve(buf)
                }
            }
            xhr.send(null);
        }) 
    }

    updateVirtualRacks(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_update/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    
                    console.log('updateVirtualRacks answer')
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }

    insertVirtualRacks(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_post/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    
                    console.log('insertVirtualRacks answer')
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }

    deleteVirtualRacks(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"racks_virtual_delete/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    console.log('insertVirtualRacks answer')
                    console.log(answer)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }

    getVirtualZones() {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"zones_virtual/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    let buf = []
                    answer.map(elm => {
                        // let color = elm.color.replace(/^rgba?(|\s+|)$/g, '').split(',');
                        // const hex = `#${((1 << 24) + (parseInt(color[0]) << 16) + (parseInt(color[1]) << 8) + parseInt(color[2])).toString(16).slice(1)}`;
                        const hex = rgbToHex(elm.color)
                        let alighments = []
                        alighments.push(elm.message_alighment.split('/'))
                        let isAighmentTop = false
                        let isAighmentBottom = false
                        let isAighmentRight = false
                        let isAighmentLeft = false
                        alighments.map(alighment => {
                            if (alighment == "right") isAighmentRight = true
                            if (alighment == "left") isAighmentLeft = true
                            if (alighment == "top") isAighmentTop = true
                            if (alighment == "bottom") isAighmentBottom = true
                        })
                        let body = {
                            id: elm.code,
                            length: elm.height,
                            width: elm.width,
                            color: {rgba: elm.color, hex: hex},
                            lineWidth: elm.line_width,
                            chamferLendth: elm.chamfer_length,
                            message: elm.name,
                            text: elm.name,
                            textSize: elm.text_size,
                            gapLengthX: elm.name.length*15,
                            gapLengthY: elm.name.length*15,
                            messageAlighment: alighments,
                            isAighmentTop: isAighmentTop,
                            isAighmentBottom: isAighmentBottom,
                            isAighmentRight: isAighmentRight,
                            isAighmentLeft: isAighmentLeft
                        }
                        buf.push(body)
                    })
                    console.log('getVirtualRacks answer')
                    console.log(buf)
                    resolve(buf)
                }
            }
            xhr.send(null);
        }) 
    }

    postVirtualZones(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_virtual_post/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }

    updateVirtualZones(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_virtual_update/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var answer = JSON.parse(this.response)
                    resolve(answer)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }

    deleteVirtualZones(value) {
        var xhr = new XMLHttpRequest();
      
        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"zones_virtual_delete/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    resolve(this.response)
                }
            }
            xhr.send(JSON.stringify(value));
        }) 
    }
}
  
  