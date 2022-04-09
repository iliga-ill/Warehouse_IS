import React, { Component, Fragment } from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";
import { TableComponent } from "../../components/Table/TableComponent";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import SwitchHolder from "../../components/TabHolders/SwitchHolder/SwitchHolder";
import { render } from "react-dom";
//const API = require('../../api/api.js');
const host = 'http://localhost:5000';

const styles = {

}


const apiGetRacksByZones = function apiGetRacksByZones() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host+'/racks_by_zone', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(this.responseText);
      }
    }
    
    xhr.send("code=2");
}  


export default function StorekeeperAdvent(props){

    var id=0
    function getId(){return id++}

    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    var [tabs, setTabs] = React.useState([
        {id:0, selected: true, title: "Текущие"},
        {id:1, selected: false, title: "Выполненные"}
    ])

    function onTabClick(tab_id){
        var mT = tabs
        mT.map(tab => {
            if (tab.id != tab_id){
                tab.selected = false
            } else {
                tab.selected = true
            }
            return tab
        })
        setTabs(mT)
        reloadPage()
    }

    React.useEffect(() => {
        apiGetGoodsType()
    }, [reload]);

//#region блоки
    //-------------------------------------------------------------------------Блок 1
   
    var list_with_search_width = "200px"
    var list_with_search_height = "335px"
    
     // {id: 0, text: "Заказ №1143", selected: false},
        // {id: 0, text: "Заказ №1346", selected: false},
        // {id: 0, text: "Заказ №3543", selected: false},
        // {id: 0, text: "Заказ №3156", selected: false},
        // {id: 0, text: "Заказ №6243", selected: false},
        // {id: 0, text: "Заказ №6546", selected: false},
        // {id: 0, text: "Заказ №6547", selected: false},
        // {id: 0, text: "Заказ №6548", selected: false},
        // {id: 0, text: "Заказ №6549", selected: false},
        // {id: 0, text: "Заказ №6540", selected: false},
        // {id: 0, text: "Заказ №6526", selected: false},
        // {id: 0, text: "Заказ №6536", selected: false},
        // {id: 0, text: "Заказ №6556", selected: false},
        // {id: 0, text: "Заказ №6566", selected: false},

    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        apiGetGoodsByShipmentOrder()
    }, [orders]);

    function setOrdersForced(value){
        setOrders(value)
        apiGetGoodsByShipmentOrder()
    }

    function apiGetShipmentOrders() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/shipment_order_goods'+'?'+'type=sell&status=opened', true);
        console.log("StorekeeperAdvent apiGetShipmentOrders was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAdvent apiGetShipmentOrders answer: ")
                console.log(answer)
                var counter = 0
                var order = [{id:0, text: "Ничего не найдено", selected: true, code: 0}]
                answer.map( function(item, i) {
                    if (i === 0 & item.status != "closed")  order[i] = {id:counter++, text: item.name, selected: true, code: item.code}
                    else if (item.status != "closed") order[i] = {id:counter++, text: item.name, selected: false, code: item.code}
                })
                setOrders(order)
            }
        }
        xhr.send(null);
    }
    //-------------------------------------------------------------------------Блок 1 конец

    //-------------------------------------------------------------------------Блок 2
    //-------------------------------------стол 1
    
    const [goodsCategories2, setGoodsCategories2] = React.useState([])
    function apiGetGoodsSubCat2() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_subcat2', true);
        console.log("StorekeeperAdvent apiGetGoodsSubCat2 was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAdvent apiGetGoodsSubCat2 answer: ")
                console.log(answer)
                var goods = [{id:0, text: "ошибка", code: 0}]
                answer.map( function(item, i) {
                    goods[i] = {id:i, text: item.name, code: item.code}
                })
                setGoodsCategories2(goods)
                apiGetGoodsSubCat3()
            }
        }
        xhr.send(null);
    }
    // var table_list_value = [
    //     {value: "Встраиваемая техника", selected: true},
    //     {value: "Стиральные машины", selected: false},
    //     {value: "Сушильные машины", selected: false},
    //     {value: "Холодильники", selected: false},
    //     {value: "Морозильные камеры", selected: false},
    //     {value: "Винные шкафы", selected: false},
    //     {value: "Вытяжки", selected: false},
    //     {value: "Плиты", selected: false},
    //     {value: "Посудомоечные машины", selected: false},
    //     {value: "Мелкая бытовая техника", selected: false},
    //     {value: "Микроволновые печи", selected: false},
    //     {value: "Электродуховки", selected: false},
    //     {value: "Пылесосы", selected: false},
    //     {value: "Водонагреватели", selected: false},
    //     {value: "Кулеры и пурифайеры", selected: false},
    //     {value: "Швейные машины, оверлоки", selected: false}
    // ]

    const [goodsCategories3, setGoodsCategories3] = React.useState([])
    function apiGetGoodsSubCat3() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_subcat3', true);
        console.log("StorekeeperAdvent apiGetGoodsSubCat3 was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAdvent apiGetGoodsSubCat3 answer: ")
                console.log(answer)
                var goods = [{id:0, text: "ошибка", code: 0}]
                answer.map( function(item, i) {
                    goods[i] = {id:i, text: item.name, code: item.code}
                })
                setGoodsCategories3(goods)
                apiGetShipmentOrders()
            }
        }
        xhr.send(null);
    }

    // var table_list_value_2 = [
    //     {value: "Варочные поверхности", selected: true},
    //     {value: "Духовые шкафы", selected: false},
    //     {value: "Вытяжки", selected: false},
    //     {value: "Встраиваемые посудомоечные машины", selected: false},
    //     {value: "Встраиваемые холодильники", selected: false},
    //     {value: "Встраиваемые морозильные камеры", selected: false},
    //     {value: "Встраиваемые микроволновые печи", selected: false},
    //     {value: "Кухонные мойки", selected: false},
    //     {value: "Измельчители отходов", selected: false},
    //     {value: "Кухня", selected: false},
    //     {value: "Бытовые приборы для дома", selected: false},
    //     {value: "Красота и гигиена", selected: false},
    //     {value: "Косметические приборы", selected: false},
    //     {value: "Медицина и реабилитация", selected: false},
    // ]

    const [goodsType, setGoodsType] = React.useState([])
    function apiGetGoodsType() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/goods_type', true);
        console.log("StorekeeperAdvent apiGetGoodsType was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (this.response != "") {
                    console.log("StorekeeperAdvent apiGetGoodsType answer: ")
                    console.log(this.response)
                    var answer = JSON.parse(this.response)
                 
                    var goods = [{id:0, text: "Ошибка", category: "Ошибка", sub_category: "Ошибка", ordered: 0, amount: 0, code: 0}]
                    answer.map( function(item, i) {
                        goods[i] = {id:i, text: item.name, category: item.category, sub_category: item.subcategory_2, ordered: item.amount_ordered, amount: item.amount, code: item.code}
                    })
                    setGoodsType(goods)
                }
                apiGetGoodsSubCat2()
            }

        }
        xhr.send(null);
    }

    const [isStart, setIsStart] = React.useState(true)

    if (isStart) {
         apiGetGoodsType()
         setIsStart(false)
    }
    // var goods_type_list = [
    //     {value: "Варочная поверхность Bosch PKE 645 B17E", selected: true},
    //     {value: "Варочная поверхность Bosch PKE 645 B18E", selected: false},
    //     {value: "Варочная поверхность Bosch PKE 645 B19E", selected: false},
    //     {value: "Варочная поверхность Bosch PKE 645 B20E", selected: false},
    //     {value: "Варочная поверхность Bosch PKE 645 B21E", selected: false},
    //     {value: "Варочная поверхность Bosch PKE 645 B22E", selected: false},
    //     {value: "Варочная поверхность Bosch PKE 645 B23E", selected: false},
    // ]

    // const [tableHeaders, setTableHeaders] = React.useState([
    //     {title:"№", mode:"text", column_width: "30px", listValue: []}, 
    //     {title:"Категория", mode:"inputList", column_width: "130px", listValue: goodsCategories2}, 
    //     {title:"Подкатегория", mode:"inputList", column_width: "130px", listValue: goodsCategories3}, 
    //     {title:"Наименование", mode:"inputList", column_width: "110px", listValue: goodsType}, 
    //     {title:"Ожидаемое количество", mode:"input", column_width: "70px", listValue: []},
    //     {title:"Кол-во коробок", mode:"input", column_width: "70px", listValue: []},
    //     {title:"", mode:"remove", column_width: "50px", listValue: []},
    // ]) 

    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,   width:160   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,   width:170   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,   width:200   }, 
        {name: 'orderedAmount',     title:'Ожидаемое кол-во',   editingEnabled:false,   width:150   },
        {name: 'amount',            title:'Кол-во коробок',     editingEnabled:true,    width:130   }
    ]) 
    var  tableSettings = {add:false, edit:true, delete:false}

    //var table_field_height = "160px"

    const [tableList, setTableList] = React.useState([])
    //var table_list = [[0,"Встраиваемая техника","Варочные поверхности","Варочная поверхность Bosch PKE 645 B17E","0",true],];
    

    function apiGetGoodsByShipmentOrder() {
        var xhr = new XMLHttpRequest();
        var order = ''
        orders.forEach(element => {
          if (element.selected == true) order = element
        });

        console.log("order.code")
        console.log(order.code)
    
        if (order != ''){
             //console.log("Selected order " + order.code)
            xhr.open('GET', host+'/shipment_order_goods_by_order'+'?'+`code=${order.code}`, true);
            console.log("StorekeeperAdvent apiGetGoodsByOrder was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetGoodsByOrder answer: ")
                    console.log(answer)
                    var buffer = []
                    var counter = 0;
                    answer.map( function(item, i) {
                    //goods_by_order[i] = {id:i, category: "goods_categories[answer.category-1]", sub_category: "goods_categories2[answer.sub_category_2-1]",  text: "answer.name", amount_ordered: "answer.amount_ordered", amount: "answer.amount", code: foo}
                    goodsType.forEach (function(item2, j) {
                            var it = parseInt(item2.code)
                            if (it.toString() == item.goods.toString()) {
                                //  bar[i] = [i, goodsCategories2[item2.category-1].text, goodsCategories3[item2.sub_category-1].text,  item2.text, item2.ordered, item2.amount, true]
                                buffer[counter] = {number: counter+1, goodsCategories2: goodsCategories2[item2.category-1].text, goodsCategories3: goodsCategories3[item2.sub_category-1].text, goodsType: item2.text, orderedAmount: item.amount, amount: item.amount_real}
                                buffer[counter].id = getId()
                                buffer[counter].code = item.code;
                                counter++
                            }   
                        })
                    })
                    setTableList(buffer)
            
                }
            }
            xhr.send(null);
        }
       
    }
        
    //-------------------------------------стол 1 конец

    const [date, setDate] = React.useState("2022-01-14")
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
           
            apiUpdateOrderGoods(tableList)
            
        else apiGetGoodsByShipmentOrder()
        //if (check) props.func2(temp_table_list)
        //console.log(temp_table_list)
    }
    //-------------------------------------------------------------------------Блок 2 конец
    //-------------------------------------------------------------------------Блок 3
    function onBlock3FileUploaded(files){
        files.map(doc=>{
            console.log("block 3 document: " + doc.name)
        })
    }
    var good_category; function set_good_category(value) {good_category = value}
    var one_shipment_amount; function set_one_shipment_amount(value) {one_shipment_amount = value}
    var warranty_good; function set_warranty_good(value) {warranty_good = value}
    var shipment_deadline; function set_shipment_deadline(value) {shipment_deadline = value}
    var amount_of_shipments; function set_amount_of_shipments(value) {amount_of_shipments = value}
    var good_cost; function set_good_cost(value) {good_cost = value}
    var provider_2; function set_provider_2(value) {provider_2 = value}

    //-------------------------------------стол 2
    var table_headers_2 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Наименование", mode:"text", column_width: "110px", listValue: []}, 
        {title:"Прогресс доставки (шт)", mode:"text", column_width: "70px", listValue: []}, 
        {title:"Вес (кг)", mode:"text", column_width: "70px", listValue: []}, 
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_2 = "100px"

    var table_list_2 = [
        [0, "Встраиваемая техника №5", "10/50", "50",  false],
        [1, "Встраиваемая техника №6", "15/50", "40",  false],
        [2, "Встраиваемая техника №7", "8/50", "71",  false],

    ]
    function set_table_list_2(value) {
        table_list_2 =value
    }
    //-------------------------------------стол 2 конец

    function btn_send_2() {
        console.log("good_category = " + good_category)
        console.log("one_shipment_amount = " + one_shipment_amount)
        console.log("warranty_good = " + warranty_good)
        console.log("shipment_deadline = " + shipment_deadline)
        console.log("amount_of_shipments = " + amount_of_shipments)
        console.log("good_cost = " + good_cost)
        console.log("provider_2 = " + provider_2)
        console.log(table_list_2)

    }
    //list_with_search_items.map(function(item,i){ item.id = i })
    
    //-------------------------------------------------------------------------Блок 3 конец
