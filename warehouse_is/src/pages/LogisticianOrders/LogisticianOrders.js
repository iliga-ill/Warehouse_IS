import React, { Component, Fragment } from "react";
import './LogisticianOrders.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import TabHolder from "../../components/TabHolder/TabHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

export default function LogisticianOrders(props){
    
    var id=props.Id
    function getId(){
        id++
        return id-1
    }

//#region блоки
    //-------------------------------------------------------------------------Табы
    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    React.useEffect(() => {
        setTableList2([])
        setTableList1([])
        setTableList([{id:0, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается", goodsInOrder:[]}, {id:1, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Пустой", goodsInOrder:[]}])
        
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
        if (orders.length > 0) apiGetOrderGoods()
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
                    buffer.push({id:getId(), text: element.name, selected: true, code: element.id, address: element.address, cost:element.cost, deadline:element.deadline, order_status:element.order_status})
                else
                    buffer.push({id:getId(), text: element.name, selected: false, code: element.id, address: element.address, cost:element.cost, deadline:element.deadline, order_status:element.order_status})
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
    var edit_column = {add:true, edit:true, delete:true, select:true}

    const [tableList, setTableList] = React.useState([{id:0, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается", goodsInOrder:[]},
    {id:1, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Пустой", goodsInOrder:[]}
])
    const [selectedItemId, setSelectedItemId] = React.useState()
    React.useEffect(() => {
        tableList.map(item=>{
            if (item.id == selectedItemId) {
                setTableList1(item.goodsInOrder)
                setBufferedTableList2(item.goodsInOrder)
            }
        })
    }, [selectedItemId]);
        
    //-------------------------------------стол 1 конец
    //-------------------------------------стол 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'goodsType',       title:'Товар',                 editingEnabled:true,    width:140   }, 
        {name: 'weight',          title:'Вес ед продукции (кг)', editingEnabled:true,    width:159   }, 
        {name: 'expectingAmount', title:'Ожидаемое количество',  editingEnabled:true,    width:175   }, 
        {name: 'realAmount',      title:'Пришедшее кол-во',      editingEnabled:false,   width:144   }, 
        
    ]) 
    var edit_column1 = {add:false, edit:true, delete:true}

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
        

        var order = ''
        orders.forEach(element => {
          if (element.selected == true) order = element
        });

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
    var edit_column2 = {add:false, edit:false, delete:false, select:true}

    // const [tableList2, setTableList2] = React.useState([{number:1, goodsType:"bb", goodsCost:100, shipmentProgress:"10/100", weight:10}])
    const [tableList2, setTableList2] = React.useState([])
    const [selectedItemId2, setSelectedItemId2] = React.useState()
    const [bufferedTableList2, setBufferedTableList2] = React.useState([])

    React.useEffect(() => {
        console.log("selectedItemId2")
        console.log(selectedItemId2)
        console.log("selectedItemId")
        console.log(selectedItemId)
        if (tableList2.toString()!="" && selectedItemId2 != undefined && selectedItemId != undefined) {
            var buf = []
            var selectedRow;

            bufferedTableList2.map(function(element, i) {
                buf.push(element)
            })

            tableList2.map(function(element, i){
                if (element.id == selectedItemId2) {
                    console.log(`i`)
                    console.log(i)
                    selectedRow = {id: getId(), goodsType: tableList2[i].goodsType, weight:tableList2[i].weight, expectingAmount:0, realAmount:0, goodCode: tableList2[i].goodCode}
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

    function apiGetOrderGoods() {
        var order = ''
        orders.forEach(element => {
          if (element.selected == true) order = element
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
                console.log("order")
                console.log(order)
                setTableList2(buffer)
                if (order.order_status == "sell")
                    setOrderType("На продажу")
                else
                    setOrderType("На поставку")
                setOrder(order.text)
                setShipmentDeadline(order.deadline)
                setOrderCost(order.cost)
                setAddress(order.address)
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
        console.log(tableList)


        
    }
//#endregion

    return (
        <>
            <TabHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage Id={getId()}>
                <FlexibleBlock>
                    <ListWithSearch Id={getId()} item_list={orders} func={setOrders} width={"200px"} height={"525px"}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Доставка товаров</div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={200} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} onSelect={setSelectedItemId}/>
                    </div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={250} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1}/>
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
                        <TableComponent height={300} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} editColumn={edit_column2} onSelect={setSelectedItemId2}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}