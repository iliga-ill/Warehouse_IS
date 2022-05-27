import React, { Component, Fragment } from "react";
import './AccountantAccounts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import InputFile from "../../components/InputFile/InputFile";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function AccountantAccounts(props){

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
        {name: 'accountNumber', title:'№ Заказа',       editingEnabled:false,     width:130   }, 
        {name: 'accountDate',   title:'№ Накладной',    editingEnabled:false,     width:120   }, 
        {name: 'accuontCost',   title:'Тип накладной',  editingEnabled:false,     width:130   }, 
        {name: 'accountStatus', title:'Дата создания',  editingEnabled:false,     width:140   }, 
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
    const [requestedBy, setRequestedBy] = React.useState("/--/")
    const [billCost, setBillCost] = React.useState("/--/")
    const [requisites, setRequisites] = React.useState("/--/")
    const [documents, setDocuments] = React.useState("/--/")
    const [note, setNote] = React.useState("/--/")
    const [accountStatus, setAccountStatus] = React.useState([
        {id: 0, value: "Счет выставлен", selected: true},
        {id: 1, value: "Счет оплачен", selected: false},
        {id: 2, value: "Оплата отменена", selected: false},
    ])
    const [paymentCheque, setPaymentCheque] = React.useState("/--/")

    function btn_save() {

    }
    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <>
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock>
                    <div class="header_text">Счета на оплату</div>
                    <div style={{width:470+'px', display:'inline-table'}} >
                        <TableComponent height={611} columns={tableHeaders} rows={tableList}  onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div style={{width:500+"px"}}>
                        <div class="header_text"><label class="header_text">{order}</label></div>
                        <div class="low_text bold">От кого:&nbsp;&nbsp;<label class="normal">{requestedBy}</label></div>
                        <div class="low_text bold">Cтоимость:&nbsp;<label class="normal">{billCost}</label></div>
                        <div class="low_text bold">Реквизиты:</div><label class="normal low_text text_shift">{requisites}</label>
                        <div class="low_text bold">Документы:</div><label class="normal low_text text_shift">{documents}</label>
                        <div class="low_text bold">Примечание:</div><label class="normal low_text text_shift">{note}</label>
                        <div class="low_text row_with_item_wide"><div class="bold">Статус&nbsp;оплаты:&nbsp;</div><ExpandListInput Id={getId()} defValue={accountStatus[0].value} list={accountStatus} func={setAccountStatus}/></div> 
                        <div class="low_text"><InputFile Id={getId()} func={setDocuments}/></div>
                        <div></div>
                        <div class="place_holder"/><button class="bt_send" onClick={btn_save}>Сохранить</button>
                    </div>
                </FlexibleBlock> 
            </FlexibleBlocksPage>
        </>
    )
}