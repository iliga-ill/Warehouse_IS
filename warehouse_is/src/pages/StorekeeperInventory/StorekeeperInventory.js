import React, { Component, Fragment } from "react";
import './StorekeeperInventory.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
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


    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',                    title:'№',                      editingEnabled:false,     width:40    }, 
        {name: 'zone',                      title:'Зона',                   editingEnabled:false,     width:70   },
        {name: 'rack',                      title:'Стеллаж',                editingEnabled:false,     width:80   },
        {name: 'shelf',                     title:'Полка',                  editingEnabled:false,     width:70   },
        {name: 'goodsType',                 title:'Наименование',           editingEnabled:false,     width:170   }, 
        {name: 'inventaryzationStatus',     title:'Статус инвентаризации',  editingEnabled:true,      width:180   },
    ]) 
    var edit_column = {add:false, edit:true, delete:false}

    const [tableList, setTableList] = React.useState([{number:1, zone:"вв", rack:"вв", shelf:"вв", goodsType:"dd", inventaryzationStatus:"вв"}])

    //-------------------------------------стол 1 конец
    //-------------------------------------выпадающий список приходной накладной 1
    var expand_imput_list_1 = [
        {id: 0, value: "Зона 1", selected: true},
        {id: 1, value: "Зона 2", selected: false},
        // {id: 2, value: "Зона 3", selected: false},
        // {id: 3, value: "Зона 4", selected: false},
    ]
    function set_expand_list_input_1(value) {expand_imput_list_1=value}
    //-------------------------------------выпадающий список приходной накладной 1 конец
    //-------------------------------------выпадающий список приходной накладной 1
    var expand_imput_list_2 = [
        {id: 0, value: "Стеллаж 1", selected: true},
        {id: 1, value: "Стеллаж 2", selected: false},
        {id: 2, value: "Стеллаж 3", selected: false},
        {id: 3, value: "Стеллаж 4", selected: false},
        {id: 4, value: "Стеллаж 5", selected: false},
        {id: 5, value: "Стеллаж 6", selected: false},
        {id: 6, value: "Стеллаж 7", selected: false},
        {id: 7, value: "Стеллаж 8", selected: false},
        {id: 8, value: "Стеллаж 9", selected: false},
        {id: 9, value: "Стеллаж 10", selected: false},
    ]
    function set_expand_list_input_2(value) {expand_imput_list_2=value}
    //-------------------------------------выпадающий список приходной накладной 1 конец
    //-------------------------------------выпадающий список приходной накладной 1
    var expand_imput_list_3 = [
        {id: 0, value: "Полка 1", selected: true},
        {id: 1, value: "Полка 2", selected: false},
        {id: 2, value: "Полка 3", selected: false}
    ]
    function set_expand_list_input_3(value) {expand_imput_list_3=value}
    //-------------------------------------выпадающий список приходной накладной 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="low_text row_with_item_wide_storekeeperInventory">
                    <div class="low_text row_with_item_wide"><div>Зона&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_1[0].value} list={expand_imput_list_1} func={set_expand_list_input_1}/></div>
                    <div class="low_text row_with_item_wide ml_storekeeperInventory"><div>Стеллаж&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_2[0].value} list={expand_imput_list_2} func={set_expand_list_input_2}/></div>
                    <div class="low_text row_with_item_wide ml_storekeeperInventory"><div>Полка&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_3[0].value} list={expand_imput_list_3} func={set_expand_list_input_3}/></div>
                </div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}