import React, { Component, Fragment } from "react";
import './StorekeeperInventory.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";

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
    var table_list_value_1 = [
        {value: "Потеряно", selected: true},
        {value: "Найдено", selected: false},
        {value: "Инвентаризирован", selected: false},
        {value: "Не инвентаризирован", selected: false},
    ]

    var table_headers_1 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Зона", mode:"text", column_width: "70px", listValue: []}, 
        {title:"Стеллаж", mode:"text", column_width: "80px", listValue: []}, 
        {title:"Полка", mode:"text", column_width: "70px", listValue: []}, 
        {title:"Название", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Статус инвентаризации", mode:"inputList", column_width: "150px", listValue: table_list_value_1},
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_1 = "300px"

    var table_list_1 = [
        [0, "Зона 1", "Стеллаж 1", "Полка 1", "Встраиваемая техника №34", "Инвентаризирован"     , true],
        [1, "Зона 2", "Стеллаж 1", "Полка 2", "Холодильники №323"       , "Потеряно"             , true],
        [2, "Зона 1", "Стеллаж 1", "Полка 4", "Плита №452"              , "Не инвентаризирован"  , true],
        [3, "Зона 4", "Стеллаж 1", "Полка 3", "Холодильник №654"        , "Найдено"              , true],
        [4, "Зона 3", "Стеллаж 2", "Полка 2", "Плита №123"              , "Инвентаризирован"     , true],
        [5, "Зона 1", "Стеллаж 2", "Полка 1", "Электродуховка №323"     , "Потеряно"             , true],
        [7, "Зона 3", "Стеллаж 2", "Полка 3", "Электродуховка №345"     , "Не инвентаризирован"  , true],
    ]
    function set_table_list_1(value) {
        table_list_1=value
    }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <Table Id={getId()} table_headers={table_headers_1} table_field_height={table_field_height_1} table_list={table_list_1} func={set_table_list_1} numb={0} search="true" add="true" delete="false"/>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}