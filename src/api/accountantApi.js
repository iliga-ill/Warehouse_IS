import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()
var id=0

export class Api {
    static getId() {return id++}

    getGoods() {
        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+"clients/", true);
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
                          duty: item.duty
                        }) 
                    })
                    resolve(accounts)
                }
            } 
            xhr.send(null);
            
        }) 
    }

    getGoodsType() {
        var xhr = new XMLHttpRequest();
        
        return new Promise(function(resolve, reject){
            console.log("StorekeeperAdvent apiGetGoodsType was launched")
            xhr.open('GET', host+'goods_type_cats/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (this.response != "") {
                        var answer = JSON.parse(this.response)
                        console.log("ManagerProducts apiGetGoodsTypeCats answer: ")
                        console.log(answer)
                        var buffer = []
                        answer.map(function( element, i) {
                            buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: parseFloat(element.price)})
                            buffer[i].id = Api.getId()
                            buffer[i].code = element.code;
                            buffer[i].description = element.description
                        });
                        resolve(buffer)
                    }
                }
            }
            xhr.send(null);
        })
    }
}
  
  