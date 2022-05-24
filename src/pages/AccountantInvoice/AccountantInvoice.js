import React, { Component, Fragment } from "react";
import './AccountantInvoice.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import FlexibleBlockDouble from "../../components/FlexibleBlocks/FlexibleBlockDouble/FlexibleBlockDouble";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function AccountantInvoice(props){

    var id=0
    function getId(){return id++}

    const [isCurrent, setIsCurrent] = React.useState(true)
    if (isCurrent!=props.isCurrent) setIsCurrent(props.isCurrent)
    React.useEffect(() => {
        // apiGetOrders()
    }, [isCurrent]);

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',        title:'№',              editingEnabled:false,     width:40    }, 
        {name: 'orderNumber',   title:'№ Заказа',       editingEnabled:false,     width:130   }, 
        {name: 'shipmentDate',  title:'№ Накладной',    editingEnabled:false,     width:120   }, 
        {name: 'orderCost',     title:'Тип накладной',  editingEnabled:false,     width:180   }, 
        {name: 'amount',        title:'Дата создания',  editingEnabled:false,     width:100   }, 
        {name: 'delay',         title:'Статус',         editingEnabled:false,     width:140   }, 
    ]) 
    var tableSettings = {add:false, edit:false, delete:false, select:true}

    const [tableList, setTableList] = React.useState([])

    const [selectedItemId, setSelectedItemId] = React.useState()

    React.useEffect(() => {
        // if (tableList.length > 0) apiGetOrderGoods(selectedItemId)
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
    

    //-------------------------------------------------------------------------Блок 2 конец
    //-------------------------------------------------------------------------Блок 3 начала
    const [invoice, setInvoice] = React.useState("Накладная №")
    const [invoiceDocument, setInvoiceDocument] = React.useState("")
    const [invoiceDate, setInvoiceDate] = React.useState("")
    const [invoiceCost, setInvoiceCost] = React.useState(0)


    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,     width:40    }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,     width:300   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:false,     width:70    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:120, isCurrency:true   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:false,     width:120, isCurrency:true   },
    ]) 
        
    var tableSettings2 = {add:false, edit:false, delete:false}

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, price:10}])
    const [tableList2, setTableList2] = React.useState([])
    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <>
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock>
                    <div class="header_text">Список накладных</div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={611} columns={tableHeaders} rows={tableList}  onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlockDouble 
                    block1={
                        <>
                            <div style={{width:500+"px"}}>
                                <div class="header_text"><label class="header_text">{order}</label></div>
                                <div class="low_text bold">Крайний срок поставки:&nbsp;&nbsp;<label class="normal">{shipmentDeadline}</label></div>
                                <div class="low_text bold">Cтоимость&nbsp;заказа:&nbsp;<label class="normal">{orderCost}</label></div>
                                <div class="low_text bold">Адрес:&nbsp;<label class="normal">{address}</label></div>
                                <div class="low_text bold">Товары&nbsp;в&nbsp;заказе:&nbsp;</div>
                            </div>
                            <div style={{width:470+'px', display:'inline-table'}} >
                                <TableComponent height={200} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1}/>
                            </div>
                        </>
                    } 
                    block2={
                        <>
                            <div style={{width:500+"px"}}>
                                <div class="header_text"><label class="header_text">{invoice}</label></div>
                                <div class="low_text bold">Документ<label class="normal">{invoiceDocument}</label></div>
                                <div class="low_text bold">Дата&nbsp;приема:&nbsp;<label class="normal">{invoiceDate}</label></div>
                                <div class="low_text bold">Стоимость&nbsp;накладной:&nbsp;<label class="normal">{invoiceCost}</label></div>
                            </div>
                            <div style={{width:470+'px', display:'inline-table'}} >
                                <TableComponent height={200} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} tableSettings={tableSettings2}/>
                            </div>
                        </>
                    }
                />
            </FlexibleBlocksPage>
        </>
    )
}