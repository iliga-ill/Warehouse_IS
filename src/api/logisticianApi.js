export class Api {

    getOrders(status) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        var status = isCurrent?'in progress':'complited'
        
        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/orders_all'+'?'+`status=${status}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("LogisticianOrders apiGetOrders answer: ")
                    console.log(answer)
                    var buffer = []
                    answer.map(function( element, i) {
                        if (i==0)
                            buffer.push({id:getId(), text: element.name, selected: true, code: element.id, address: element.address, cost:element.cost, deadline:element.deadline.split("T")[0], order_status:element.order_status})
                        else
                            buffer.push({id:getId(), text: element.name, selected: false, code: element.id, address: element.address, cost:element.cost, deadline:element.deadline.split("T")[0], order_status:element.order_status})
                    });
                    resolve(buffer)
                }
            }
            xhr.send(null);
        })
    }

    getGoodsType() {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        
        return new Promise(function(resolve, reject){
            console.log("StorekeeperAdvent apiGetGoodsType was launched")
            xhr.open('GET', host+'/goods_type', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (this.response != "") {
                        console.log("StorekeeperAdvent apiGetGoodsType answer: ")
                        console.log(this.response)
                        var answer = JSON.parse(this.response)
                     
                        var goods = [{id:0, text: "Ошибка", category: "Ошибка", sub_category: "Ошибка", ordered: 0, amount: 0, code: 0}]
                        answer.map( function(item, i) {
                            goods[i] = {id:i, text: item.name, category: item.category, sub_category: item.subcategory_2, ordered: item.amount_ordered, amount: item.amount, code: item.code, weight:item.weight}
                        })
                        resolve(goods)
                    }
                }
            }
            xhr.send(null);
        })
    }

    getShipmentOrderGoodsByOrderId(goodsTypeAnswer) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        var tableListBuf = []

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'/shipment_order_goods_id'+'?'+`order_id=${order.code}`, true);
            console.log("StorekeeperAdvent apiGetShipmentOrderGoodsByOrderId was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetShipmentOrderGoodsByOrderId answer: ")
                    console.log(answer)
                    console.log("goodsTypeAnswer");
                    console.log(goodsTypeAnswer);

                    let counter1 = 0;
                    answer.map(function(shipment, i){
                        //tableListBuf.push({number: i+1, shipmentNumber: shipment.name, shipmentDate: shipment.shipment_date, shipmentCost: shipment.shipment_price, shipmentStatus: shipment.status_fullness, goodsInOrder: shipment.goods})
                        var goods_array = []
                        if (shipment.goods != undefined) {
                            shipment.goods.map(function(good, j){
                                let counter2 = 0;
                                goodsTypeAnswer.map(item=>{
                                    if (item.code == good.goods)
                                        goods_array.push({id: counter2++, goodsType: item.text, weight:item.weight, expectingAmount:good.amount, realAmount:0, goodCode: good.goods, shipmentOrderGoodsCode:good.code})
                                })
                            })
                        }
                        tableListBuf.push({id:counter1, number: counter1+++1, shipmentNumber: shipment.name, orderCode:order.code, shipmentDate: shipment.shipment_date.split("T")[0], shipmentCost: parseFloat(shipment.shipment_price) , shipmentStatus: shipment.status_fullness, goodsInOrder: goods_array, code: shipment.code})
                    })
                    console.log("tableListBuf")
                    console.log(tableListBuf)
                    resolve(tableListBuf)
                } 
            }
            xhr.send(null);
        })
    }

    getOrderGoods() {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        return new Promise(function(resolve, reject){
            xhr.open("GET", host+'/orders_goods'+ "?" + `order_id=${order.code}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("LogisticianOrders apiGetOrderGoods answer: ")
                    console.log(answer)
                    var buffer = []
                    answer.map(function( element, i) {
                        buffer.push({number:i+1, goodsType: element.name, weight: element.weight, goodsCost: parseFloat(element.price), shipmentProgress:"10/100", goodCode:element.code})
                        buffer[i].id = getId()
                        buffer[i].code = element.code;
                    });
    
                    resolve(buffer)
                  }
            }
            xhr.send(null);
        })
    }

    updateShipmentOrder(value) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        return new Promise(function(resolve, reject){
            xhr.open('POST', host+'/update_shipment_orders', true);
            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                        console.log(this.responseText);
                        alert("Изменения успешно приняты")
                        resolve("Responded")
                    }
                }
            xhr.send(JSON.stringify(value));
        })
    }

    updateOrderStatus(order) {
        var xhr = new XMLHttpRequest();
        const host = 'http://localhost:5000';
        return new Promise(function(resolve, reject){
            xhr.open('PUT', host+'/update_order_status'+'?'+`id=${order.code}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    alert(`${order.text} успешно завершен`)
                    resolve("Responsed")
                }
            }
            xhr.send(JSON.stringify(value));
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
                        buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: parseFloat(element.price), weight: element.weight})
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

}

