import React from "react";
import './StorekeeperAllocation.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/storekeeperApi"

var api = new Api()

export default function StorekeeperAllocation(props){

    var id=0
    function getId(){return id++}

    const [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }

    //-------------------------------------------------------------------------query
    const [zones, setZones] = React.useState([])
    async function apiGetZones() {
        var buf = await api.getZones()
        setZones(buf)
        apiGetRacks(buf)
    }
    
    if (zones.toString()=="")
    apiGetZones()

    const [racks, setRacks] = React.useState([])
    async function apiGetRacks(zonesAnswer) {
        var buf = await api.getRacks(zonesAnswer)
        setRacks(buf)
        apiGetShelfs(buf)
    }

    const [shelfs, setShelfs] = React.useState([])
    async function apiGetShelfs(racksAnswer) {
        var buf = await api.getShelfs(racksAnswer)
        setShelfs(buf)
        apiGetShelfsSpace(buf)
    }

    const [shelfsSpace, setShelfsSpace] = React.useState([])
    async function apiGetShelfsSpace(shelfsAnswer) {
        var buf = await api.getShelfSpaces(shelfsAnswer)
        setShelfsSpace(buf)
    }

    const [goodsType, setGoodsType] = React.useState([])
    async function apiGetGoodsType() {
        var buf = await api.getGoodsType()
        setGoodsType(buf)
        apiGetGoodsSubCat2(buf)
    }

    if (goodsType.toString()=="")
        apiGetGoodsType()

    const [goodsCategories2, setGoodsCategories2] = React.useState("")
    async function apiGetGoodsSubCat2(goodsTypeAnswer) {
        var buf = await api.getGoodsSubCat2()
        setGoodsCategories2(buf)
        apiGetGoodsSubCat3(goodsTypeAnswer, buf)
    }

    const [goodsCategories3, setGoodsCategories3] = React.useState("")
    async function apiGetGoodsSubCat3(goodsTypeAnswer, goodsCategories2Answer) {
        var buf = await api.getGoodsSubCat3()
        setGoodsCategories3(buf)
        // TODO ПОМОГИТЕ
        // console.log("CATEGOE")               ОНО ПУСТОЕ
        // console.log(goodsCategories2)
        // console.log(goodsCategories3)
        apiGetShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, buf)
    }

    const [shipmentOrdersGoods, setShipmentOrdersGoods] = React.useState([])
    async function apiGetShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, goodsCategories3Answer) {
        var buf = await api.getShipmentOrdersGoods(goodsTypeAnswer, goodsCategories2Answer, goodsCategories3Answer)
        setShipmentOrdersGoods(buf)
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
        {menuItem:"Зона 3"},
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
        {menuItem:"Стеллаж 11"},
        {menuItem:"Стеллаж 12"},
    ])

    const [dropdownList3, setDropdownList3] = React.useState([
        {menuItem:"  "},
        {menuItem:"Полка 1"},
        {menuItem:"Полка 2"},
        {menuItem:"Полка 3"},
        {menuItem:"Полка 4"},
        {menuItem:"Полка 5"},
        {menuItem:"Полка 6"},
        {menuItem:"Полка 7"},
        {menuItem:"Полка 8"},
        {menuItem:"Полка 9"},
        {menuItem:"Полка 10"},
        {menuItem:"Полка 11"},
        {menuItem:"Полка 12"},
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
    var  tableSettings = {
        add:false, 
        edit:true, 
        delete:false,
    }

    const [tableList, setTableList] = React.useState([])
    React.useEffect(() => {
        if (tableList.toString()=="" && shipmentOrdersGoods.toString()!=""){
            var buf=[]
            var counter = 0;
            shipmentOrdersGoods.map(function(item,i){
                for (let i=0;i<(item.amount_real-item.placed_amount);i++){
                    buf.push({id: getId(), shipmentOrderGoodsCode:item.code, goodCode:item.goodCode, number:++counter, goodsCategories2: item.goodsCategories2, goodsCategories3: item.goodsCategories3, goodsType:item.good_name, weight:item.weight, zone:"", rack:" ", shelf:"  "})
                }
            })
            console.log("buf")
            console.log(buf)
            setTableList(buf)
        }
    }, [shipmentOrdersGoods]);

    async function apiPostGoodsToShelfs(value) {
        var response = await api.postGoodsToShelfs(value)
        console.log(response)
        setTableList([])
        setTableList2([])

        setShelfsSpace("")
        setShipmentOrdersGoods("")

        apiGetGoodsType()
        apiGetZones()
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
        apiPostGoodsToShelfs(tableList)
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
    var  tableSettings2 = {add:false, edit:false, delete:false, filter: true}

    const [tableList2, setTableList2] = React.useState([])
    React.useEffect(() => {
        if (tableList2.toString()=="" && shelfsSpace.toString()!=""){
            var buf=[]
            shelfsSpace.map(function(item,i){
                if (item.shelf_space==null)
                    buf.push({id:i, number:(i+1), zone: item.zone_num, rack: item.rack_num, shelf: item.name, loadСapacity: item.capacity, fillStatus:0})
                else
                    buf.push({id:i, number:(i+1), zone: item.zone_num, rack: item.rack_num, shelf: item.name, loadСapacity: item.capacity, fillStatus:item.shelf_space.length})
            })
            console.log("buf2")
            console.log(buf)
            setTableList2(buf)
        }
    }, [shelfsSpace]);
    
    //-------------------------------------стол 2 конец

    //-------------------------------------------------------------------------Блок 2 конец



    return (
        <FlexibleBlocksPage  marginTop={102}>
            <FlexibleBlock>
                {/* <div class="low_text row_with_item_wide">
                    <div class="low_text row_with_item_wide"><div>Приходная&nbsp;накладная&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expandImputList1[0].value} list={expandImputList1} func={setExpandImputList1}/></div>
                    <div class="low_text row_with_item_wide"><div>&nbsp;&nbsp;&nbsp;&nbsp;Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={setDate}/></div>
                </div> */}
                <div class="header_text">Расстановка&nbsp;товаров</div>
                <div style={{width:400+'px', display:'inline-table'}} >
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings} isDropdownActive={true}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Полки</div>
                <div style={{width:"min-content", height:400+'px', display:'inline-table'}}>
                    <TableComponent height={527} columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} tableSettings={tableSettings2}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}