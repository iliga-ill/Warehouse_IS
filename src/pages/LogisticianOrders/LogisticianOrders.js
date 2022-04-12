import React, { Component, Fragment } from "react";
import './LogisticianOrders.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import SwitchHolder from "../../components/TabHolders/SwitchHolder/SwitchHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

export default function LogisticianOrders(props){
    
    var id=0
    function getId(){return id++}

//#region блоки
    //-------------------------------------------------------------------------Табы
    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    React.useEffect(() => {
        setTableList2([])
        setTableList1([])
        // setTableList([{id:0, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается", goodsInOrder:[]}, {id:1, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Пустой", goodsInOrder:[]}])
        setTableList([])
        
        apiGetOrders()
    }, [reload]);

    var [tabs, setTabs] = React.useState([
        {id:0, selected: true, title: "Текущие"},
        {id:1, selected: false, title: "Выполненные"}
    ])

    function onTabClick(tab_id){
        var mT = tabs
        mT.map(tab => {
            if (tab.id != tab_id){
                tab.selected = false
            } else {
                tab.selected = true
            }
            return tab
        })
        setTabs(mT)
        reloadPage()
    }
    //-------------------------------------------------------------------------Табы конец
    //-------------------------------------------------------------------------Блок 1

    //const [orders, setOrders] = React.useState([{id:0, text: "Ничего не найдено", selected: true, code: 0}])
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        if (orders.length > 0) {
            setTableList([])
            setTableList1([])
            setTableList2([])
            apiGetOrderGoods()
            apiGetGoodsType()
        }
    }, [orders]);
    
    function apiGetOrders() {
        var xhr = new XMLHttpRequest();
        var status = 'complited'
        tabs.forEach(tab => {
            if (tab.selected) {
                if (tab.title == "Текущие") status = 'in progress'
                else status = 'complited'
            }
           
        });
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
            setOrders(buffer)
          }
        }
        xhr.send(null);
    }
    if (orders.toString()=="")
        apiGetOrders()

    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 1

    const [isStart, setIsStart] = React.useState(true)

    if (isStart) {
        
         setIsStart(false)
    }

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                          editingEnabled:false,   width:40    }, 
        {name: 'shipmentNumber',    title:'Номер доставки',             editingEnabled:true,    width:155   }, 
        {name: 'shipmentDate',      title:'Дата доставки',              editingEnabled:true,    width:120   }, 
        {name: 'shipmentCost',      title:'Стоимость доставки (руб)',   editingEnabled:true,    width:200   }, 
        {name: 'shipmentStatus',    title:'Статус',                     editingEnabled:false,   width:110   }, 
    ]) 
    var tableSettings = {add:true, edit:true, delete:true, select:true}

