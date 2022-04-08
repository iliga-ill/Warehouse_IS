import React, { Component, Fragment } from "react";
import './StorekeeperInventory.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function StorekeeperInventory(props){

    var id=0
    function getId(){return id++}


    //-------------------------------------------------------------------------query
    const [zones, setZones] = React.useState([])
    function apiGetZones() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/zones', true);
        //console.log("StorekeeperAllocation apiGetZones was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                //console.log("StorekeeperAllocation apiGetZones answer: ")
                //console.log(answer)
                var buf = []
                answer.map( function(item, i) {
                    buf[i] = {name: item.name}
                })
                setZones(buf)
                apiGetRacks(buf)
            }
            
        }
        xhr.send(null);
    }
    
    if (zones.toString()=="")
    apiGetZones()
    
    const [racks, setRacks] = React.useState([])
    function apiGetRacks(zonesAnswer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/racks', true);
        console.log("StorekeeperAllocation apiGetRacks was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetRacks answer: ")
                console.log(answer)
                var buf = []
                answer.map( function(item, i) {
                    buf[i] = {code: item.code, name: item.name, racks_num: item.racks_num, zone_num: zonesAnswer[item.zone_num-1].name}
                })
                setRacks(buf)
                apiGetShelfs(buf)
            }
        }
        xhr.send(null);
    }

    const [shelfs, setShelfs] = React.useState([])
    function apiGetShelfs(racksAnswer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/shelfs', true);
        console.log("StorekeeperAllocation apiGetShelfs was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetShelfs answer: ")
                console.log(answer)
                var buf = []
                answer.map( function(item, i) {
                    buf[i] = {shelfCode: item.code, name: item.name, shelfCode: item.code, rack_num: racksAnswer[item.rack_num-1].name, zone_num: racksAnswer[item.rack_num-1].zone_num, capacity: item.capacity, shelf_space: item.shelf_space}
                })
                setShelfs(buf)
                apiGetGoodsType(buf)
                
            }
        }
        xhr.send(null);
    }

    const [goodsType, setGoodsType] = React.useState([])
    function apiGetGoodsType(shelfsAnswer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_type', true);
        console.log("StorekeeperAllocation apiGetGoodsType was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (this.response != "") {
                    console.log("StorekeeperAllocation apiGetGoodsType answer: ")
                    console.log(this.response)
                    var answer = JSON.parse(this.response)
                    var buf = []
                    answer.map( function(item, i) {
                        buf[i] = item
                    })
                    setGoodsType(buf)
                    apiGetShelfsSpace(shelfsAnswer, buf)
                }
            }
        }
        xhr.send(null);
    }

    const [shelfsSpace, setShelfsSpace] = React.useState([])
    function apiGetShelfsSpace(shelfsAnswer, goodsType) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/shelf_space', true);
        console.log("StorekeeperAllocation apiGetShelfsSpace was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetShelfsSpace answer: ")
                console.log(answer)
                var buf = shelfsAnswer

                answer.map( function(item, i) {
                    shelfsAnswer.map(function(item1,j){
                        if (item1.shelfCode == item.shelf_num) {
                            goodsType.map(item2=>{
                                if (item2.code == item.good){
                                    if (item1.shelf_space == null) buf[j].shelf_space = []
                                    buf[j].shelf_space.push({good:item2.name, goodCode:item.good, amount:item.amount, weight: item2.weight, status:item.status, shelfCode:item.code})
                                }
                            })
                        }
                    })
                })
                console.log("StorekeeperAllocation apiGetShelfsSpace changed answer: ")
                console.log(buf)
                setShelfsSpace(buf)
            }
        }
        xhr.send(null);
    }

    
    //-------------------------------------------------------------------------query end
    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',                    title:'№',                      editingEnabled:false,     width:60,  dropdownList:[]                }, 
        {name: 'zone',                      title:'Зона',                   editingEnabled:false,     width:90,  dropdownList:[]                },
        {name: 'rack',                      title:'Стеллаж',                editingEnabled:false,     width:120,  dropdownList:[]               },
        {name: 'shelf',                     title:'Полка',                  editingEnabled:false,     width:90,  dropdownList:[]                },
        {name: 'amount',                    title:'Кол-во',         editingEnabled:false,     width:70, dropdownList:[]                }
    ]) 
    var edit_column = {add:false, edit:false, delete:false, filter: true, select:true}

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
                item.shelf_space.map(function(item1, j){
                    amount+=item1.amount
                    // buf.push({id:counter, number:++counter, shelfSpaceCode:item1.shelfCode, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:item1.good, amount:item1.amount, inventaryzationStatus:item1.status})
                })
                buf.push({id:counter, number:++counter, zone:item.zone_num, rack:item.rack_num, shelf:item.name, amount:amount})
            } else {
                    //buf.push({id:counter, number:++counter, shelfSpaceCode:item.shelfCode, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:" ", amount:0, inventaryzationStatus:"Пусто"}) 
            }
        })
        setTableList(buf)
    }

    //-------------------------------------стол 1 конец
    function apiUpdateOrderStatus(status, code, i) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', host+'/update_shelf_space_status'+'?'+`status=${status}&code=${code}`, true);
      
       //Send the proper header information along with the request
       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log(this.responseText);
          shelfsSpace.map(function(item, i){
              if (item.shelf_space!=undefined)
                item.shelf_space.map(function(item1, j){
                    if (code == item1.shelfCode) item1.status = status
                    return item1
                })
            return item
          })
          if (i==tableList1.length-1) alert(`Статусы успешно сохранены`)
        }
      }
        xhr.send(null);
    }
    //-------------------------------------------------------------------------Блок 1 конец
    //-------------------------------------------------------------------------Блок 2
    const [shelf, setShelf] = React.useState("Зона - Стеллаж - Полка -")
    const [liftingCapacity, setLiftingCapacity] = React.useState("-")

    const [dropdownList1, setDropdownList4] = React.useState([
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
    var edit_column1 = {add:false, edit:true, delete:false}

    // const [tableList1, setTableList1] = React.useState([{number:1, goodsType:"вв", amount:10, cost:10, sumCost:10}])
    const [tableList1, setTableList1] = React.useState([])

    React.useEffect(() => {
        var buf=[]
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
            tableList1.map(function(item1,j){
                // console.log(item1.shelfSpaceCode)
                apiUpdateOrderStatus(item1.inventaryzationStatus, item1.shelfSpaceCode, j)
            })
        }
    }

    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Инвентаризация</div>
                <div style={{width:400+'px', display:'inline-table'}} >
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} onSelect={setSelectedItemId}/>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div style={{width:500+"px"}}>
                    <div class="header_text"><label class="header_text">{shelf}</label></div>
                    <div class="low_text bold">Грузоподьемность:&nbsp;&nbsp;<label class="normal">{liftingCapacity}</label></div>
                </div>
                <div style={{width:470+'px', display:'inline-table'}} >
                    <TableComponent height={390} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}