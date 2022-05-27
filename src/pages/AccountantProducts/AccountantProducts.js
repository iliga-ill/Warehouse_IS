import React, { Component, Fragment } from "react";
import './AccountantProducts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import { TableComponent } from "../../components/Table/TableComponent";
import { recomposeColor } from "@material-ui/core";
import { Api } from "../../api/accountantApi"

var api = new Api()

export default function AccountantProducts(props){

    var id=0
    function getId(){return id++}

    async function apiGetGoodsTypeCats() {
        var result = await api.getGoodsType()
        setTableList(result)
        setSelectedItemId(result[0])
    }

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:200   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:200   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:330   }, 
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:135   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:125, isCurrency:true   },
    ]) 
    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        select:true, 
        defaultSelection:true,
        filter:true
    }

    const [tableList, setTableList] = React.useState([])
    if (tableList.toString()=="")
        apiGetGoodsTypeCats()

    const [selectedItemId, setSelectedItemId] = React.useState()

    React.useEffect(() => {
       if (selectedItemId != undefined && tableList.length > 0) setDataInTable2(selectedItemId)
    }, [selectedItemId]);

    

    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 3
    const [good, setGood] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [subCategory, setSubCategory] = React.useState("")
    const [cost, setCost] = React.useState("")
    const [amountInStore, setAmountInStore] = React.useState("")
    const [goodLimit, setGoodLimit] = React.useState("")
    const [goodCharacteristics, setGoodCharacteristics] = React.useState("")

    function setDataInTable2(value) {
        console.log("elm")
        console.log(value)
        setGood(value.goodsType)
        setCategory(value.goodsCategories2)
        setSubCategory(value.goodsCategories3)
        setCost(value.cost)
        setAmountInStore(value.amountOnWarehouse)
        setGoodLimit(value.goodsLimit)
        setGoodCharacteristics(value.description)
    }

    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <FlexibleBlocksPage marginTop={102}>
            <FlexibleBlock>
                <div class="header_text">Список товаров</div>
                <div style={{width:800+'px', display:'inline-table'}}>
                    <TableComponent height={500} columns={tableHeaders} rows={tableList} onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div style={{width:500+"px"}}>
                    <div class="header_text">Товар:&nbsp;<label class="normal">{good}</label></div>
                    <div class="low_text bold">Категория:&nbsp;<label class="normal">{category}</label></div>
                    <div class="low_text bold">Подкатегория:&nbsp;<label class="normal">{subCategory}</label></div>
                    <div class="low_text bold">Цена&nbsp;ед&nbsp;товара&nbsp;<label class="normal">{cost} ₽</label></div>
                    <div class="low_text bold">Хар-ки&nbsp;товара:&nbsp;</div><div class="low_text normal">{goodCharacteristics}</div>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}