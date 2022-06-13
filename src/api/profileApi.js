import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()

export class Api {

    updateProfile (value) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+"update_user/", true);
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

    getProfileAvatar (operator_id) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("GET", host+`client_avatar/?id=${operator_id}`, true);
           //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
        
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    var answer = JSON.parse(this.response)
                    console.log("  getProfileAvatar")
                    console.log(answer[0].a)
                    resolve(answer[0].a)
                }
            }
            //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
            xhr.send(null);
        }) 
    }
}
  
  