import React, { Component, Fragment } from "react";
import './LogisticianProducts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/logisticianApi"

var api = new Api()
const styles = {

  }

export default function LogisticianProducts(props){

    var id=0
    function getId(){return id++}

    async function apiGetGoodsTypeCats() {
        var buffer = await api.getGoodsTypeCats()
        setTableList(buffer)
        setSelectedItemId(buffer[0])
    }

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:160   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:170   }, 
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:135   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:150, isCurrency:true   },
        {name: 'weight',            title:'Вес ед товара (кг)', editingEnabled:true,     width:140   },
    ]) 
    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        select:true,
        defaultSelection:true,
    }
    const [tableList, setTableList] = React.useState([])
    if (tableList.toString()=="")
        apiGetGoodsTypeCats()

    const [selectedItemId, setSelectedItemId] = React.useState()

    React.useEffect(() => {
       if (tableList.length > 0) setDataInTable2(selectedItemId)
    }, [selectedItemId]);

    //const [tableList, setTableList] = React.useState([{number:1, goodsCategories2:"вв", goodsCategories3:"вв", goodsType:"вв", amountOnWarehouse:10, cost:1000, weight:100}])
    
    
    
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

    
    function setDataInTable2(value) {
        setGood(value.goodsType)
        setCategory(value.goodsCategories2)
        setSubCategory(value.goodsCategories3)
        setCost(value.cost)
        setAmountInStore(value.amountOnWarehouse)
        setWeight(value.weight)
        setGoodCharacteristics(value.description)
    }

    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Товары</div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent height={500}  columns={tableHeaders} rows={tableList} onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div style={{width:500+"px"}}>
                    <div class="header_text">Товар:&nbsp;<label class="normal">{good}</label></div>
                    <div class="low_text bold">Категория:&nbsp;<label class="normal">{category}</label></div>
                    <div class="low_text bold">Подкатегория:&nbsp;<label class="normal">{subCategory}</label></div>
                    <div class="low_text bold">Цена&nbsp;ед&nbsp;товара:&nbsp;<label class="normal">{cost} ₽</label></div>
                    <div class="low_text bold">Кол-во&nbsp;на&nbsp;складе:&nbsp;<label class="normal">{amountInStore}</label></div>
                    <div class="low_text bold">Вес&nbsp;ед&nbsp;товара:&nbsp;<label class="normal">{weight} кг</label></div>
                    <div class="low_text bold">Хар-ки&nbsp;товара:&nbsp;</div><div class="low_text normal">{goodCharacteristics}</div>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}