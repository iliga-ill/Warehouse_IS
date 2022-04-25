import React, { Component, Fragment } from "react";
import './StorekeeperInventory.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
import ConfirmIcon from '../../images/ConfirmIcon.svg'
import { Api } from "../../api/storekeeperApi"

var api = new Api()
const styles = {

}

export default function StorekeeperInventory(props){

    var id=0
    function getId(){return id++}


    //-------------------------------------------------------------------------query
    const [zones, setZones] = React.useState([])
    const [racks, setRacks] = React.useState([])
    const [shelfs, setShelfs] = React.useState([])
    const [goodsType, setGoodsType] = React.useState([])
    const [shelfsSpace, setShelfsSpace] = React.useState([])

    if (zones.toString()=="") {
        async function startGettingAnswers() {
            var zonesArray = await api.getZones()
            setZones(zonesArray)
            var racksArray = await api.getRacks(zonesArray)
            setRacks(racksArray)
            var shelfsArray = await api.getShelfs(racksArray)
            setShelfs(shelfsArray)
            var goodsTypeArray = await api.getGoodsType()
            setGoodsType(goodsTypeArray)
            var shelfSpaceArray = await api.getShelfSpaces(shelfsArray, goodsTypeArray)
            setShelfsSpace(shelfSpaceArray)
        }
        startGettingAnswers()
    }

    //-------------------------------------------------------------------------query end
    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',                    title:'№',                      editingEnabled:false,     width:60 }, 
        {name: 'zone',                      title:'Зона',                   editingEnabled:false,     width:90 },
        {name: 'rack',                      title:'Стеллаж',                editingEnabled:false,     width:120},
        {name: 'shelf',                     title:'Полка',                  editingEnabled:false,     width:90 },
        {name: 'amount',                    title:'Кол-во',                 editingEnabled:false,     width:70 },
        {name: 'inventorysationStatus',     title:'Статус',                 editingEnabled:false,     width:180},
    ]) 
    var  tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        filter: true, 
        select:true,
        defaultSelection:true,
    }

    const [tableList, setTableList] = React.useState([])
    const [selectedItemId, setSelectedItemId] = React.useState()

    if (tableList.toString()=="" && shelfsSpace.toString()!=""){
        console.log("shelfsSpace")
        console.log(shelfsSpace)
        var buf=[]
        var counter = 0
        shelfsSpace.map(function(item, i){
            if (item.shelf_space != null) {
                var amount = 0
                var inventorysatedAmount = 0
                item.shelf_space.map(function(item1, j){
                    amount+=item1.amount
                    if (item1.status!='Не инвентаризирован') inventorysatedAmount++
                    // buf.push({id:counter, number:++counter, shelfSpaceCode:item1.shelfCode, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:item1.good, amount:item1.amount, inventaryzationStatus:item1.status})
                })
                var inventorysationStatus = inventorysatedAmount==amount?"Проинвентаризировано":inventorysatedAmount!=0?"Частично проверено":"Не проверено"
                buf.push({id:counter, number:++counter, zone:item.zone_num, rack:item.rack_num, shelf:item.name, amount:amount, inventorysationStatus:inventorysationStatus})
            } else {
                    //buf.push({id:counter, number:++counter, shelfSpaceCode:item.shelfCode, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:" ", amount:0, inventaryzationStatus:"Пусто"}) 
            }
        })
        setTableList(buf)
        setSelectedItemId(buf[0])
    }
    //-------------------------------------стол 1 конец
    async function apiUpdateOrderStatus(status, code, i) {
        var buf = await api.updateOrderStatus2(status, code, i, shelfsSpace, tableList1)
        setTableList(buf)
    }
    //-------------------------------------------------------------------------Блок 1 конец
    //-------------------------------------------------------------------------Блок 2
    const [shelf, setShelf] = React.useState("Зона - Стеллаж - Полка -")
    const [liftingCapacity, setLiftingCapacity] = React.useState("-")

    const [dropdownList1, setDropdownList] = React.useState([
        {menuItem:""},
        {menuItem:"Не инвентаризирован"},
        {menuItem:"Проинвентаризирован"},
        {menuItem:"Потерян"},
        {menuItem:"Найден"},
        {menuItem:"Пусто"},
    ])

    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',                    title:'№',                      editingEnabled:false,     width:40    }, 
        {name: 'goodsType',                 title:'Наименование',           editingEnabled:false,     width:320   }, 
        {name: 'weight',                    title:'Вес',                    editingEnabled:false,     width:60    },
        {name: 'inventaryzationStatus',     title:'Статус инвентаризации',  editingEnabled:true,      width:180, dropdownList: dropdownList1    },
    ]) 
    var  tableSettings1 = {
        add:false, 
        edit:true, 
        delete:false
    }

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, cost:10, sumCost:10}])
    const [tableList1, setTableList1] = React.useState([])

    React.useEffect(() => {
        var buf=[]
        var buf1=[]
        var counter = 0
        shelfsSpace.map(function(item, i){
            if (i == selectedItemId.id){
                setShelf(`${item.zone_num} ${item.rack_num} ${item.name}`)
                setLiftingCapacity(`${item.capacity} кг`)
                item.shelf_space.map(function(item1, j){
                    buf.push({id:counter, number:++counter, goodsType:item1.good, weight:item1.weight, inventaryzationStatus:item1.status, shelfSpaceCode:item1.shelfCode})
                    // buf.push({id:counter, number:++counter, shelfSpaceCode:item1.shelfCode, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:item1.good, amount:item1.amount, inventaryzationStatus:item1.status})
                })
            }
        })
        setTableList1(buf)

    }, [selectedItemId]);

    function btn_send_1() {
        if (selectedItemId!=undefined){
            async function updateOrders(shelfsSpace, tableList1) {
                var res = await api.updateOrderStatus("POST", shelfsSpace, tableList1)
                setTableList(res)
            }
            updateOrders(shelfsSpace, tableList1)
        }
    }

    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Инвентаризация</div>
                <div style={{width:400+'px', display:'inline-table'}} >
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings} onSelect={setSelectedItemId}/>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div style={{width:500+"px"}}>
                    <div class="header_text"><label class="header_text">{shelf}</label></div>
                    <div class="low_text bold">Грузоподьемность:&nbsp;&nbsp;<label class="normal">{liftingCapacity}</label></div>
                </div>
                <div style={{width:470+'px', display:'inline-table'}} >
                    <TableComponent height={390} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} tableSettings={tableSettings1}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}