//     const [tableList, setTableList] = React.useState([{id:0, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается", goodsInOrder:[]},
//     {id:1, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Пустой", goodsInOrder:[]}
// ])
    const [tableList, setTableList] = React.useState([])
    const [selectedItemId, setSelectedItemId] = React.useState()
    React.useEffect(() => {
        console.log("tableList")
        console.log(tableList)
        if (selectedItemId!=undefined){
            tableList.map(item=>{
                if (item.id == selectedItemId.id) {
                    setTableList1(item.goodsInOrder)
                    setBufferedTableList2(item.goodsInOrder)
                }
            })
        }
    }, [selectedItemId]);
        
    //-------------------------------------стол 1 конец
    //-------------------------------------стол 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'goodsType',       title:'Товар',                 editingEnabled:true,    width:140   }, 
        {name: 'weight',          title:'Вес ед продукции (кг)', editingEnabled:true,    width:159   }, 
        {name: 'expectingAmount', title:'Ожидаемое количество',  editingEnabled:true,    width:175   }, 
        {name: 'realAmount',      title:'Пришедшее кол-во',      editingEnabled:false,   width:144   }, 
        
    ]) 
    var tableSettings1 = {add:false, edit:true, delete:true}

    //const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"bb", weight:100, expectingAmount:10, realAmount:10}])
    const [tableList1, setTableList1] = React.useState([])
    React.useEffect(() => {
        var buf = tableList
        var shipmentOrder
        tableList.map(function(item,i){
            if (item.id==selectedItemId){
                shipmentOrder = item
                buf[i].goodsInOrder=tableList1
            }
        })
        setTableList(buf)
        
        console.log(order)
        console.log("tableList")
        console.log(tableList)
        //console.log(tableList2)
    }, [tableList1]);

        
    //-------------------------------------стол 2 конец
    //-------------------------------------------------------------------------Блок 2 конец
    

    //-------------------------------------------------------------------------Блок 3
    const [order, setOrder] = React.useState("")
    const [shipmentDeadline, setShipmentDeadline] = React.useState("")
    const [orderCost, setOrderCost] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [orderType, setOrderType] = React.useState("")

    //-------------------------------------стол 3
    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                      editingEnabled:false,   width:40    }, 
        {name: 'goodsType',         title:'Товар',                  editingEnabled:false,   width:140   }, 
        {name: 'goodsCost',         title:'Цена продукции',         editingEnabled:false,   width:124   }, 
        {name: 'shipmentProgress',  title:'Прогресс доставки',      editingEnabled:false,   width:142   }, 
        {name: 'weight',            title:'Вес ед продукции (кг)',  editingEnabled:false,   width:159   }, 
    ])
    var tableSettings2 = {add:false, edit:false, delete:false, select:true}

    // const [tableList2, setTableList2] = React.useState([{number:1, goodsType:"bb", goodsCost:100, shipmentProgress:"10/100", weight:10}])
    const [tableList2, setTableList2] = React.useState([])
    const [selectedItemId2, setSelectedItemId2] = React.useState()
    const [bufferedTableList2, setBufferedTableList2] = React.useState([])

    React.useEffect(() => {
        if (tableList2.toString()!="" && selectedItemId2 != undefined && selectedItemId != undefined) {
            var order = ''
            orders.forEach(element => {  
                if (element.selected == true) {
                    order = element
                }
            });

            var buf = []
            var selectedRow;

            bufferedTableList2.map(function(element, i) {
                buf.push(element)
            })

            tableList2.map(function(element, i){
                if (element.id == selectedItemId2.id) {
                    selectedRow = {id: getId(), goodsType: tableList2[i].goodsType, weight:tableList2[i].weight, expectingAmount:0, realAmount:0, goodCode: tableList2[i].goodCode, shipmentOrderGoodsCode:0, orderCode:order.code}
                }     
            })
            var check = true
            buf.map(function(element,i){
                if (element.goodCode == selectedRow.goodCode) check = false
            })
            if (check) buf.push(selectedRow)

            buf.map(function(element, i){
                element.id = getId()
            }) 
            console.log("buf")
            console.log(buf)
            setBufferedTableList2(buf)
            setTableList1(buf)
        }
    }, [selectedItemId2]);


    const [goodsType, setGoodsType] = React.useState([])
    function apiGetGoodsType() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_type', true);
        console.log("StorekeeperAdvent apiGetGoodsType was launched")
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
                    setGoodsType(goods)
                    apiGetShipmentOrderGoodsByOrderId(goods)
                }
            }
        }
        xhr.send(null);
    }

    function apiGetShipmentOrderGoodsByOrderId(goodsTypeAnswer) {
        var order = ''
        orders.forEach(element => {  
          if (element.selected == true) {
            order = element
            console.log('element')
            console.log(element)
          }
        });

        if (order != '') {
            var tableListBuf = []
            var xhr = new XMLHttpRequest();
            xhr.open('GET', host+'/shipment_order_goods_id'+'?'+`order_id=${order.code}`, true);
            console.log("StorekeeperAdvent apiGetShipmentOrderGoodsByOrderId was launched")
            xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAdvent apiGetShipmentOrderGoodsByOrderId answer: ")
                console.log(answer)
                console.log("goodsTypeAnswer");
                console.log(goodsTypeAnswer);

                answer.map(function(shipment, i){
                    //tableListBuf.push({number: i+1, shipmentNumber: shipment.name, shipmentDate: shipment.shipment_date, shipmentCost: shipment.shipment_price, shipmentStatus: shipment.status_fullness, goodsInOrder: shipment.goods})
                    var goods_array = []
                    tableListBuf.push({number: i+1, shipmentNumber: shipment.name, orderCode:order.code, shipmentDate: shipment.shipment_date.split("T")[0], shipmentCost: shipment.shipment_price, shipmentStatus: shipment.status_fullness, goodsInOrder: []})
                    if (shipment.goods != undefined) {
                        shipment.goods.map(function(good, j){
                            goodsTypeAnswer.map(item=>{
                                if (item.code == good.goods)
                                    goods_array.push({id: getId(), goodsType: item.text, weight:item.weight, expectingAmount:good.amount, realAmount:0, goodCode: good.goods, shipmentOrderGoodsCode:good.code})
                            })
                        })
                    }
                    tableListBuf[i].goodsInOrder = goods_array
                    tableListBuf[i].id = getId()
                    tableListBuf[i].code = shipment.code
                })
                console.log("tableListBuf")
                console.log(tableListBuf)
                setTableList(tableListBuf)
              } 
            }
        
            xhr.send(null);
        } else {
            setTableList([])
        }
      }

    function apiGetOrderGoods() {
        var order = ''
        orders.forEach(element => {
        if (element.selected == true) {
            console.log('order')
            console.log(element)
            order = element
        }
        });
        if (order != '') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', host+'/orders_goods'+ "?" + `order_id=${order.code}`, true);
            console.log("LogisticianOrders apiGetOrderGoods started: ")
            xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("LogisticianOrders apiGetOrderGoods answer: ")
                console.log(answer)
                var buffer = []
                answer.map(function( element, i) {
                    buffer.push({number:i+1, goodsType: element.name, weight: element.weight, goodsCost: element.price, shipmentProgress:"10/100", goodCode:element.code})
                    buffer[i].id = getId()
                    buffer[i].code = element.code;
                });
                // console.log("order")
                // console.log(order)
              
                if (order.order_status == "sell")
                    setOrderType("На продажу")
                else
                    setOrderType("На поставку")
                setOrder(order.text)
                setShipmentDeadline(order.deadline)
                setOrderCost(order.cost)
                setAddress(order.address)
                setTableList2(buffer)
              }
            }
            xhr.send(null);
        }
    }

    // const [order, setOrder] = React.useState("")
    // const [shipmentDeadline, setShipmentDeadline] = React.useState("")
    // const [orderCost, setOrderCost] = React.useState("")
    // const [address, setAddress] = React.useState("")
    // const [orderType, setOrderType] = React.useState("")
    //-------------------------------------стол 3 конец
    //-------------------------------------------------------------------------Блок 3 конец

    function btn_send_1() {
        var order = ''
        orders.forEach(element => {
          if (element.selected == true) order = element
        });

        console.log(order)
        var obj = [{order_id: order.code, tableList: tableList}]
        console.log(obj)
        apiUpdateShipmentOrder(obj)
    }

    function apiUpdateShipmentOrder(value) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', host+'/update_shipment_orders', true);
      
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(this.responseText);
            alert("Изменения успешно приняты")
            setTableList([])
            setTableList1([])
            setBufferedTableList2([])
            apiGetGoodsType()
          }
        }
        
        xhr.send(JSON.stringify(value));
    }

    function btn_send_2() {
        apiUpdateOrderStatus()
    }

    function apiUpdateOrderStatus() {
    var order = ''
    orders.forEach(element => {
    if (element.selected == true) {
        order = element
    }
    });

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', host+'/update_order_status'+'?'+`id=${order.code}`, true);
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(this.responseText);
        alert(`${order.text} успешно завершен`)
        setOrders([])
        setTableList([])
        setTableList1([])
        setTableList2([])
        setBufferedTableList2([])
        apiGetOrders()
    }
    }
        
        xhr.send(null);
      }
