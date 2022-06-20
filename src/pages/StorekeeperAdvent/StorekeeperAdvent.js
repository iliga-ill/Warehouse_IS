import React, { Component, Fragment } from "react";
import './StorekeeperAdvent.css';
import { TableComponent } from "../../components/Table/TableComponent";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import { render } from "react-dom";
import { Api } from "../../api/storekeeperApi"
import { useLocation } from "react-router-dom"

var api = new Api()
const styles = {

}

export default function StorekeeperAdvent(props){
    const location = useLocation();
    let newDate = new Date()

    var id=0
    function getId(){return id++}

    const [isCurrent, setIsCurrent] = React.useState(true)
    if (isCurrent!=props.isCurrent) setIsCurrent(props.isCurrent)
    React.useEffect(() => {
        apiGetGoodsType()
    }, [isCurrent]);
    
//#region блоки
    //-------------------------------------------------------------------------Блок 1

    const [orders, setOrders] = React.useState([])
    const [selOrder, setSelOrder] = React.useState(undefined)

    React.useEffect(() => {
        apiGetGoodsByShipmentOrder()
    }, [selOrder]);

    async function apiGetShipmentOrders() {
        var status = location.pathname.split("/")[location.pathname.split("/").length-1] == 'Current'? 'opened' : 'closed'
        var order = await api.getShipmentOrders('sell', status)
        structuredClone(orders).map(()=>{orders.pop()})
        order.map(item=>{orders.push(item)})
        setSelOrder(order[0])
    }
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 1
    
    const [goodsCategories2, setGoodsCategories2] = React.useState([])
    async function apiGetGoodsSubCat2() {
        var goods = await api.getGoodsSubCat2()
        setGoodsCategories2(goods)
        apiGetGoodsSubCat3()
    }

    const [goodsCategories3, setGoodsCategories3] = React.useState([])
    async function apiGetGoodsSubCat3() {
        var goods = await api.getGoodsSubCat3()
        setGoodsCategories3(goods)
        apiGetShipmentOrders()
    }

    const [goodsType, setGoodsType] = React.useState([])
    async function apiGetGoodsType() {
        var goods = await api.getGoodsType()
        setGoodsType(goods)
        apiGetGoodsSubCat2()
    }

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,   width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,   width:170   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,   width:200   }, 
        {name: 'orderedAmount',     title:'Ожидаемое кол-во',   editingEnabled:false,   width:150   },
        {name: 'amount',            title:'Кол-во коробок',     editingEnabled:true,    width:130,  mask:/^[0-9]{0,10}$/i, maskExample:"быть числом больше нуля"}
    ]) 
    
    var tableSettings
    if (isCurrent)
        tableSettings = {add:false, edit:false, delete:false, cell:true}
    else
        tableSettings = {add:false, edit:false, delete:false, cell:false}

    //var table_field_height = "160px"

    const [tableList, setTableList] = React.useState([])
    //var table_list = [[0,"Встраиваемая техника","Варочные поверхности","Варочная поверхность Bosch PKE 645 B17E","0",true],];
    

    async function apiGetGoodsByShipmentOrder() {
        if (selOrder != undefined){
            var buffer = await api.getGoodsByShipmentOrder(selOrder, goodsType, goodsCategories2, goodsCategories3)
            setTableList(buffer)
        }
    }
        
    //-------------------------------------стол 1 конец

    let [date, setDate] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1<10?`0${newDate.getMonth()+1}`:newDate.getMonth()+1}-${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    // React.useEffect(() => {
    //     console.log(`dateFrom: ${dateFrom}`)
    // }, [dateFrom]);

    const [documents, setDocuments] = React.useState()
    
    function btn_send_1() {
        console.log("date = " + date)
        if (documents != null) {
            // console.log(
            //     documents.map(doc=>{
            //         console.log("document: " + doc.name)
            //     })
            // )
       
        }
        console.log('tableList')
        console.log(tableList)
        var temp_table_list=[]
        tableList.map(function(item,i){
            temp_table_list[i] = {id: item.id, category: item.goodsCategories2, sub_category: item.goodsCategories3, text: item.goodsType, amount: item.amount, code: item.code}
        })

        var check=true
        temp_table_list.map(function(item,i){
            if (item.category == "" && check){
                check=false
                alert("Ошибка, категория не может быть пустой");
            }
            if (item.sub_category == "" && check){
                check=false
                alert("Ошибка, подкатегория не может быть пустой");
                return;
            }
            if (item.text == "" && check){
                check=false
                alert("Ошибка, Наименование не может быть пустой");
                return;
            }
            if (item.amount < 0 && check){
                check=false
                alert("Ошибка, кол-во коробок не может быть отрицательным");
                return;
            }
            if (isNaN(parseInt(item.amount)) && check){
                check=false
                alert("Ошибка, кол-во коробок не может быть строкой");
            }
        })

        if (check) 
            // tableList.forEach( item => {
            //     apiUpdateOrderGoods(item.amount, item.code)
            // }) 
            apiUpdateOrderGoods(selOrder, tableList)
        else apiGetGoodsByShipmentOrder()
        //if (check) props.func2(temp_table_list)
        //console.log(temp_table_list)
    }
    //-------------------------------------------------------------------------Блок 2 конец
//#endregion
    
//#region api
async function apiUpdateOrderGoods(selected, value) {
    alert("Изменения успешно приняты")
    console.log("selected")
    console.log(selected)
    console.log(value)
    console.log(orders)
    var response = await api.updateOrderGoods(selected, value, props.cookies, documents, date, 'advent')
    // setTableList([])
    // apiGetGoodsType()
    //apiGetShipmentOrders()
    var order = structuredClone(orders)
    structuredClone(orders).map(()=>{orders.pop()})
    order.map(item=>{if (item.code!=selected.code) orders.push(item)})
    setSelOrder(order[0])
}

//#endregion категории с первой вкладки конец

//#region Страница 1 подстраница 1

//#endregion Страница 1 подстраница 1 конец
//#endregion

    return (
        <>
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock background={false} paddings={false}>
                    <ListWithSearch item_list={orders} selItem={selOrder} func={setSelOrder} width={200} height={363}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Прием товаров</div>
                    <div class="low_text row_with_item_wide"><div>Дата&nbsp;приема&nbsp;</div><InputDate defValue={date} func={setDate}/></div>
                    <div class="low_text"><InputFile func={setDocuments}/></div>
                    <div style={{width:"min-content", display:'inline-table'}} >
                        <TableComponent height={245} columns={tableHeaders} rows={tableList} setNewTableList={setTableList}  tableSettings={tableSettings}/>
                    </div>
                    <div></div>
                    <div class="place_holder"/><button class="bt_send" onClick={btn_send_1}>Отправить</button>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}
