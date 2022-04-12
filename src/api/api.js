export class Api {

  getClients (connectionType, route) {
      var connection = connectionType
      var route = route
      var xhr = new XMLHttpRequest();
      const host = 'http://localhost:5000';
      return new Promise(function(resolve, reject){
          xhr.open(connection, host+route, true);
          var accounts = []
          xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                  var answer = JSON.parse(this.response)
                  console.log("GetClients answer: ")
                  console.log(answer)
                  
                  answer.map( function(item, i) {
                      accounts.push({
                        id: 'string_' + i, 
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

  postClients (connectionType, route, value) {
    var connection = connectionType
    var route = route
    var xhr = new XMLHttpRequest();
    const host = 'http://localhost:5000';
    return new Promise(function(resolve, reject){
        xhr.open(connection, host+route, true);
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
  
}