//#endregion
    
//#region api

function apiGetGoodsCat() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host+'/goods_cat', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
        var answer = JSON.parse(this.response)
        answer.map( function(item, i) {
            console.log(this.responseText);
        })
        }
    }
    xhr.send(null);
}
      
function apiGetGoodsSubCat4() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host+'/goods_subcat4', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(this.responseText);
        }
    }
    
    xhr.send(null);
}

function apiUpdateOrderGoods(value) {
    value.map(function(element, i){
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', host+'/update_order_goods'+'?'+`amount=${element.amount}&code=${element.code}`, true);
      
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(this.responseText);
            
        
            setOrders([])
            setTableList([])
            apiGetGoodsType()
          }
        }
        
        xhr.send(null);
    })
    alert("Изменения успешно приняты")
    
}

//#endregion категории с первой вкладки конец

//#region Страница 1 подстраница 1

//#endregion Страница 1 подстраница 1 конец
//#endregion


    return (
        <>
            <SwitchHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage Id={getId()}>
                <FlexibleBlock>
                    <ListWithSearch Id={getId()} item_list={orders} func={setOrdersForced} width={list_with_search_width} height={list_with_search_height}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Прием товаров</div>
                    <div class="low_text row_with_item_wide"><div>Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={date} func={setDate}/></div>
                    {/* <div class="low_text row_with_item_wide"><div>Товар&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_1[3].value} list={expand_imput_list_1} func={set_expand_list_input_1}  i={0} j={0}/></div> */}
                    {/* <InputText styles = "row_with_ite   m_wide" Id={getId()} label="Поставщик" placeholder="Поставщик" set={set_provider_1}/> */}
                    {/* <div class="low_text"><InputFile Id={getId()} func={setDocuments}/></div> */}
                    {/* <Table Id={getId()} table_headers={tableHeaders} table_field_height={table_field_height} table_list={tableList} func={setTableList} numb={0} search="true" add="true" delete="true"/> */}
                
                    <div style={{width:"min-content", display:'inline-table'}} >
                        <TableComponent height={245} columns={tableHeaders} rows={tableList} setNewTableList={setTableList}  tableSettings={tableSettings}/>
                    </div>
                    <div></div>
                    <div class="place_holder"/><button class="bt_send" onClick={btn_send_1}>Отправить</button>
                </FlexibleBlock>
                    {/* <FlexibleBlock>
                    <div class="header_text">Заказ 1</div>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Категория" placeholder="Категория товара" set={set_good_category}/>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Кол-во товара в поставке&nbsp;" placeholder="Кол-во товара в поставке" set={set_one_shipment_amount}/>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Гарантия" placeholder="Гарантия" set={set_warranty_good}/>
                    <div class="low_text row_with_item_equal"><div>Крайний срок поставки&nbsp;</div><InputDate Id="2" func={set_shipment_deadline}/></div>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Кол-во партий товара&nbsp;" placeholder="Кол-во партий товара" set={set_amount_of_shipments}/>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Цена&nbsp;" placeholder="Цена" set={set_good_cost}/>
                    <InputText styles = "row_with_item_equal" Id={getId()} label="Поставщик" placeholder="Поставщик" set={set_provider_2}/>
                    <div class="low_text"><InputFile Id={getId()} func={onBlock3FileUploaded}/></div>
                    <Table Id={getId()} table_headers={table_headers_2} table_field_height={table_field_height_2} table_list={table_list_2} func={set_table_list_2} numb={1} search="true" add="false" delete="false"/>
                </FlexibleBlock> */}
                    {/* <div style={{width:800+'px', display:'block'}} >
                        <Table2 columns={tableHeaders2} rows={table_list} setNewTableList={setTableList2}/>
                    </div> */}
            </FlexibleBlocksPage>
        </>
    )
}
