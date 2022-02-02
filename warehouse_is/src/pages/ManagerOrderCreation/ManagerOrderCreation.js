import React, { Component, Fragment } from "react";
import './ManagerOrderCreation.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

export default function ManagerOrderCreation(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }

    const [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }



    //-------------------------------------------------------------------------query
    function apiGetGoodsTypeCats() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_type_cats', true);
        console.log("ManagerOrderCreation apiGetGoodsTypeCats was launched")
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(this.response);
            var answer = JSON.parse(this.response)
            console.log("ManagerOrderCreation apiGetGoodsTypeCats answer: ")
            console.log(answer)
            var buffer = []
            answer.map(function( element, i) {
                buffer.push({number:i+1, goodsCategories2: element.category, goodsCategories3: element.subcategory_2, goodsType: element.name, amountOnWarehouse: element.amount, cost: element.price, goodsLimit: element.amount_limit})
                buffer[i].id = getId()
                buffer[i].code = element.code;
                buffer[i].description = element.description
            });
            setTableList1(buffer)
          }
        }
        
        xhr.send(null);
    }

    function apiGetShipmentOrders(tableHeadersBuf) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/shipment_order_goods'+'?'+'type=sell&status=opened', true);
        console.log("ManagerOrderCreation apiGetShipmentOrders was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("ManagerOrderCreation apiGetShipmentOrders answer: ")
                console.log(answer)

                console.log("tableHeadersBuf")
                console.log(tableHeadersBuf)
                setTimeout(() => {
                    setTableList(tableHeadersBuf)
                }, 1000);
                
                setTableList(tableHeadersBuf)
            }
        }
        xhr.send(null);
    }
    //---
    //-------------------------------------------------------------------------query end
    //-------------------------------------------------------------------------Блок 1

    const [orderTypeList, setOrderTypeList] = React.useState([
        {id: 0, value: "На продажу", selected: true},
        {id: 1, value: "На поставку", selected: false},
    ])
    const [shipmentDate, setShipmentDate] = React.useState("")
    const [shipmentAddress, setShipmentAddress] = React.useState("")
    const [sumCost, setSumCost] = React.useState(200)
    const [note, setNote] = React.useState("")

    //-------------------------------------стол 1
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'goodsType',         title:'Наименование',       editingEnabled:true,     width:120   }, 
        {name: 'amount',            title:'Кол-во',             editingEnabled:true,     width:70    }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,     width:120   },
        {name: 'sumCost',           title:'Итог цена',          editingEnabled:true,     width:120   },
    ]) 
    var edit_column = {add:true, edit:true, delete:true}

    const [tableList, setTableList] = React.useState([])
    React.useEffect(() => {
        
    }, [tableList]);


    function btn_send_1() {
        console.log(orderTypeList)
        console.log(shipmentDate)
        console.log(shipmentAddress)
        console.log(note)
    }

    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    const [tableHeaders1, setTableHeaders1] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,    width:30    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,    width:190   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,    width:168   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,    width:310   }, 
        {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,    width:135   }, 
        {name: 'cost',              title:'Цена ед товара',     editingEnabled:false,     width:125   },
        {name: 'goodsLimit',        title:'Лимит товара',       editingEnabled:false,     width:120   },
    ]) 
    var edit_column1 = {add:false, edit:false, delete:false, select:true}
    const [selectedItemId1, setSelectedItemId1] = React.useState()
   
    const [iterator, setIterator] = React.useState(0)

    const [tableList1, setTableList1] = React.useState([])

    const [bufferedTableList, setBufferedTableList] = React.useState([])
    
    if (tableList1.toString()=="")
        apiGetGoodsTypeCats()

    React.useEffect(() => {
        if (tableList1.toString()!="" && selectedItemId1 != undefined) {
            var buf = []
            var selectedRow;

            bufferedTableList.map(function(element, i) {
                buf.push(element)
            })

            tableList1.map(function(element, i){
                if (element.id == selectedItemId1) {
                    console.log(`i`)
                    console.log(i)
                    selectedRow = {id: getId(), goodsType: tableList1[i].goodsType, amount: tableList1[i].amountOnWarehouse, cost: tableList1[i].cost, sumCost: " ", goodCode: tableList1[i].code}
                }     
            })
            var check = true
            buf.map(function(element,i){
                if (element.goodCode == selectedRow.goodCode) check = false
            })
            if (check) buf.push(selectedRow)

            buf.map(function(element, i){
                element.id = getId()
            })

            // for (var i=0;i<=iterator;i++) {
            //     console.log(tableList1[i])
            //     buf.push({id: getId(), goodsType: tableList1[i].goodsTypem, amount: tableList1[i].amountOnWarehouse, cost: tableList1[i].cost, sumCost: " ", goodCode: tableList1[i].code}) 
            // }
            // var bar = iterator
            //setIterator(++bar) 
            setBufferedTableList(buf)
            setTableList(buf)

            //setDataInTable2(selectedItemId1)
            // console.log("selectedItemId1")
            // console.log(selectedItemId1)
            // console.log("tableList1")
            // console.log(tableList1)
            // tableList1.map(function(item,i){
            //     if (item.id == selectedItemId1){
            //         var check = true
            //         tableList.map(function(item1,i){
            //             if (item1.goodCode == item.code) check = false
            //         })
            //         console.log("check")
            //         console.log(check)
            //         if (check){
            //             var buf
            //             if (tableList.toString()==""){
            //                 buf = []
            //                 buf.push({id:0, number:1, goodsType:item.goodsType, amount:item.amountOnWarehouse, cost:item.cost, sumCost:" ", goodCode:item.code})
            //             } else {
            //                 buf = tableList
            //                 buf.push({id: tableList[tableList.length-1].id+1, number:(tableList[tableList.length-1].number + 1), goodsType:item.goodsType, amount:item.amountOnWarehouse, cost:item.cost, sumCost:" ", goodCode:item.code})
            //             }
            //             console.log(buf)
            //             setTableList(buf)
            //         }
            //     }
            // })

        }
    }, [selectedItemId1]);

       
    
    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Создание заказа</div>
                <div class="low_text row_with_item_wide"><div>Тип&nbsp;заказа&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={orderTypeList[0].value} list={orderTypeList} func={setOrderTypeList}  i={0} j={0}/></div> 
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;доставки&nbsp;</div><InputDate Id={getId()} defValue={shipmentDate} func={setShipmentDate}/></div>
                <div class="low_text row_with_item_wide"><div>Итоговая&nbsp;цена:&nbsp;{sumCost}&nbsp;руб</div></div>
                <InputTextArea styles = "" Id={getId()} label="Адрес доставки:" placeholder="адрес" set={setShipmentAddress} defValue={shipmentAddress}/>
                <InputTextArea styles = "" Id={getId()} label="Примечание:" placeholder="примечание" set={setNote} defValue={note}/>
                <div class="header_text">Заказываемые товары:</div>
                <div style={{width:300+'px', display:'inline-table'}} >
                    <TableComponent height={300} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
                <div></div>
                <div class="place_holder_ManagerOrderCreation"/><button class="bt_send_ManagerOrderCreation" onClick={btn_send_1}>Создать&nbsp;заказ</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Виды товаров:</div>
                <div style={{width:500+'px', display:'inline-table'}} >
                    <TableComponent height={547} columns={tableHeaders1} rows={tableList1} setNewTableList={setTableList1} editColumn={edit_column1} onSelect={setSelectedItemId1}/>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}