//#endregion

    return (
        <>
            <SwitchHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage Id={getId()}>
                <FlexibleBlock>
                    <ListWithSearch Id={getId()} item_list={orders} func={setOrders} width={"200px"} height={"525px"}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Доставка товаров</div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={200} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings} onSelect={setSelectedItemId}/>
                    </div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={250} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1}/>
                    </div>
                    <div style={{height:20+"px"}}/>    
                    <div class="place_holder_LogisticianOrders"/><button class="bt_send_LogisticianOrders" onClick={btn_send_1}>Завершить редактирование</button>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div style={{width:500+"px"}}>
                        <div class="header_text"><label class="header_text">{order}</label></div>
                        <div class="low_text bold">Крайний срок поставки:&nbsp;&nbsp;<label class="normal">{shipmentDeadline}</label></div>
                        <div class="low_text bold">Полная&nbsp;стоимость&nbsp;заказа:&nbsp;<label class="normal">{orderCost}</label></div>
                        <div class="low_text bold">Адрес:&nbsp;<label class="normal">{address}</label></div>
                        <div class="low_text bold">Тип&nbsp;заказа:&nbsp;<label class="normal">{orderType}</label></div>
                        <div class="low_text bold">Товары&nbsp;в&nbsp;заказе:&nbsp;</div>
                    </div>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={380} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} tableSettings={tableSettings2} onSelect={setSelectedItemId2}/>
                    </div>
                    <div style={{height:20+"px"}}/>   
                    <div class="place_holder_LogisticianOrders"/><button class="bt_send_LogisticianOrders" onClick={btn_send_2}>Завершить заказ</button>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}