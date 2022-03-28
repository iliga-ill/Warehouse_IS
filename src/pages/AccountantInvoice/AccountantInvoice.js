import React, { Component, Fragment } from "react";
import './AccountantInvoice.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import FlexibleBlockDouble from "../../components/FlexibleBlocks/FlexibleBlockDouble/FlexibleBlockDouble";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import SwitchHolder from "../../components/TabHolders/SwitchHolder/SwitchHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function AccountantInvoice(props){

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
        {name: 'number',        title:'№',              editingEnabled:false,     width:40    }, 
        {name: 'orderNumber',   title:'№ Заказа',       editingEnabled:false,     width:130   }, 
        {name: 'shipmentDate',  title:'№ Накладной',    editingEnabled:false,     width:120   }, 
        {name: 'orderCost',     title:'Тип накладной',  editingEnabled:false,     width:180   }, 
        {name: 'amount',        title:'Дата создания',  editingEnabled:false,     width:100   }, 
        {name: 'delay',         title:'Статус',         editingEnabled:false,     width:140   }, 
    ]) 
    var edit_column = {add:false, edit:false, delete:false, select:true}

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
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:120   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:false,     width:120   },
    ]) 
        
    var edit_column1 = {add:false, edit:false, delete:false}

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
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:120   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:false,     width:120   },
    ]) 
        
    var edit_column2 = {add:false, edit:false, delete:false}

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, price:10}])
    const [tableList2, setTableList2] = React.useState([])
    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <>
            <SwitchHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">Заказы на продажу</div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={611} columns={tableHeaders} rows={tableList}  onSelect={setSelectedItemId} setNewTableList={setTableList} editColumn={edit_column}/>
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
                                <TableComponent height={200} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1}/>
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
                                <TableComponent height={200} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} editColumn={edit_column2}/>
                            </div>
                        </>
                    }
                />
            </FlexibleBlocksPage>
        </>
    )
}