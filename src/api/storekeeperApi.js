import {Host} from './host'
var hostObj = new Host()
var host = hostObj.getHost()

export class Api {

    getShipmentOrders(type, status) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+`shipment_order_goods/?type=${type}&status=${status}`, true);
            console.log("StorekeeperAdvent apiGetShipmentOrders was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetShipmentOrders answer: ")
                    console.log(answer)
                    var counter = 0
                    var order = [{id:0, text: "Ничего не найдено", selected: true, code: 0}]
                    answer.map( function(item, i) {
                        if (i === 0)  order[i] = {id:counter++, text: item.name, selected: true, code: item.code}
                        else order[i] = {id:counter++, text: item.name, selected: false, code: item.code}
                    })
                    resolve(order)
                }
            }
            xhr.send(null);
        }) 
    }

    getGoodsSubCat2() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_subcat2/', true);
            console.log("StorekeeperAdvent apiGetGoodsSubCat2 was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetGoodsSubCat2 answer: ")
                    console.log(answer)
                    var goods = [{id:0, text: "ошибка", code: 0}]
                    answer.map( function(item, i) {
                        goods[i] = {id:i, text: item.name, code: item.code}
                    })
                    resolve(goods)
                }
            }
            xhr.send(null);
        }) 
    }

    getGoodsSubCat3() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_subcat3/', true);
            console.log("StorekeeperAdvent apiGetGoodsSubCat3 was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetGoodsSubCat3 answer: ")
                    console.log(answer)
                    var goods = [{id:0, text: "ошибка", code: 0}]
                    answer.map( function(item, i) {
                        goods[i] = {id:i, text: item.name, code: item.code}
                    })
                    resolve(goods)
                }
            }
            xhr.send(null);
        }) 
    }

    getGoodsType() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_type/', true);
            console.log("StorekeeperAdvent apiGetGoodsType was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var goods = [{id:0, text: "Ошибка", category: "Ошибка", sub_category: "Ошибка", ordered: 0, amount: 0, code: 0}]
                    if (this.response != "") {
                        console.log("StorekeeperAdvent apiGetGoodsType answer: ")
                        console.log(this.response)
                        var answer = JSON.parse(this.response)
                       
                        answer.map( function(item, i) {
                            goods[i] = {id:i, text: item.name, category: item.category, sub_category: item.subcategory_2, ordered: item.amount_ordered, amount: item.amount, code: item.code}
                        })
              
                    }
                    resolve(goods)
                }
            }
            xhr.send(null);
        }) 
    }

    getGoodsByShipmentOrder(order, goodsType, goodsCategories2, goodsCategories3) {
        var xhr = new XMLHttpRequest();
        console.log('subcat2')
        console.log(goodsCategories2)

        console.log('subcat3')
        console.log(goodsCategories3)

        console.log('goodsType')
        console.log(goodsType)
        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'shipment_order_goods_by_order/'+'?'+`code=${order.code}`, true);
            console.log("StorekeeperAdvent apiGetGoodsByOrder was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetGoodsByOrder answer: ")
                    console.log(answer)
                    var buffer = []
                    var counter = 0;
                    answer.map( function(item, i) {
                    //goods_by_order[i] = {id:i, category: "goods_categories[answer.category-1]", sub_category: "goods_categories2[answer.sub_category_2-1]",  text: "answer.name", amount_ordered: "answer.amount_ordered", amount: "answer.amount", code: foo}
                    goodsType.forEach (function(item2, j) {
                            var it = parseInt(item2.code)
                            if (it.toString() == item.goods.toString()) {
                                //  bar[i] = [i, goodsCategories2[item2.category-1].text, goodsCategories3[item2.sub_category-1].text,  item2.text, item2.ordered, item2.amount, true]
                                buffer[counter] = {number: counter+1, goodsCategories2: goodsCategories2[item2.category-1].text, goodsCategories3: goodsCategories3[item2.subcategory_2-1].text, goodsType: item2.name, orderedAmount: item.amount, amount: item.amount_real}
                                buffer[counter].code = item.code;
                                buffer[counter].id = counter++
                            }   
                        })
                    })
                    resolve(buffer)
                }
            }
            xhr.send(null);
        })  
    }

    getGoodsCat() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_cat/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    answer.map( function(item, i) {
                        console.log(this.responseText);
                    })
                    resolve("Responded")
                }
            }
            xhr.send(null);
        }) 
    }

    getGoodsSubCat4() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_subcat4/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    resolve(this.responseText);
                }
            }
            xhr.send(null);
        }) 
    }

    updateOrderGoods(selected, array) {
        console.log("В Шарараме хорошо")
        console.log(selected)
        var body = array
        body.forEach(element => {
            element.orderCode = selected.code
        });

        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open('POST', host+'update_order_goods/', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                        console.log(this.responseText);
                        // alert("Изменения успешно приняты")
                        resolve("Responded")
                    }
                }
            xhr.send(JSON.stringify(body));
        }) 
    }

    getZones() {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'zones/', true);
            //Send the proper header information along with the request
            xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    //console.log("StorekeeperAllocation apiGetZones answer: ")
                    //console.log(answer)
                    var buf = []
                    answer.map( function(item, i) {
                        buf[i] = {name: item.name}
                    })
                    resolve(buf)
                }
            }
            xhr.send(null);
        }) 
    }

    getRacks(zonesAnswer) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'racks/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAllocation apiGetRacks answer: ")
                    console.log(answer)
                    var buf = []
                    answer.map( function(item, i) {
                        buf[i] = {code: item.code, name: item.name, racks_num: item.racks_num, zone_num: zonesAnswer[item.zone_num-1].name}
                    })
                    resolve(buf)
                }
            }
            xhr.send(null);
        
        }) 
    }

    getShelfs(racksAnswer) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'shelfs/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAllocation apiGetShelfs answer: ")
                    console.log(answer)
                    var buf = []
                    answer.map( function(item, i) {
                        buf[i] = {shelfCode: item.code, name: item.name, shelfCode: item.code, rack_num: racksAnswer[item.rack_num-1].name, zone_num: racksAnswer[item.rack_num-1].zone_num, capacity: item.capacity, shelf_space: item.shelf_space}
                    })
                    resolve(buf)
                }
            }
            xhr.send(null);
        })
    }
    
    getGoodsType() {
        var xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'goods_type/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (this.response != "") {
                        console.log("StorekeeperAllocation apiGetGoodsType answer: ")
                        console.log(this.response)
                        var answer = JSON.parse(this.response)
                        var buf = []
                        answer.map( function(item, i) {
                            buf[i] = item
                        })
                        resolve(buf)
                    }
                }
            }
            xhr.send(null);
        })
    }

    getShelfSpaces(shelfsAnswer, goodsType = "") {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'shelf_space/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAllocation apiGetShelfsSpace answer: ")
                    console.log(answer)
                    var buf = shelfsAnswer
        
                    answer.map( function(item, i) {
                        shelfsAnswer.map(function(item1,j){
                            if (item1.shelfCode == item.shelf_num) {
                                if (goodsType != "") {
                                    goodsType.map(item2=>{
                                        if (item2.code == item.good){
                                            if (item1.shelf_space == null) buf[j].shelf_space = []
                                            buf[j].shelf_space.push({good:item2.name, goodCode:item.good, amount:item.amount, weight: item2.weight, status:item.status, shelfCode:item.code})
                                        }
                                    })
                                } else {
                                    if (item1.shelfCode == item.shelf_num) {
                                        if (item1.shelf_space == null) buf[j].shelf_space = []
                                        buf[j].shelf_space.push({good:item.good, amount:item.amount})
                                    }
                                }
                            }
                        })
                    })
                    console.log("StorekeeperAllocation apiGetShelfsSpace changed answer: ")
                    console.log(buf)
                    resolve(buf)
                }
            }
            xhr.send(null);
        })
    }

    getShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, goodsCategories3Answer) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('GET', host+'shipment_order_goods_all/', true);
            console.log("StorekeeperAllocation apiGetShipmentOrdersGoods was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAllocation apiGetShipmentOrdersGoods answer: ")
                    console.log(answer)
                    console.log(goodsCategories2Answer)
                    console.log(goodsCategories3Answer)
                    var buf = []
                    var counter = 0
                    answer.map( function(item, i) {
                        if (item.amount_real > item.placed_amount) {
                            var good
                            goodsTypeAnswer.map(item1=>{
                                if (item1.code == item.goods)
                                    good=item1
                            })
                            console.log(good)
                            buf[counter] = {id: counter++, code:item.code, goodCode:item.goods, amount: item.amount, amount_real: item.amount_real, weight:good.weight, placed_amount:item.placed_amount , code: item.code, good_name: good.name, goodsCategories2: goodsCategories2Answer[good.subcategory_2-1].text, goodsCategories3:goodsCategories3Answer[good.subcategory_3-1].text , order_num: item.order_num}
                        }
                    })
                    console.log("StorekeeperAllocation apiGetShipmentOrdersGoods answer changed: ")
                    console.log(buf)
                    resolve(buf)
                }
            }
                xhr.send(null);
        })
    }

    postGoodsToShelfs(value) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+'post_goods_to_shelfs/', true);
            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
          
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                // console.log("this.readyState")
                // console.log(this.readyState)
                // console.log("this.status")
                // console.log(this.status)
                if (this.readyState === XMLHttpRequest.DONE) {
                    alert("Изменения успешно приняты")
                    resolve("Изменения успешно приняты")
                }
            }
            xhr.send(JSON.stringify(value));
        })
    }

    // getShipmentOrders() {
    //     var xhr = new XMLHttpRequest();

    //     return new Promise(function(resolve, reject){
    //         xhr.open('GET', host+'shipment_order_goods/'+'?'+'type=purchase&status=opened', true);
    //         console.log("StorekeeperAdvent apiGetOrders was launched")
    //         xhr.onreadystatechange = function() {
    //             if (xhr.readyState == XMLHttpRequest.DONE) {
    //                 var answer = JSON.parse(this.response)
    //                 console.log("StorekeeperAdvent apiGetOrders answer: ")
    //                 console.log(answer)
    //                 var counter = 0
    //                 var order = [{id:0, text: "Ничего не найдено", selected: true, code: 0}]
    //                 answer.map( function(item, i) {
    //                     if (i === 0 & item.status != "closed")  order[i] = {id:counter++, text: item.name, selected: true, code: item.code}
    //                     else if (item.status != "closed") order[i] = {id:counter++, text: item.name, selected: false, code: item.code}
    //                 })
    //                 resolve(order)
    //             }
    //         }
    //         xhr.send(null);
    //     })
    // }

    updateOrderGoodsExpend(amount, code) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('PUT', host+'update_order_goods_expend/'+'?'+`amount=${amount}&code=${code}`, true);
            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log(this.responseText);
                    resolve("Изменения успешно приняты")
                }
            }
            xhr.send(null);
        })
    }

    updateOrderStatus(selected, space) {
        var goods = []
        goods = space
        goods.map(good => {
            good.zone = selected.zone
            good.shelf = selected.shelf
            good.rack = selected.rack
        })
        console.log("Шарарам")
        console.log(goods)

        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open("POST", host+'update_shelf_space_status/', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                //   console.log(this.responseText);
                //   shelfsSpace.map(function(item, i){
                //       if (item.shelf_space!=undefined)
                //         item.shelf_space.map(function(item1, j){
                //             if (code == item1.shelfCode) {
                //                 console.log(status)
                //                 item1.status = status
                //             }
                            
                //             return item1
                //         })
                //     return item
                //   })
            
                //     var buf=[]
                //     var counter = 0
                //     shelfsSpace.map(function(item, i){
                //         if (item.shelf_space != null && item.shelf_space != undefined) {
                //             var amount = 0
                //             var inventorysatedAmount = 0
                //             item.shelf_space.map(function(item1, j){
                //                 amount+=item1.amount
                //                 if (item1.status!='Не инвентаризирован') inventorysatedAmount++
                //             })
                //             item.inventorysationStatus=inventorysatedAmount==amount?"Проинвентаризировано":inventorysatedAmount!=0?"Частично проверено":"Не проверено";
                //             buf.push({id:counter, number:++counter, zone:item.zone_num, rack:item.rack_num, shelf:item.name, amount:amount, inventorysationStatus:item.inventorysationStatus})
                //         }
                //     })
                //     console.log('buf')
                //     console.log(buf)
                //     resolve(buf)
                    resolve(this.responseText)
                }
            }
            xhr.send(JSON.stringify(goods));
        })
    }

    updateOrderStatus2(status, code, i, shelfsSpace, tableList1) {
        var xhr = new XMLHttpRequest();

        return new Promise(function(resolve, reject){
            xhr.open('PUT', host+'update_shelf_space_status/'+'?'+`status=${status}&code=${code}`, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log(this.responseText);
                    shelfsSpace.map(function(item, i){
                        if (item.shelf_space!=undefined)
                            item.shelf_space.map(function(item1, j){
                                if (code == item1.shelfCode) {
                                    console.log(status)
                                    item1.status = status
                                }
                                
                                return item1
                            })
                        return item
                    })
                    if (i==tableList1.length-1) {
                        var buf=[]
                        var counter = 0
                        shelfsSpace.map(function(item, i){
                            if (item.shelf_space != null && item.shelf_space != undefined) {
                                var amount = 0
                                var inventorysatedAmount = 0
                                item.shelf_space.map(function(item1, j){
                                    amount+=item1.amount
                                    if (item1.status!='Не инвентаризирован') inventorysatedAmount++
                                })
                                item.inventorysationStatus=inventorysatedAmount==amount?"Проинвентаризировано":inventorysatedAmount!=0?"Частично проверено":"Не проверено";
                                buf.push({id:counter, number:++counter, zone:item.zone_num, rack:item.rack_num, shelf:item.name, amount:amount, inventorysationStatus:item.inventorysationStatus})
                            }
                        })
                        resolve(buf)
                        //alert(`Статусы успешно сохранены`)
                    }
                }
            }
            xhr.send(null);
        })
    }

}

