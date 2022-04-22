export class Api {

    getGoodsTypeCats() {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/goods_type_cats', true);
            console.log("ManagerOrderCreation apiGetGoodsTypeCats was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    //console.log(this.response);
                    var answer = JSON.parse(this.response)
                    console.log("ManagerOrderCreation apiGetGoodsTypeCats answer: ")
                    console.log(answer)
                    var buffer = []
                    answer.map(function( element, i) {
                        buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: parseFloat(element.price), goodsLimit: element.amount_limit})
                        buffer[i].id = getId()
                        buffer[i].code = element.code;
                        buffer[i].description = element.description
                    });
                    resolve(buffer)
                }
            }
            xhr.send(null);
        })       
    }

    getShipmentOrders(tableHeadersBuf) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/shipment_order_goods'+'?'+'type=sell&status=opened', true);
            console.log("ManagerOrderCreation apiGetShipmentOrders was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("ManagerOrderCreation apiGetShipmentOrders answer: ")
                    console.log(answer)

                    console.log("tableHeadersBuf")
                    console.log(tableHeadersBuf)
                    resolve(tableHeadersBuf)
                }
            }
            xhr.send(null);
        })       
    }

    getGoodsTypeCats() {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/goods_type_cats', true);
            console.log("ManagerProducts apiGetGoodsTypeCats was launched")
            xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                //console.log(this.response);
                var answer = JSON.parse(this.response)
                console.log("ManagerProducts apiGetGoodsTypeCats answer: ")
                console.log(answer)
                var buffer = []
                answer.map(function( element, i) {
                    buffer.push({
                        id:i,
                        number:i+1, 
                        goodsCategories2: element.category, 
                        goodsCategories3: element.subcategory_2, 
                        goodsType: element.name, 
                        amountOnWarehouse: element.amount, 
                        cost: parseFloat(element.price), 
                        goodsLimit: element.amount_limit,
                        code: element.code,
                        description: element.description,
                    })
                });
                resolve(buffer)
              }
            }
            xhr.send(null);
        })       
    }

    getOrders(type, isCurrent) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        var status = isCurrent?'in progress':'complited'

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/orders'+'?'+`type=${type}&status=${status}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    var buffer = []
                    console.log("answer")
                    console.log(answer)
                    answer.map(function( element, i) {
                        buffer.push({number:i+1, orderNumber: element.name, orderCost: parseFloat(element.cost), address: element.address, cost:parseFloat(element.cost), deadline:element.deadline})
                        buffer[i].id = getId()
                        buffer[i].code = element.id;
                    });
                    resolve(buffer)
                }
            }
            xhr.send(null);
        })       
    }

    getOrderGoods(value) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/orders_goods'+ "?" + `order_id=${value.code}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("ManagerSellProducts apiGetOrderGoods answer: ")
                    console.log(answer)
                    var buffer = []
                    answer.map(function( element, i) {
                        var sumCost = 0
                        if (!isNaN(parseInt(element.amount)) && !isNaN(parseInt(element.price)))
                        sumCost=element.amount*element.price
                        buffer.push({number:i+1, goodsType: element.name, amount: element.amount, cost: element.price, sumCost: sumCost})
                        buffer[i].id = getId()
                        buffer[i].code = element.code;
                    });
                    console.log("elm")
                    console.log(value)
                    resolve(buffer)
                }
            }
            xhr.send(null);
        })       
    }

    
}

