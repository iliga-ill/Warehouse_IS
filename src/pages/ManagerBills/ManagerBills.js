import React, { Component, Fragment } from "react";
import './ManagerBills.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import InputFile from "../../components/InputFile/InputFile";
import SwitchHolder from "../../components/TabHolders/SwitchHolder/SwitchHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function ManagerBills(props){

    var id=0
    function getId(){return id++}
    //-------------------------------------------------------------------------Табы
    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    var [tabs, setTabs] = React.useState([
          {id:0, selected: true, title: "Новые счета"},
          {id:1, selected: false, title: "Закрытые счета"}
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
    const [accountStatus, setAccountStatus] = React.useState("/--/")
    const [paymentCheque, setPaymentCheque] = React.useState("/--/")

    function btn_save() {

    }
    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <>
            <SwitchHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage>
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
                        <InputText styles="row_with_item_wide bold" Id={getId()} label="Cтоимость:&nbsp;" defValue={billCost} placeholder="стоимость заказа" set={setBillCost}/> 
                        <InputText styles="row_with_item_wide bold" Id={getId()} label="Реквизиты:&nbsp;" defValue={requisites} placeholder="реквизиты" set={setRequisites}/> 
                        <div class="low_text bold">Документы:</div><label class="normal low_text text_shift">{documents}</label>
                        <InputTextArea styles = "bold" Id={getId()} label="Примечание:" placeholder="адрес" set={setNote} defValue={note}/>
                        <div class="low_text bold">Статус&nbsp;оплаты:&nbsp;<label class="normal">{accountStatus}</label></div>
                        <div class="low_text"><InputFile Id={getId()} func={setDocuments}/></div>
                        <div></div>
                        <div class="place_holder"/><button class="bt_send" onClick={btn_save}>Отправить</button>
                    </div>
                </FlexibleBlock> 
            </FlexibleBlocksPage>
        </>
    )
}