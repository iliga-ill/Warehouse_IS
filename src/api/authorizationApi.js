import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()

export class Api {

    getClients () {
        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"clients/", true);
            // xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
            // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            // xhr.setRequestHeader("Access-Control-Max-Age", "1800");
            // xhr.setRequestHeader("Access-Control-Allow-Headers", "content-type");
            // xhr.setRequestHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
            var accounts = []
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("GetClients answer: ")
                    console.log(this.response)
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
                          duty: item.duty,
                          avatar: item.avatar
                        }) 
                    })
                    resolve(accounts)
                }
            } 
            xhr.send(null);
            
        }) 
    }
}
  
  