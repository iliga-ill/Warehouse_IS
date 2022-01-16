import React, { Component, Fragment } from "react";
import './ManagerProducts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";

const styles = {

  }

  

export default function ManagerProducts(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }


    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    var table_headers_1 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Категория", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Подкатегория", mode:"text", column_width: "100px", listValue: []}, 
        {title:"Наименование", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Кол-во коробок на складе", mode:"text", column_width: "90px", listValue: []},
        {title:"Цена ед товара (руб)", mode:"input", column_width: "70px", listValue: []},
        {title:"Лимит товара", mode:"input", column_width: "70px", listValue: []},
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_1 = "300px"

    var table_list_1 = [
        [0, "Встраиваемая техника"  , "Варочные поверхности"        , "Встраиваемая техника №34", "10", "1000", "10", true],
        [1, "Холодильники"          , "Встраиваемые холодильники"   , "Холодильники №323"       , "15", "1500", "5" , true],
        [2, "Плиты"                 , "Кухонные мойки"              , "Плита №452"              , "12", "1200", "17", true],
        [3, "Холодильники"          , ""                            , "Холодильник №654"        , "17", "1700", "15", true],
        [4, "Плиты"                 , ""                            , "Плита №123"              , "5" , "500" , "10", true],
        [5, "Электродуховки"        , "Бытовые приборы для дома"    , "Электродуховка №323"     , "15", "1500", "11", true],
        [7, "Электродуховки"        , "Бытовые приборы для дома"    , "Электродуховка №345"     , "16", "1100", "19", true],
    ]
    function set_table_list_1(value) {
        table_list_1=value
    }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 3
    var good; function set_func_1(value) {good = value}
    var cost; function set_func_2(value) {cost = value}
    var amount_in_store; function set_func_3(value) {amount_in_store = value}
    var good_limit; function set_func_4(value) {good_limit = value}
    var category; function set_func_5(value) {category = value}
    var subcategory; function set_func_6(value) {subcategory = value}
    var good_characteristics; function set_func_7(value) {good_characteristics=value}

    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <Table Id={getId()} table_headers={table_headers_1} table_field_height={table_field_height_1} table_list={table_list_1} func={set_table_list_1} numb={0} search="true" add="false" delete="false"/>
            </FlexibleBlock>
            <FlexibleBlock>
            <div class="header_text">Заказ 1</div>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Товар" placeholder="наименование товара" set={set_func_1}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Цена&nbsp;" placeholder="цена" set={set_func_2}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Кол-во на складе" placeholder="Кол-во на складе" set={set_func_3}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Лимит товара&nbsp;" placeholder="лимит товара" set={set_func_4}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Категория&nbsp;" placeholder="категория" set={set_func_5}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Подкатегория&nbsp;" placeholder="подкатегория" set={set_func_6}/>
                <InputText styles = "" Id={getId()} label="Прочие хар-ки товара" placeholder="Прочие хар-ки товара" set={set_func_7} defValue={"sssssssss ssssssssssssssss sssssssssssssss ssssssssssssss sssssssss ssssss"}/>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}