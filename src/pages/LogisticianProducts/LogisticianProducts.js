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

    var id=0
    function getId(){return id++}

    function apiGetGoodsTypeCats() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_type_cats', true);
        console.log("ManagerProducts apiGetGoodsTypeCats was launched")
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(this.response);
            var answer = JSON.parse(this.response)
            console.log("ManagerProducts apiGetGoodsTypeCats answer: ")
            console.log(answer)
            var buffer = []
            answer.map(function( element, i) {
                buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: element.price, weight: element.weight})
                buffer[i].id = getId()
                buffer[i].code = element.code;
                buffer[i].description = element.description
            });
            setTableList(buffer)
            setSelectedItemId(buffer[0])
          }
        }
        
        xhr.send(null);
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
                    <div class="low_text bold">Цена&nbsp;ед&nbsp;товара&nbsp;(руб):&nbsp;<label class="normal">{cost}</label></div>
                    <div class="low_text bold">Кол-во&nbsp;на&nbsp;складе:&nbsp;<label class="normal">{amountInStore}</label></div>
                    <div class="low_text bold">Вес&nbsp;ед&nbsp;товара&nbsp;(кг):&nbsp;<label class="normal">{weight}</label></div>
                    <div class="low_text bold">Хар-ки&nbsp;товара:&nbsp;</div><div class="low_text normal">{goodCharacteristics}</div>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}