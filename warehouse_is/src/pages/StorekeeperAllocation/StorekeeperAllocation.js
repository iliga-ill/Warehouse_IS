import React from "react";
import './StorekeeperAllocation.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import Table from "../../components/Table/Table";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";

export default function StorekeeperAllocation(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------выпадающий список приходной накладной
    var expand_imput_list_1 = [
        {id: 0, value: "№3521", selected: true},
        {id: 1, value: "№3522", selected: false},
        {id: 2, value: "№3523", selected: false},
        {id: 3, value: "№3524", selected: false},
    ]
    function set_expand_list_input_1(value) {expand_imput_list_1=value}
    //-------------------------------------выпадающий список приходной накладной конец
    //-------------------------------------дата
    var date; function set_date(value) {date = value}
    //-------------------------------------дата конец
    //-------------------------------------стол 1
    var table_list_value_1 = [
        {value: "Зона 1", selected: true},
        {value: "Зона 2", selected: false},
        {value: "Зона 3", selected: false},
        {value: "Зона 4", selected: false},
    ]

    var table_list_value_2 = [
        {value: "Полка 1", selected: true},
        {value: "Полка 2", selected: false},
        {value: "Полка 3", selected: false},
        {value: "Полка 4", selected: false},
    ]

    var table_headers_1 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Категория", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Подкатегория", mode:"text", column_width: "100px", listValue: []}, 
        {title:"Наименование", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Вес (кг)", mode:"text", column_width: "90px", listValue: []},
        {title:"Зона", mode:"inputList", column_width: "70px", listValue: table_list_value_1},
        {title:"Полка", mode:"inputList", column_width: "70px", listValue: table_list_value_2},
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_1 = "300px"

    var table_list_1 = [
        [0, "Встраиваемая техника", "Варочные поверхности"     , "Встраиваемая техника №34", "15" , "Зона 1", "Полка 1" , true],
        [1, "Холодильники"        , "Встраиваемые холодильники", "Холодильники №323"       , "12" , "Зона 2", "Полка 2" , true],
        [2, "Плиты"               , "Кухонные мойки"           , "Плита №452"              , "10" , "Зона 1", "Полка 3" , true],
        [3, "Холодильники"        , ""                         , "Холодильник №654"        , "4"  , "Зона 3", "Полка 4" , true],
        [4, "Плиты"               , ""                         , "Плита №123"              , "20" , "Зона 2", "Полка 2" , true],
        [5, "Электродуховки"      , "Бытовые приборы для дома" , "Электродуховка №323"     , "400", "Зона 1", "Полка 3" , true],
        [7, "Электродуховки"      , "Бытовые приборы для дома" , "Электродуховка №345"     , "240", "Зона 4", "Полка 1" , true],
    ]
    function set_table_list_1(value) {
        table_list_1=value
    }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 2
    var table_headers_2 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Зона", mode:"text", column_width: "70px", listValue: []}, 
        {title:"Полка", mode:"text", column_width: "70px", listValue: []}, 
        {title:"Грузоподьемность (кг)", mode:"text", column_width: "140px", listValue: []}, 
        {title:"Заполнено", mode:"text", column_width: "80px", listValue: []},
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_2 = "290px"

    var table_list_2 = [
        [0, "Зона 1", "Полка 2", "50", "Да" , false],
        [1, "Зона 3", "Полка 1", "40", "Нет", false],
        [2, "Зона 2", "Полка 3", "50", "Да" , false],
        [3, "Зона 4", "Полка 1", "50", "Нет", false],
        [4, "Зона 2", "Полка 3", "50", "Нет", false],
        [5, "Зона 3", "Полка 1", "50", "Нет", false],
        [7, "Зона 1", "Полка 2", "50", "Да" , false],
    ]
    function set_table_list_2(value) {
        table_list_2=value
    }
    //-------------------------------------стол 2 конец

    //-------------------------------------------------------------------------Блок 2 конец



    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
            <div class="low_text row_with_item_wide">
                <div class="low_text row_with_item_wide"><div>Приходная&nbsp;накладная&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_1[0].value} list={expand_imput_list_1} func={set_expand_list_input_1}/></div>
                <div class="low_text row_with_item_wide"><div>&nbsp;&nbsp;&nbsp;&nbsp;Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={set_date}/></div>
            </div>
                <Table Id={getId()} table_headers={table_headers_1} table_field_height={table_field_height_1} table_list={table_list_1} func={set_table_list_1} numb={0} search="true" add="false" delete="false"/>
            </FlexibleBlock>
            <FlexibleBlock>
                <Table Id={getId()} table_headers={table_headers_2} table_field_height={table_field_height_2} table_list={table_list_2} func={set_table_list_2} numb={1} search="true" add="false" delete="false"/>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}