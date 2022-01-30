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
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:160   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:170   }, 
        {name: 'weight',            title:'Вес',                editingEnabled:false,    width:70   }, 
        {name: 'zone',              title:'Зона',               editingEnabled:true,     width:70   },
        {name: 'rack',              title:'Стеллаж',            editingEnabled:true,     width:80   },
        {name: 'shelf',             title:'Полка',              editingEnabled:true,     width:70   }
    ]) 
    var edit_column = {add:false, edit:true, delete:false}

    const [tableList, setTableList] = React.useState([{number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", weight:10, zone:"вв", rack:"вв", shelf:"вв"}])
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
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 2
    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'number',            title:'№',                    editingEnabled:false,    width:50    }, 
        {name: 'zone',              title:'Зона',                 editingEnabled:true,     width:70   },
        {name: 'rack',              title:'Стеллаж',              editingEnabled:true,     width:80   },
        {name: 'shelf',             title:'Полка',                editingEnabled:true,     width:70   },
        {name: 'loadСapacity',      title:'Грузоподьемность(кг)', editingEnabled:false,    width:160   }, 
        {name: 'fillStatus',        title:'заполненность',        editingEnabled:false,    width:160   }, 
    ]) 
    var edit_column2 = {add:false, edit:false, delete:false}

    const [tableList2, setTableList2] = React.useState([{number:1, zone:"вв", rack:"вв", shelf:"вв", loadСapacity:10, fillStatus:"вв"}])
    //-------------------------------------стол 2 конец

    //-------------------------------------------------------------------------Блок 2 конец



    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div>
                    <div class="low_text row_with_item_wide">
                        <div class="low_text row_with_item_wide"><div>Приходная&nbsp;накладная&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_1[0].value} list={expand_imput_list_1} func={set_expand_list_input_1}/></div>
                        <div class="low_text row_with_item_wide"><div>&nbsp;&nbsp;&nbsp;&nbsp;Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={set_date}/></div>
                    </div>
                    <div style={{width:800+'px', display:'inline-table'}} >
                        <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} isDropdownActive={true}/>
                    </div>
                </div>
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