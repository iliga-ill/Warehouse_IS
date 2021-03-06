import React, { Component, Fragment } from "react";
import './ManagerOrderCreation.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/managerApi"

var api = new Api()
const styles = {

  }

export default function ManagerOrderCreation(props){
    let newDate = new Date()

    var id=0
    function getId(){return id++}

    //-------------------------------------------------------------------------query
    async function apiGetGoodsTypeCats() {
        var buffer = await api.getGoodsTypeCats()
        setTableList1(buffer)
    }

    async function apiGetShipmentOrders(tableHeadersBuf) {
        var tableHeadersBuf2 = await api.getShipmentOrders(tableHeadersBuf)
        setTableList(tableHeadersBuf2)
    }
    //-------------------------------------------------------------------------query end
    //-------------------------------------------------------------------------Блок 1

    let [orderTypeList, setOrderTypeList]  = React.useState([
        {value: "На продажу"},
        {value: "На поставку"},
    ])
    let [orderTypeListValue, setOrderTypeListValue]  = React.useState(orderTypeList[0].value)

    const [orderNumber, setOrderNumber] = React.useState("")
    const [shipmentDate, setShipmentDate] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1<10?`0${newDate.getMonth()+1}`:newDate.getMonth()+1}-${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    const [shipmentAddress, setShipmentAddress] = React.useState("")
    const [sumCost, setSumCost] = React.useState(0)
    const [note, setNote] = React.useState("")

    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,     width:120   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:true,     width:70,  mask:/^[1-9][0-9]{0,10}$/i, maskExample:"быть числом больше единицы"    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:120,  mask:/^[1-9][0-9]{0,10}$/i, maskExample:"быть числом больше единицы", isCurrency:true   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:false,     width:120, totalCount:{type:['sum'], expantionAlign: 'right'}, isCurrency:true   },
    ]) 
    var tableSettings = {
        editColumnWidth: 100, 
        add:false, 
        edit:false, 
        delete:true,
        cell:true
    }

    const [tableList, setTableList] = React.useState([])
    React.useEffect(() => {
        var order_cost = 0
        tableList.map(function(good, i){
                if (!isNaN(parseInt(good.sumCost)))
                    order_cost = order_cost + good.sumCost
            })
        setSumCost(order_cost)
    }, [tableList]);
    

    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40, dropdownList:[]   }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:190, dropdownList:[]   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:168, dropdownList:[]   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:310, dropdownList:[]   }, 
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:135, dropdownList:[]   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:125, dropdownList:[], isCurrency:true   },
        {name: 'goodsLimit',        title:'Лимит товара',       editingEnabled:false,     width:120, dropdownList:[]   },
    ]) 
    var tableSettings1 = {add:false, edit:false, delete:false, select:true, filter: true}
    const [selectedItemId1, setSelectedItemId1] = React.useState()

    const [tableList1, setTableList1] = React.useState([])

    const [bufferedTableList, setBufferedTableList] = React.useState([])
    
    if (tableList1.toString()=="")
        apiGetGoodsTypeCats()

    React.useEffect(() => {
        if (tableList1.toString()!="" && selectedItemId1 != undefined) {
            var buf = []
            var selectedRow;

            bufferedTableList.map(function(element, i) {
                tableList.map(function(element2, j){
                    if (element.goodCode == element2.goodCode) buf.push(element2)
                })
            })
            console.log(bufferedTableList)
            console.log(tableList)
            // buf2.map(function(element, i) {
            //     buf.push(element)
            // })

            if (tableList == "")
                selectedRow = {id: 0, number: 1, goodsType: selectedItemId1.goodsType, amount: 1, cost: parseFloat(selectedItemId1.cost), sumCost: parseFloat(selectedItemId1.cost), goodCode: selectedItemId1.code}
            else 
                selectedRow = {id: tableList[tableList.length-1].id+1, number: tableList[tableList.length-1].number+1, goodsType: selectedItemId1.goodsType, amount: 1, cost: parseFloat(selectedItemId1.cost), sumCost: parseFloat(selectedItemId1.cost), goodCode: selectedItemId1.code}
            var check = true
            buf.map(function(element,i){
                if (element.goodCode == selectedRow.goodCode) check = false
            })
            if (check) buf.push(selectedRow)
            
            setBufferedTableList(buf)
            setTableList(buf)

        }
    }, [selectedItemId1]);

       
    
    //-------------------------------------------------------------------------Блок 2 конец

    function btn_send_1() {
        if (tableList.length == 0) {
            alert('Нельзя создать заказ без товаров')
        }
        else {
            var orderType = orderTypeListValue
            var accounts = tableList
            var check=true

            console.log("shipmentDate")
            console.log(shipmentDate)
            if (check && (shipmentDate == ""|| shipmentDate == null)){
                check=false
                alert("Ошибка, дата доставки не может быть пустой");
            }
            tableList.map(item=>{
                if (check && (item.cost == "" || item.cost == 0 || item.cost == null)){
                    check=false
                    alert("Ошибка, цена товара не может быть пустой");
                }
            })
            
            if (check) {
                var order_cost = 0

                tableList.map(function(good, i){
                    order_cost = order_cost + good.amount*parseInt(good.cost)
                })

                var result_obj = [{cost: order_cost, order_status: orderType, deadline: shipmentDate, address: shipmentAddress, note: note, order_goods:tableList, name:"Заказ №" + orderNumber}]
                // console.log(orderType)
                // console.log(shipmentDate)
                // console.log(shipmentAddress)
                // console.log(note)
                // console.log(tableList)
                console.log(result_obj)
                apiPostNewOrderAndGoods(result_obj)
            }
          
            
        }
    }

    async function apiPostNewOrderAndGoods(value) {
        var response = await api.postNewOrderAndGoods(value)
        setOrderTypeListValue("На продажу")
        // setOrderNumber("")
        // setShipmentDate("")
        // setShipmentAddress("")
        // setSumCost(200)
        // setNote("")
        setTableList([])
        // reloadPage())
    }

    let tabsHeight = 102
    return (
        <FlexibleBlocksPage marginTop={tabsHeight}>
            <FlexibleBlock>
                <div class="header_text">Создание заказа</div>
                <div class="low_text row_with_item_wide"><div>Тип&nbsp;заказа&nbsp;</div><ExpandListInput defValue={orderTypeList[0]} list={orderTypeList} func={setOrderTypeListValue}/></div> 
                <InputText styles = "row_with_item_wide" label="Заказ&nbsp;№&nbsp;" placeholder="номер заказа" defValue={"0"} set={setOrderNumber} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;доставки&nbsp;</div><InputDate Id={getId()} defValue={shipmentDate} func={setShipmentDate}/></div>
                <InputTextArea styles = "" label="Адрес доставки:" placeholder="адрес" set={setShipmentAddress} defValue={shipmentAddress} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/>
                <InputTextArea styles = "" label="Примечание:" placeholder="примечание" set={setNote} defValue={note}/>
                <div class="header_text">Заказываемые товары:</div>
                <div id="table1" style={{width:300+'px', display:'inline-table'}}>
                    <TableComponent height={document.documentElement.clientHeight - tabsHeight - 320} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings}/>
                </div>
                <div></div>
                <div class="place_holder_ManagerOrderCreation"/><button class="bt_send_ManagerOrderCreation" onClick={btn_send_1}>Создать&nbsp;заказ</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Виды товаров:</div>
                <div style={{width:500+'px', display:'inline-table'}} >
                    <TableComponent height={document.documentElement.clientHeight - tabsHeight - 71} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1} onSelect={setSelectedItemId1}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}