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

    var dropdownList1=[
        {menuItem:"Зона 1"},
        {menuItem:"Зона 2"},
        {menuItem:"Зона 3"},
        {menuItem:"Зона 4"},
    ]

    var dropdownList2=[
        {menuItem:"Стеллаж 1"},
        {menuItem:"Стеллаж 2"},
        {menuItem:"Стеллаж 3"},
        {menuItem:"Стеллаж 4"},
    ]

    var dropdownList3=[
        {menuItem:"Полка 1"},
        {menuItem:"Полка 2"},
        {menuItem:"Полка 3"},
        {menuItem:"Полка 4"},
    ]

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40,  dropdownList:[] }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:160, dropdownList:[] }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:160, dropdownList:[] }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:170, dropdownList:[] }, 
        {name: 'weight',            title:'Вес',                editingEnabled:false,    width:70,  dropdownList:[] }, 
        {name: 'zone',              title:'Зона',               editingEnabled:true,     width:83,  dropdownList: dropdownList1 },
        {name: 'rack',              title:'Стеллаж',            editingEnabled:true,     width:100,  dropdownList: dropdownList2 },
        {name: 'shelf',             title:'Полка',              editingEnabled:true,     width:90,  dropdownList: dropdownList3 }
    ]) 
    var edit_column = {add:false, edit:true, delete:false}

    const [tableList, setTableList] = React.useState([
        {id: 0, number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", weight:10, zone:"Зона 1", rack:"Стеллаж 1", shelf:"Полка 1"}, 
        {id: 1, number:2, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", weight:10, zone:"Зона 2", rack:"Стеллаж 2", shelf:"Полка 3"}
    ])
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

    // function btn_send_1() {
    //     console.log(tableList)
    // }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 2
    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                    editingEnabled:false,    width:50   }, 
        {name: 'zone',              title:'Зона',                 editingEnabled:true,     width:70   },
        {name: 'rack',              title:'Стеллаж',              editingEnabled:true,     width:80   },
        {name: 'shelf',             title:'Полка',                editingEnabled:true,     width:70   },
        {name: 'loadСapacity',      title:'Грузоподьемность(кг)', editingEnabled:false,    width:160  }, 
        {name: 'fillStatus',        title:'заполненность',        editingEnabled:false,    width:160  }, 
    ]) 
    var edit_column2 = {add:false, edit:false, delete:false}

    const [tableList2, setTableList2] = React.useState([{number:1, zone:"вв", rack:"вв", shelf:"вв", loadСapacity:10, fillStatus:"вв"}])
    //-------------------------------------стол 2 конец

    //-------------------------------------------------------------------------Блок 2 конец



    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="low_text row_with_item_wide">
                    <div class="low_text row_with_item_wide"><div>Приходная&nbsp;накладная&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expandImputList1[0].value} list={expandImputList1} func={setExpandImputList1}/></div>
                    <div class="low_text row_with_item_wide"><div>&nbsp;&nbsp;&nbsp;&nbsp;Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={setDate}/></div>
                </div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} isDropdownActive={true}/>
                </div>
                {/* <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button> */}
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Полки</div>
                <div style={{width:400+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders2} rows={tableList2} setNewTableList={setTableList2} editColumn={edit_column2}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}