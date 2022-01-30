import React, { Component, Fragment } from "react";
import './ManagerOrderCreation.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function ManagerOrderCreation(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }


    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:true,     width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:true,     width:160   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:true,     width:120   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:true,     width:70    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:120   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:true,     width:120   },
    ]) 
    var edit_column = {add:true, edit:true, delete:true}

    const [tableList, setTableList] = React.useState([{number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", amount:10, cost:10, sumCost:10}])
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    const [orderTypeList, setOrderTypeList] = React.useState([
            {id: 0, value: "На продажу", selected: true},
            {id: 1, value: "На поставку", selected: false},
    ])
    const [shipmentDate, setShipmentDate] = React.useState("")
    const [shipmentAddress, setShipmentAddress] = React.useState("")
    const [sumCost, setSumCost] = React.useState(200)
    const [note, setNote] = React.useState("")

    function btn_send_1() {
        console.log(orderTypeList)
        console.log(shipmentDate)
        console.log(shipmentAddress)
        console.log(note)
    }

    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Создание заказа</div>
                <div class="header_text"></div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Характеристики заказа</div>
                <div class="low_text row_with_item_wide"><div>Тип&nbsp;заказа&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={orderTypeList[0].value} list={orderTypeList} func={setOrderTypeList}  i={0} j={0}/></div> 
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;доставки&nbsp;</div><InputDate Id={getId()} defValue={shipmentDate} func={setShipmentDate}/></div>
                <div class="low_text row_with_item_wide"><div>Итоговая&nbsp;цена:&nbsp;{sumCost}&nbsp;руб</div></div>
                <InputTextArea styles = "" Id={getId()} label="Адрес доставки" width={100} placeholder="адрес" set={setShipmentAddress} defValue={shipmentAddress}/>
                <InputTextArea styles = "" Id={getId()} label="Примечание" width={100} placeholder="примечание" set={setNote} defValue={note}/>
                <div class="place_holder_ManagerOrderCreation"/><button class="bt_send_ManagerOrderCreation" onClick={btn_send_1}>Создать&nbsp;заказ</button>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}