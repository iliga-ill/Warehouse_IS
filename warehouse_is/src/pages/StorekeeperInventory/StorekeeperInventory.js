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

    var id=props.Id
    function getId(){
        id++
        return id-1
    }


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
                    buf[i] = {shelfCode: item.code, name: item.name, shelf_num: item.shelf_num, rack_num: racksAnswer[item.rack_num-1].name, zone_num: racksAnswer[item.rack_num-1].zone_num, capacity: item.capacity, shelf_space: item.shelf_space}
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
                    if (buf[item.shelf_num-1].shelf_space == null) buf[item.shelf_num-1].shelf_space = []
                    buf[item.shelf_num-1].shelfSpaceCode = item.code
                    goodsType.map(item1=>{
                        if (item1.code == item.good)
                            buf[item.shelf_num-1].shelf_space.push({good:item1.name, goodCode:item.good, amount:item.amount, status:item.status})
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
    const [dropdownList1, setDropdownList4] = React.useState([
        {menuItem:""},
        {menuItem:"Не инвентаризирован"},
        {menuItem:"Проинвентаризирован"},
        {menuItem:"Потерян"},
        {menuItem:"Найден"},
        {menuItem:"Пусто"},
    ])

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',                    title:'№',                      editingEnabled:false,     width:60,  dropdownList:[]                }, 
        {name: 'zone',                      title:'Зона',                   editingEnabled:false,     width:90,  dropdownList:[]                },
        {name: 'rack',                      title:'Стеллаж',                editingEnabled:false,     width:120,  dropdownList:[]               },
        {name: 'shelf',                     title:'Полка',                  editingEnabled:false,     width:90,  dropdownList:[]                },
        {name: 'goodsType',                 title:'Наименование',           editingEnabled:false,     width:300, dropdownList:[]                },
        {name: 'inventaryzationStatus',     title:'Статус инвентаризации',  editingEnabled:true,      width:180, dropdownList: dropdownList1    },
    ]) 
    var edit_column = {add:false, edit:true, delete:false, filter: true}

    const [tableList, setTableList] = React.useState([])

    if (tableList.toString()=="" && shelfsSpace.toString()!=""){
        var buf=[]
        var counter = 0
        shelfsSpace.map(function(item, i){
            if (item.shelf_space != null) {
                item.shelf_space.map(function(item1, j){
                    buf.push({id:counter, number:++counter, shelfSpaceCode:item.code, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:item1.good, amount:item1.amount, inventaryzationStatus:item1.status})
                })
            } else {
                    buf.push({id:counter, number:++counter, shelfSpaceCode:item.code, zone:item.zone_num, rack:item.rack_num, shelf:item.name, goodsType:" ", amount:0, inventaryzationStatus:"Пусто"}) 
            }
        })
        setTableList(buf)
    }

    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Инвентаризация</div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}