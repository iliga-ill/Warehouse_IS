import { Vector3 } from 'three';
import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()

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
                            color: 0x885aaa,
                            translation: new Vector3(parseInt(transition[0]), parseInt(transition[1]), parseInt(transition[2]))
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
}
  
  