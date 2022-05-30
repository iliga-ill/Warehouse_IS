import React, { Component, Fragment } from "react";
import './LogisticianOrders.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/logisticianApi"

var api = new Api()
let date = new Date()
var TableListIsAnswer = true
var TableList1IsAnswer = true

export default function LogisticianOrders(props){

//#region блоки

    const [isCurrent, setIsCurrent] = React.useState(true)
    if (isCurrent!=props.isCurrent) setIsCurrent(props.isCurrent)
    React.useEffect(() => {
        setTableList2([])
        setTableList1([])
        // setTableList([{id:0, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается", goodsInOrder:[]}, {id:1, number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Пустой", goodsInOrder:[]}])
        setTableList([])
        apiGetOrders()
    }, [isCurrent]);

    //-------------------------------------------------------------------------Блок 1

    const [orders, setOrders] = React.useState([])
    const [selOrder, setSelOrder] = React.useState(undefined)

    React.useEffect(() => {
        if (orders.length > 0) {   
            // setTableList([])
            setTableList1([])
            setTableList2([])
            apiGetOrderGoods()
            apiGetGoodsType()
            apiGetShipments(selOrder) 
        }
    }, [selOrder]);
    
    async function apiGetOrders() {
        var result = await api.getOrders(isCurrent)
        structuredClone(orders).map(()=>{orders.pop()})
        result.map(item=>{orders.push(item)})
        setSelOrder(result[0])
    }

    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 1

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                    editingEnabled:false,   width:40    }, 
        {name: 'shipmentNumber',    title:'Номер доставки',       editingEnabled:true,    width:155, mask:/^(.)(.*)$/i, maskExample:"быть заполнено", basicValue:"-"}, 
        {name: 'shipmentDate',      title:'Дата доставки',        editingEnabled:true,    width:120, mask:/^[0-9]{4}\.[0-9]{2}\.[0-9]{2}$/i, maskExample:"соответствовать шаблону 2021.01.01", basicValue:`${date.getFullYear()}.${date.getMonth()+1<10?`0${date.getMonth()+1}`:date.getMonth()+1}.${date.getDate()<10?`0${date.getDate()}`:date.getDate()}`}, 
        {name: 'shipmentCost',      title:'Стоимость доставки',   editingEnabled:true,    width:200, mask:/^[0-9]{0,10}$/i, maskExample:"быть числом больше нуля", isCurrency:true, basicValue: 0}, 
        {name: 'shipmentStatus',    title:'Статус',               editingEnabled:false,   width:110   }, 
    ]) 
    var tableSettings
    if (isCurrent){
        tableSettings = {
            add:true, 
            edit:true, 
            delete:true, 
            select:true
        }
    }
    else {
        tableSettings = {
            add:false, 
            edit:false, 
            delete:false, 
            select:true
        }
    }
    
    const [tableList, setTableList] = React.useState([])
    const [selectedItemId, setSelectedItemId] = React.useState(undefined)
 
    React.useEffect(() => {
        if (selectedItemId!=undefined){ 
            apiGetShipmentGoods(selectedItemId)
            // tableList.map(item=>{
            //     if (item.id == selectedItemId.id) {
            //         setTableList1(item.goodsInOrder)
            //         setBufferedTableList2(item.goodsInOrder)
            //     }
            // })
        }
    }, [selectedItemId]);

    async function apiGetShipmentGoods(selected) {
        console.log(selected)
        TableList1IsAnswer = true
        var result = await api.getShipmentsGoods(selected)
        setTableList1(result)
    }

    React.useEffect(() => {
        if (selOrder != undefined) {
            if (TableListIsAnswer != true) postShipments(selOrder, tableList)
            TableListIsAnswer = false
        }
    }, [tableList])

    async function postShipments(selected, tableList) {
        var result = []
        var elm = await api.postShipments(selected, tableList)
        if (elm != undefined && elm != [] && elm != "[]") {
            result.push(elm)
            console.log("ЖЕКИ был здесь")
            result.map(id => {
                console.log(id[0])
                tableList[tableList.length-1].code = id[0]
            })
        }
    }
        
    async function apiGetShipments(selected) {
        TableListIsAnswer = true
        var result = await api.getShipments(selected.code)
        setTableList(result)
    }

    //-------------------------------------стол 1 конец
    //-------------------------------------стол 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',          title:'№',                     editingEnabled:false,   width:40    }, 
        {name: 'goodsType',       title:'Товар',                 editingEnabled:false,   width:228   }, 
        {name: 'weight',          title:'Вес ед продукции (кг)', editingEnabled:true,    width:159, mask:/^[0-9]{0,10}$/i, maskExample:"быть числом больше нуля"},
        {name: 'expectingAmount', title:'Ожидаемое количество',  editingEnabled:true,    width:175, mask:/^[0-9]{0,10}$/i, maskExample:"быть числом больше нуля"},
        {name: 'realAmount',      title:'Пришедшее кол-во',      editingEnabled:false,   width:144   }, 
        
    ]) 
    var tableSettings1 = {
        editColumnWidth: 100,
        add:false, 
        edit:false, 
        delete:true,
        cell:true,
    }

    const [tableList1, setTableList1] = React.useState([])
    React.useEffect(() => {
        // var buf = tableList
        // tableList.map(function(item,i){
        //     if (item.id==selectedItemId){
        //         buf[i].goodsInOrder=tableList1
        //     }
        // })
        // setTableList(buf)
        if (selectedItemId != undefined) {
            if (TableList1IsAnswer == false) apiPostShipmentGoods(selectedItemId, tableList1)
            TableList1IsAnswer = false
        }
    }, [tableList1]);

    async function apiPostShipmentGoods(selected, body) {
        var result = []
        var elm = await api.postShipmentGoods(selected, body)
        if (elm != undefined && elm != [] && elm != "[]" && elm.length != 0) {
            result.push(elm)
            result.map((id, i)=>{
                tableList1[tableList1.length-1].code = id[0]
                tableList1[tableList1.length-1].id = id[0]
            })
        }
    }

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
        {name: 'goodsCost',         title:'Цена продукции',         editingEnabled:false,   width:124, isCurrency:true   }, 
        {name: 'shipmentProgress',  title:'Прогресс доставки',      editingEnabled:false,   width:142   }, 
        {name: 'weight',            title:'Вес ед продукции (кг)',  editingEnabled:false,   width:159   }, 
    ])
    var tableSettings2 = {add:false, edit:false, delete:false, select:true}

    // const [tableList2, setTableList2] = React.useState([{number:1, goodsType:"bb", goodsCost:100, shipmentProgress:"10/100", weight:10}])
    const [tableList2, setTableList2] = React.useState([])
    const [selectedItemId2, setSelectedItemId2] = React.useState()
    const [bufferedTableList2, setBufferedTableList2] = React.useState([])

    React.useEffect(() => {

    }, [tableList2])

    React.useEffect(() => {
        if (tableList2.toString()!="" && selectedItemId2 != undefined && selectedItemId != undefined) {
            var buf = []
            var selectedRow;

            bufferedTableList2.map(function(element, i) {
                buf.push(element)
            })
 
            tableList2.map(function(element, i){
                if (element.id == selectedItemId2.id) {
                    console.log("selectedItemId2")
                    console.log(selectedItemId2)
                    console.log(element)
                    if (tableList1 == "")
                        selectedRow = {id: 0, code: 0, number:1, goodsType: tableList2[i].goodsType, weight:tableList2[i].weight, expectingAmount:0, realAmount:0, goodCode: tableList2[i].goodCode, shipmentOrderGoodsCode:0, orderCode:selOrder.code}
                    else
                        selectedRow = {id: tableList1[tableList1.length-1].id+1, code: 0, number:tableList1[tableList1.length-1].number+1, goodsType: tableList2[i].goodsType, weight:tableList2[i].weight, expectingAmount:0, realAmount:0, goodCode: tableList2[i].goodCode, shipmentOrderGoodsCode:0, orderCode:selOrder.code}
                    }     
            })

            // Проверка на повторный выбор элемента
            var check = true
            buf.map(function(element,i){
                if (element.goodCode == selectedRow.goodCode) check = false
            })
            if (check) buf.push(selectedRow)

            setBufferedTableList2(buf)
            setTableList1(buf)
        }
    }, [selectedItemId2]);


    const [goodsType, setGoodsType] = React.useState([])
    async function apiGetGoodsType() {
        var goods = await api.getGoodsType()
        setGoodsType(goods)
        // apiGetShipmentOrderGoodsByOrderId(goods)
    }

    async function apiGetShipmentOrderGoodsByOrderId(goodsTypeAnswer) {
        if (selOrder != '') {
            var tableListBuf = await api.getShipmentOrderGoodsByOrderId(selOrder, goodsTypeAnswer)
            setTableList(tableListBuf)
        } else {
            setTableList([])
        }
    }

    async function apiGetOrderGoods(){
        if (selOrder != undefined) {
            var result = await api.getOrderGoods(selOrder)
            if (selOrder.order_status == "sell")
                setOrderType("На продажу")
            else
                setOrderType("На поставку")
            setOrder(selOrder.text)
            setShipmentDeadline(selOrder.deadline.replace("-", ".").replace("-", "."))
            setOrderCost(selOrder.cost)
            setAddress(selOrder.address)
            setTableList2(result)
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

    async function apiUpdateShipmentOrder(value) {
        var result = await api.updateShipmentOrder(value)
        setTableList([])
        setTableList1([])
        setBufferedTableList2([])
        apiGetGoodsType()
    }

    function btn_send_2() {
        apiUpdateOrderStatus()
    }

    async function apiUpdateOrderStatus() {
        var order = ''
        orders.forEach(element => {
        if (element.selected == true) {
            order = element
        }
        });
        
        await api.updateOrderStatus(order)
        setOrders([])
        setTableList([])
        setTableList1([])
        setTableList2([])
        setBufferedTableList2([])
        apiGetOrders()
    }
        
//#endregion

    return (
        <>
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock>
                    <ListWithSearch item_list={orders} selItem={selOrder} func={setSelOrder} width={"200px"} height={"525px"}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Доставка товаров</div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:isCurrent?300:400+'px', display:'inline-table'}} >
                        <TableComponent height={245} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings} onSelect={setSelectedItemId}/>
                    </div>
                    <div style={{height:20+"px"}}/>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={250} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div style={{width:500+"px"}}>
                        <div class="header_text"><label class="header_text">{order}</label></div>
                        <div class="low_text bold">Крайний срок поставки:&nbsp;&nbsp;<label class="normal">{shipmentDeadline}</label></div>
                        <div class="low_text bold">Полная&nbsp;стоимость&nbsp;заказа:&nbsp;<label class="normal">{orderCost} ₽</label></div>
                        <div class="low_text bold">Адрес:&nbsp;<label class="normal">{address}</label></div>
                        <div class="low_text bold">Тип&nbsp;заказа:&nbsp;<label class="normal">{orderType}</label></div>
                        <div class="low_text bold">Товары&nbsp;в&nbsp;заказе:&nbsp;</div>
                    </div>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent height={425} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} tableSettings={tableSettings2} onSelect={setSelectedItemId2}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}