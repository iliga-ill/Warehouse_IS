import React, { Component, Fragment } from "react";
import './ManagerShipmentOrders.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/managerApi"

var api = new Api()
const styles = {

}
 
export default function ManagerShipmentOrders(props){

    var id=0
    function getId(){return id++}

    const [isCurrent, setIsCurrent] = React.useState(true)
    if (isCurrent!=props.isCurrent) setIsCurrent(props.isCurrent)
    React.useEffect(() => {
        apiGetOrders()
    }, [isCurrent]);
    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',        title:'№',                      editingEnabled:false,     width:40    }, 
        {name: 'orderNumber',   title:'№ Заказа',               editingEnabled:false,     width:130   }, 
        {name: 'shipmentDate',  title:'Срок поставки',          editingEnabled:false,     width:120   }, 
        {name: 'orderCost',     title:'Стоимость заказа',       editingEnabled:false,     width:150, isCurrency:true   }, 
        {name: 'amount',        title:'Количество',             editingEnabled:false,     width:100   }, 
        {name: 'delay',         title:'Опоздание (дней)',       editingEnabled:false,     width:140   }, 
    ]) 
    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        select:true,
        defaultSelection:true,
    }

    // const [tableList, setTableList] = React.useState([{number:1, orderNumber:"Заказ №0000001", shipmentDate:"2022-01-14", orderCost:1000, amount:"10", delay:"10"}])
    const [tableList, setTableList] = React.useState([])

    const [selectedItemId, setSelectedItemId] = React.useState()

    React.useEffect(() => {
        if (tableList.length > 0) apiGetOrderGoods(selectedItemId)
    }, [selectedItemId]);
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    const [order, setOrder] = React.useState("Заказ №")
    const [address, setShipmentAddress] = React.useState("")
    const [shipmentDeadline, setShipmentDeadline] = React.useState("")
    const [orderCost, setOrderCost] = React.useState(0)


    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,     width:40    }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,     width:300   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:false,     width:70    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:120, isCurrency:true   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:false,     width:120, isCurrency:true   },
    ]) 
        
    var tableSettings1 = {add:false, edit:false, delete:false}

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, price:10}])
    const [tableList1, setTableList1] = React.useState([])
    
    async function apiGetOrders() {
        var buffer = await api.getOrders('purchase', isCurrent)
        setTableList(buffer)
        setSelectedItemId(buffer[0])
    }

    async function apiGetOrderGoods(value) {
        var buffer = await api.getOrderGoods(value)
        setTableList1(buffer)
        setOrder(value.orderNumber)
        setShipmentAddress(value.address)
        setShipmentDeadline(value.deadline.split("T")[0].replace("-", ".").replace("-", "."))
        setOrderCost(value.orderCost)
    }

    function btn_send_2(){

    }

    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">Заказы на продажу</div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={525} columns={tableHeaders} rows={tableList}  onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div style={{width:500+"px"}}>
                        <div class="header_text"><label class="header_text">{order}</label></div>
                        <div class="low_text bold">Крайний срок поставки:&nbsp;&nbsp;<label class="normal">{shipmentDeadline}</label></div>
                        <div class="low_text bold">Полная&nbsp;стоимость&nbsp;заказа:&nbsp;<label class="normal">{orderCost} ₽</label></div>
                        <div class="low_text bold">Адрес:&nbsp;<label class="normal">{address}</label></div>
                        <div class="low_text bold">Товары&nbsp;в&nbsp;заказе:&nbsp;</div>
                    </div>
                    <div style={{width:350+'px', display:'inline-table'}} >
                        <TableComponent height={390} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1}/>
                    </div>
                    {isCurrent
                    &&<>
                    <div style={{height:20+"px"}}/>   
                    <div class="place_holder_LogisticianOrders"/><button class="bt_send_LogisticianOrders" onClick={btn_send_2}>Завершить заказ</button>
                    </>
                    }
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}