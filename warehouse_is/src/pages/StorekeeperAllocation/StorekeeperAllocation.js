import React from "react";
import './StorekeeperAllocation.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import Table from "../../components/Table/Table";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

export default function StorekeeperAllocation(props){

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
    // const [dropdownList1, setDropdownList1] = React.useState([
    //     {menuItem:"Зона 1"},
    //     {menuItem:"Зона 2"},
    //     {menuItem:"Зона 3"},
    //     {menuItem:"Зона 4"},
    // ])
    
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
                    buf[i] = {code: item.code, name: item.name, shelf_num: item.shelf_num, rack_num: racksAnswer[item.rack_num-1].name, zone_num: racksAnswer[item.rack_num-1].zone_num, capacity: item.capacity, shelf_space: item.shelf_space}
                })
                setShelfs(buf)
                apiGetShelfsSpace(buf)
            }
        }
        xhr.send(null);
    }

    const [shelfsSpace, setShelfsSpace] = React.useState([])
    function apiGetShelfsSpace(shelfsAnswer) {
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
                    buf[item.shelf_num-1].shelf_space.push({good:item.good, amount:item.amount})
                })
                console.log("StorekeeperAllocation apiGetShelfsSpace changed answer: ")
                console.log(buf)
                setShelfsSpace(buf)
            }
        }
        xhr.send(null);
    }

    const [goodsType, setGoodsType] = React.useState([])
    function apiGetGoodsType() {
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
                    apiGetGoodsSubCat2(buf)
                }
                
            }

        }
        xhr.send(null);
    }
    if (goodsType.toString()=="")
        apiGetGoodsType()

    const [goodsCategories2, setGoodsCategories2] = React.useState([])
    function apiGetGoodsSubCat2(goodsTypeAnswer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_subcat2', true);
        console.log("StorekeeperAllocation apiGetGoodsSubCat2 was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetGoodsSubCat2 answer: ")
                console.log(answer)
                var buf = [{id:0, text: "ошибка", code: 0}]
                answer.map( function(item, i) {
                    buf[i] = item
                })
                setGoodsCategories2(buf)
                apiGetGoodsSubCat3(goodsTypeAnswer, buf)
            }
        }
        xhr.send(null);
    }

    const [goodsCategories3, setGoodsCategories3] = React.useState([])
    function apiGetGoodsSubCat3(goodsTypeAnswer, goodsCategories2Answer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_subcat3', true);
        console.log("StorekeeperAllocation apiGetGoodsSubCat3 was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetGoodsSubCat3 answer: ")
                console.log(answer)
                var buf = [{id:0, text: "ошибка", code: 0}]
                answer.map( function(item, i) {
                    buf[i] = item
                })
                setGoodsCategories3(buf)
                apiGetShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, buf)
            }
        }
        xhr.send(null);
    }

    const [shipmentOrdersGoods, setShipmentOrdersGoods] = React.useState([])
    function apiGetShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, goodsCategories3Answer) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/shipment_order_goods_all', true);
        console.log("StorekeeperAllocation apiGetShipmentOrdersGoods was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAllocation apiGetShipmentOrdersGoods answer: ")
                console.log(answer)
                var buf = []
                var counter = 0
                answer.map( function(item, i) {
                    if (item.amount_real > item.placed_amount) {
                        var good
                        goodsTypeAnswer.map(item1=>{
                            if (item1.code == item.goods)
                                good=item1
                        })
                        buf[counter] = {id: counter++, code:item.code, amount: item.amount, amount_real: item.amount_real, weight:good.weight, placed_amount:item.placed_amount , code: item.code, good_name: good.name, goodsCategories2:goodsCategories2Answer[good.subcategory_2-1].name, goodsCategories3:goodsCategories3Answer[good.subcategory_3-1].name , order_num: item.order_num}
                    }
                })
                setShipmentOrdersGoods(buf)
            }
        }
        xhr.send(null);
    }

    
        
    //-------------------------------------------------------------------------query end
    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------выпадающий список приходной накладной
    const [expandImputList1, setExpandImputList1] = React.useState([
        {id: 0, value: "№3521", selected: true},
        {id: 1, value: "№3522", selected: false},
        {id: 2, value: "№3523", selected: false},
        {id: 3, value: "№3524", selected: false},
    ])
    //-------------------------------------выпадающий список приходной накладной конец
    //-------------------------------------дата
    const [date, setDate] = React.useState("2022-01-14")
    //-------------------------------------дата конец
    //-------------------------------------стол 1
    const [dropdownList1, setDropdownList1] = React.useState([
        {menuItem:""},
        {menuItem:"Зона 1"},
        {menuItem:"Зона 2"},
    ])


    const [dropdownList2, setDropdownList2] = React.useState([
        {menuItem:" "},
        {menuItem:"Стеллаж 1"},
        {menuItem:"Стеллаж 2"},
        {menuItem:"Стеллаж 3"},
        {menuItem:"Стеллаж 4"},
        {menuItem:"Стеллаж 5"},
        {menuItem:"Стеллаж 6"},
        {menuItem:"Стеллаж 7"},
        {menuItem:"Стеллаж 8"},
        {menuItem:"Стеллаж 9"},
        {menuItem:"Стеллаж 10"},
    ])

    const [dropdownList3, setDropdownList3] = React.useState([
        {menuItem:"  "},
        {menuItem:"полка 1"},
        {menuItem:"полка 2"},
        {menuItem:"полка 3"},
    ])

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40,  dropdownList:[] }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:160, dropdownList:[] }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:160, dropdownList:[] }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:170, dropdownList:[] }, 
        {name: 'weight',            title:'Вес',                editingEnabled:false,    width:70,  dropdownList:[] }, 
        {name: 'zone',              title:'Зона',               editingEnabled:true,     width:95,  dropdownList: dropdownList1 },
        {name: 'rack',              title:'Стеллаж',            editingEnabled:true,     width:125, dropdownList: dropdownList2 },
        {name: 'shelf',             title:'Полка',              editingEnabled:true,     width:105,  dropdownList: dropdownList3 }
    ]) 
    var edit_column = {add:false, edit:true, delete:false}

    const [tableList, setTableList] = React.useState([])

    if (tableList.toString()=="" && shipmentOrdersGoods.toString()!=""){
        var buf=[]
        var counter = 0;
        shipmentOrdersGoods.map(function(item,i){
            for (let i=0;i<(item.amount_real-item.placed_amount);i++){
                buf.push({id: getId(), code:item.code, number:++counter, goodsCategories2: item.goodsCategories2, goodsCategories3: item.goodsCategories3, goodsType:item.good_name, weight:item.weight, zone:"", rack:" ", shelf:"  "})
            }
        })
        setTableList(buf)
    }

    //{id: counter++, amount: item.amount, amount_real: item.amount_real, placed_amount:item.placed_amount, code: item.code, good_name: goodsTypeAnswer[item.goods-1].name, goodsCategories2:goodsCategories2Answer[goodsTypeAnswer[item.goods-1].subcategory_2-1].name, goodsCategories3:goodsCategories3Answer[goodsTypeAnswer[item.goods-1].subcategory_3-1].name , order_num: item.order_num}
    
    // function apiGetClients() {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', host+'/clients', true);
    //     console.log("Authorization apiGetClients was launched")
    //     xhr.onreadystatechange = function() {
    //       if (xhr.readyState == XMLHttpRequest.DONE) {
    //         var answer = JSON.parse(this.response)
    //         console.log("Authorization apiGetClients answer: ")
    //         console.log(answer)
    //         var buffer = []
    //         answer.map( function(item, i) {
    //             buffer[i] = {number:i+1, name: item.name, surname: item.surname, patronymic: item.patronymic, login: item.login, password: item.password, phone_num: item.phone_num, duty: item.duty}
    //             buffer[i].id = 'string_' + i;
    //         })
    //         if (JSON.stringify(tableList)!=JSON.stringify(buffer))
    //             setTableList(buffer)
    //       }
    //     } 
    //     xhr.send(null);
    //   }
    //   if(tableList.toString()=="")
    //     apiGetClients()

    function btn_send_1() {
        console.log(tableList)
    }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 2
    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                    editingEnabled:false,    width:50   }, 
        {name: 'zone',              title:'Зона',                 editingEnabled:false,     width:70   },
        {name: 'rack',              title:'Стеллаж',              editingEnabled:false,     width:100   },
        {name: 'shelf',             title:'Полка',                editingEnabled:false,     width:70   },
        {name: 'loadСapacity',      title:'Грузоподьемность(кг)', editingEnabled:false,    width:160  }, 
        {name: 'fillStatus',        title:'Заполненность',        editingEnabled:false,    width:120  }, 
    ]) 
    var edit_column2 = {add:false, edit:false, delete:false}

    const [tableList2, setTableList2] = React.useState([])
    if (tableList2.toString()=="" && shelfsSpace.toString()!=""){
        var buf=[]
        shelfsSpace.map(function(item,i){
            if (item.shelf_space==null)
                buf.push({id:i, number:(i+1), zone: item.zone_num, rack: item.rack_num, shelf: item.name, loadСapacity: item.capacity, fillStatus:"нет"})
            else
                buf.push({id:i, number:(i+1), zone: item.zone_num, rack: item.rack_num, shelf: item.name, loadСapacity: item.capacity, fillStatus:"да"})
        })
        setTableList2(buf)
    }

    //-------------------------------------стол 2 конец

    //-------------------------------------------------------------------------Блок 2 конец



    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="low_text row_with_item_wide">
                    <div class="low_text row_with_item_wide"><div>Приходная&nbsp;накладная&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expandImputList1[0].value} list={expandImputList1} func={setExpandImputList1}/></div>
                    <div class="low_text row_with_item_wide"><div>&nbsp;&nbsp;&nbsp;&nbsp;Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={setDate}/></div>
                </div>
                <div style={{width:400+'px', display:'inline-table'}} >
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} isDropdownActive={true}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Полки</div>
                <div style={{width:"min-content", height:400+'px', display:'inline-table'}}>
                    <TableComponent height={535} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} editColumn={edit_column2}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}