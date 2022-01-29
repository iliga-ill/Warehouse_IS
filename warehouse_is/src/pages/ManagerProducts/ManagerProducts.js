import React, { Component, Fragment } from "react";
import './ManagerProducts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

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
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:160   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:170   }, 
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:70   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:70   },
        {name: 'goodsLimit',        title:'Лимит товара',       editingEnabled:true,     width:80   },
    ]) 
    var edit_column = {add:false, edit:true, delete:false}

    const [tableList, setTableList] = React.useState([{number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", amountOnWarehouse:10, cost:"вв", goodsLimit:"вв"}])
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
                <div class="header_text"></div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
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