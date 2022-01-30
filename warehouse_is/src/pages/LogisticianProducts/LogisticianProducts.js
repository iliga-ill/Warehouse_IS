import React, { Component, Fragment } from "react";
import './LogisticianProducts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function LogisticianProducts(props){

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
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:135   }, 
        {name: 'cost',              title:'Цена ед товара (руб)',     editingEnabled:true,     width:160   },
        {name: 'weight',            title:'Вес ед товара (кг)',      editingEnabled:true,     width:140   },
    ]) 
    var edit_column = {add:false, edit:false, delete:false}

    const [tableList, setTableList] = React.useState([{number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", amountOnWarehouse:10, cost:1000, weight:100}])
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 3
    const [good, setGood] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [subCategory, setSubCategory] = React.useState("")
    const [cost, setCost] = React.useState("")
    const [amountInStore, setAmountInStore] = React.useState("")
    const [weight, setWeight] = React.useState("")
    const [goodCharacteristics, setGoodCharacteristics] = React.useState("")

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
                <div class="low_text "><div>Товар:&nbsp;{good}</div></div>
                <div class="low_text "><div>Категория:&nbsp;{category}</div></div>
                <div class="low_text "><div>Подкатегория:&nbsp;{subCategory}</div></div>
                <div class="low_text "><div>Цена&nbsp;ед&nbsp;товара&nbsp;(руб):&nbsp;{cost}</div></div>
                <div class="low_text "><div>Кол-во&nbsp;на&nbsp;складе:&nbsp;{amountInStore}</div></div>
                <div class="low_text "><div>Вес&nbsp;ед&nbsp;товара&nbsp;(кг):&nbsp;{weight}</div></div>
                <InputTextArea styles = "" Id={getId()} label="Хар-ки&nbsp;товара" width={100} placeholder="адрес" set={setGoodCharacteristics} defValue={goodCharacteristics}/>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}