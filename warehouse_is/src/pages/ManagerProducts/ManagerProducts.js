import React, { Component, Fragment } from "react";
import './ManagerProducts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import { TableComponent } from "../../components/Table/TableComponent";
import { recomposeColor } from "@material-ui/core";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function ManagerProducts(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }

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
                buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: element.price, goodsLimit: element.amount_limit})
                buffer[i].id = getId()
                buffer[i].code = element.code;
            });
            setTableList(buffer)
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
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:70   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:70   },
        {name: 'goodsLimit',        title:'Лимит товара',       editingEnabled:true,     width:80   },
    ]) 
    var edit_column = {add:false, edit:false, delete:false, select:true}
    const [selectedItemId, setSelectedItemId] = React.useState()

    const [tableList, setTableList] = React.useState([])
    if (tableList.toString()=="")
        apiGetGoodsTypeCats()

    function btn_send_1() {
        console.log(tableList)
        console.log(selectedItemId)
    }
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

    //-------------------------------------------------------------------------Блок 3 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Товары</div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent columns={tableHeaders} rows={tableList} onSelect={setSelectedItemId} setNewTableList={setTableList} editColumn={edit_column} isSelectionActive={true}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text"><div>Товар:&nbsp;{good}</div></div>
                <div class="low_text"><div>Категория:&nbsp;{category}</div></div>
                <div class="low_text"><div>Подкатегория:&nbsp;{subCategory}</div></div>
                <div class="low_text"><div>Цена&nbsp;ед&nbsp;товара&nbsp;(руб):&nbsp;{cost}</div></div>
                <div class="low_text"><div>Кол-во&nbsp;на&nbsp;складе:&nbsp;{amountInStore}</div></div>
                <div class="low_text"><div>Лимит&nbsp;товара&nbsp;(кг):&nbsp;{goodLimit}</div></div>
                <InputTextArea styles = "" Id={getId()} label="Хар-ки&nbsp;товара" width={100} placeholder="адрес" set={setGoodCharacteristics} defValue={goodCharacteristics}/>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}