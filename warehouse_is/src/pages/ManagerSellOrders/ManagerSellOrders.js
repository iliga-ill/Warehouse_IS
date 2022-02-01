import React, { Component, Fragment } from "react";
import './ManagerSellOrders.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import TabHolder from "../../components/TabHolder/TabHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function ManagerSellOrders(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }
    
    //-------------------------------------------------------------------------Табы
    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    var [tabs, setTabs] = React.useState([
          {id:0, selected: true, title: "Текущие"},
          {id:1, selected: false, title: "Выполненные"}
      ])

      React.useEffect(() => {
        apiGetOrders()
      }, [reload]);

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
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',       title:'№',                         editingEnabled:false,     width:40    }, 
        {name: 'orderNumber',  title:'№ Заказа',                  editingEnabled:false,     width:130   }, 
        {name: 'shipmentDate', title:'Срок поставки',             editingEnabled:false,     width:120   }, 
        {name: 'orderCost',    title:'Стоимость заказа (руб)',    editingEnabled:false,     width:180   }, 
    ]) 
    var edit_column = {add:false, edit:false, delete:false, select:true}

    //const [tableList, setTableList] = React.useState([{number:1, orderNumber:"Заказ №0000001", shipmentDate:"2022-01-14", orderCost:1000}])
    const [tableList, setTableList] = React.useState([])
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    const [order, setOrder] = React.useState("")
    const [shipmentDate, setShipmentDate] = React.useState("")
    const [shipmentAddress, setShipmentAddress] = React.useState("")
    const [note, setNote] = React.useState("")
    const [orderCost, setOrderCost] = React.useState(0)

    const [selectedItemId, setSelectedItemId] = React.useState()

    React.useEffect(() => {
        if (tableList.length > 0) apiGetOrderGoods(selectedItemId)
    }, [selectedItemId]);


    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:true,     width:320   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:true,     width:70    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:120   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:true,     width:120   },
    ]) 
    var edit_column1 = {add:false, edit:false, delete:false}

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, cost:10, sumCost:10}])
    const [tableList1, setTableList1] = React.useState([])

    function apiGetOrders() {
        var xhr = new XMLHttpRequest();
        var status = 'complited'
        tabs.forEach(tab => {
            if (tab.selected) {
                if (tab.title == "Текущие") status = 'in progress'
                else status = 'complited'
            }
           
        });
        xhr.open('GET', host+'/orders'+'?'+`type=sell&status=${status}`, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            var answer = JSON.parse(this.response)
            var buffer = []
            answer.map(function( element, i) {
                buffer.push({number:i+1, orderNumber: element.name, shipmentDate: element.deadline, orderCost: element.cost})
                buffer[i].id = getId()
                buffer[i].code = element.id;
            });
            setTableList(buffer)
          }
        }
        
        xhr.send(null);
    }

    function apiGetOrderGoods(value) {
        var elm;
        tableList.map( function(element){
            if (element.id == value) elm = element
        })
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/orders_goods'+ "?" + `order_id=${elm.code}`, true);
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            var answer = JSON.parse(this.response)
            console.log("ManagerSellProducts apiGetOrderGoods answer: ")
            console.log(answer)
            var buffer = []
            answer.map(function( element, i) {
                buffer.push({number:i+1, goodsType: element.name, amount: element.amount, cost: element.price, sumCost: element.price})
                buffer[i].id = getId()
                buffer[i].code = element.code;
            });
            setTableList1(buffer)
          }
        }
        
        xhr.send(null);
    }

    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <>
            <TabHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">Заказы на продажу</div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={500} columns={tableHeaders} rows={tableList} onSelect={setSelectedItemId} setNewTableList={setTableList} editColumn={edit_column}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div style={{width:500+"px"}}>
                        <div class="header_text">Заказ:&nbsp;<label class="normal">{order}</label></div>
                        <div class="low_text bold">Дата&nbsp;доставки:&nbsp;<label class="normal">{shipmentDate}</label></div>
                        <div class="low_text bold">Адрес&nbsp;доставки:&nbsp;<label class="normal">{shipmentAddress}</label></div>
                        <div class="low_text bold">Примечание:&nbsp;</div><div class="low_text normal">{note}</div>
                        <div class="low_text bold">Полная&nbsp;стоимость&nbsp;заказа&nbsp;(руб):&nbsp;<label class="normal">{orderCost}</label></div>
                        <div class="low_text bold">Товары&nbsp;в&nbsp;заказе:</div>
                    </div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={390} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1}/>
                    </div>
                   
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}