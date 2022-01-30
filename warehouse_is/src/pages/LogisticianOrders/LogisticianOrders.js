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
   
    var list_with_search_width = "200px"
    var list_with_search_height = "335px"

    const [orders, setOrders] = React.useState([{id:0, text: "Ничего не найдено", selected: true, code: 0}])
    React.useEffect(() => {
        //if (goodsType != []) apiGetGoodsByShipmentOrder()
    }, [orders]);
    
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
    var edit_column = {add:true, edit:true, delete:true}

    const [tableList, setTableList] = React.useState([{number:1, shipmentNumber:"Доставка №0000001", shipmentDate:"2022-01-14", shipmentCost:1000, shipmentStatus:"Ожидается"}])
        
    //-------------------------------------стол 1 конец
    //-------------------------------------стол 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',          title:'№',                     editingEnabled:false,   width:40    }, 
        {name: 'goodsType',       title:'Товар',                 editingEnabled:true,    width:140   }, 
        {name: 'weight',          title:'Вес ед продукции (кг)', editingEnabled:true,    width:159   }, 
        {name: 'expectingAmount', title:'Ожидаемое количество',  editingEnabled:true,    width:175   }, 
        {name: 'realAmount',      title:'Пришедшее кол-во',      editingEnabled:false,   width:144   }, 
        
    ]) 
    var edit_column1 = {add:true, edit:true, delete:true}

    const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"bb", weight:100, expectingAmount:10, realAmount:10}])
        
    //-------------------------------------стол 2 конец
    
    function btn_send_1() {
        
    }
    //-------------------------------------------------------------------------Блок 2 конец
    

    //-------------------------------------------------------------------------Блок 3
    const [order, setOrder] = React.useState("")
    const [shipmentDeadline, setShipmentDeadline] = React.useState("")
    const [orderCost, setOrderCost] = React.useState("")
    const [provider, setProvider] = React.useState("")

    //-------------------------------------стол 3
    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                      editingEnabled:false,   width:40    }, 
        {name: 'goodsType',         title:'Товар',                  editingEnabled:false,   width:140   }, 
        {name: 'goodsCost',         title:'Цена продукции',         editingEnabled:false,   width:124   }, 
        {name: 'shipmentProgress',  title:'Прогресс доставки',      editingEnabled:false,   width:142   }, 
        {name: 'weight',            title:'Вес ед продукции (кг)',  editingEnabled:false,   width:159   }, 
    ])
    var edit_column2 = {add:false, edit:false, delete:false}

    const [tableList2, setTableList2] = React.useState([{number:1, goodsType:"bb", goodsCost:100, shipmentProgress:"10/100", weight:10}])
    //-------------------------------------стол 3 конец
    //-------------------------------------------------------------------------Блок 3 конец
//#endregion

    return (
        <>
            <TabHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage Id={getId()}>
                <FlexibleBlock>
                    <ListWithSearch Id={getId()} item_list={orders} func={setOrders} width={list_with_search_width} height={list_with_search_height}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Доставка товаров</div>
                    <div style={{height:20+"px"}} />
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                    </div>
                    <div style={{height:20+"px"}} />
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1}/>
                    </div>
                    <div style={{height:20+"px"}} />
                    <div class="place_holder"/><button class="bt_send" onClick={btn_send_1}>Принять</button>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text "><div>Заказ:&nbsp;{order}</div></div>
                    <div class="low_text "><div>Крайний срок поставки:&nbsp;{shipmentDeadline}</div></div>
                    <div class="low_text "><div>Полная&nbsp;стоимость&nbsp;заказа:&nbsp;{orderCost}</div></div>
                    <div class="low_text ">Поставщик:&nbsp;</div><div class="low_text ">{provider}</div>
                    <div style={{width:300+'px', display:'inline-table'}} >
                        <TableComponent columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} editColumn={edit_column2}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}