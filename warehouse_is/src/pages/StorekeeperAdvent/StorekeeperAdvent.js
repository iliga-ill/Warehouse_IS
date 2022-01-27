import React, { Component, Fragment } from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";
import { Table2 } from "../../components/Table/Table2";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
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

var goods_type_list = [{id:0, text: "", category: "", sub_category: "", ordered: "", amount: "", code: ""}];


export default function StorekeeperAdvent(props){

    const [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }


     
    var id=props.Id
    function getId(){
        id++
        return id-1
    }

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
        if (goodsType != []) apiGetGoodsByOrder()
    }, [orders]);
    function apiGetOrders() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/orders', true);
        console.log("StorekeeperAdvent apiGetOrders was launched")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var answer = JSON.parse(this.response)
                console.log("StorekeeperAdvent apiGetOrders answer: ")
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
            }
        }
        xhr.send(null);
    }


    if (orders.toString()=="" && goodsCategories2.toString()=="" && goodsCategories3.toString()=="" && goodsType.toString()=="") {
        apiGetOrders()
        apiGetGoodsSubCat2()
        apiGetGoodsSubCat3()
        apiGetGoodsType()
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
        {name: 'codeNum', title:'№'}, 
        {name: 'goodsCategories2', title:'Категория'}, 
        {name: 'goodsCategories3', title:'Подкатегория'}, 
        {title:'Наименование', name: 'goodsType'}, 
        {title:'Ожидаемое количество', name: 'orderedAmount'},
        {name: 'amount', title:'Кол-во коробок'}
    ]) 

    const [tableHeaders2, setTableHeaders2] = React.useState([
        {name: 'codeNum', title:'№'}, 
        {name: 'goodsCategories2', title:'Категория2'}, 
        {name: 'goodsCategories3', title:'Подкатегория2'}, 
        {title:'Наименование2', name: 'goodsType'}, 
        {title:'Ожидаемое количество2', name: 'orderedAmount'},
        {name: 'amount', title:'Кол-во коробок2'}
    ]) 

    var table_field_height = "160px"

    const [tableList, setTableList] = React.useState([])
    //var table_list = [[0,"Встраиваемая техника","Варочные поверхности","Варочная поверхность Bosch PKE 645 B17E","0",true],];
    

    function apiGetGoodsByOrder() {
        var xhr = new XMLHttpRequest();
        var order = ''
        orders.forEach(element => {
          if (element.selected == true) order = element
        });
    
        if (order != ''){
             //console.log("Selected order " + order.code)
            xhr.open('GET', host+'/order_goods_by_order'+'?'+`code=${order.code}`, true);
            console.log("StorekeeperAdvent apiGetGoodsByOrder was launched")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var answer = JSON.parse(this.response)
                    console.log("StorekeeperAdvent apiGetGoodsByOrder answer: ")
                    console.log(answer)
                    var bar = [[]]
            
                    answer.map( function(item, i) {
                    var foo = item.goods
                    //goods_by_order[i] = {id:i, category: "goods_categories[answer.category-1]", sub_category: "goods_categories2[answer.sub_category_2-1]",  text: "answer.name", amount_ordered: "answer.amount_ordered", amount: "answer.amount", code: foo}
                    goodsType.forEach (function(item2, j) {
                        var it = parseInt(item2.code)
                        if (it == item.goods) {
                          //  bar[i] = [i, goodsCategories2[item2.category-1].text, goodsCategories3[item2.sub_category-1].text,  item2.text, item2.ordered, item2.amount, true]
                            bar[i] = {"codeNum": i+1, "goodsCategories2": goodsCategories2[item2.category-1].text, "goodsCategories3": goodsCategories3[item2.sub_category-1].text, "goodsType": item2.text, "orderedAmount": item2.ordered, "amount": item2.amount}
                            bar[i].id = i+j;
                            bar[i].code = item2.code;
                        }   
                        
                        })
                    })
                    console.log(`bar`)
                    console.log(bar)
                    setTableList(bar)
            
                }
            }
            xhr.send(null);
        }
       
    }

    // props.order_list.map(function(item,i){
    //     var counter=0;
    //     var str=[]

    //     str[counter++] = i
    //     str[counter++] = item.category
    //     str[counter++] = item.sub_category
    //     str[counter++] = item.text
    //     str[counter++] = item.amount_ordered
    //     str[counter++] = item.amount
    //     str[counter++] = true
    //     temp_table_list[i]=str
    // })
  
    // console.log(temp_table_list[0][1])
    // console.log("--------------")
    // console.log(table_list[0][1])
    // if ( temp_table_list[0][1] != table_list[0][1]) {
    //     table_list = temp_table_list
    //     //render()
    //     //reloadPage()
    // }
       
    
    // var table_list = [
    //     [0, "Встраиваемая техника", "Варочные поверхности", "Встраиваемая техника №34", "10", "10", true],
    //     [1, "Холодильники", "Встраиваемые холодильники", "Холодильники №323", "15", "15", true],
    //     [2, "Плиты", "Кухонные мойки", "Плита №452", "12", "12", true],
    //     [3, "Холодильники", "", "Холодильник №654", "17", "17", true],
    //     [4, "Плиты", "", "Плита №123", "5", "5", true],
    //     [5, "Электродуховки", "Бытовые приборы для дома", "Электродуховка №323", "15", "15", true],
    //     [7, "Электродуховки", "Бытовые приборы для дома", "Электродуховка №345", "16", "11", true],
    // ]
    const [table_list, setTableList2] = React.useState([ 
        {'codeNum': 0, 'goodsCategories2': "Встраиваемая техника", 'goodsCategories3': "Варочные поверхности", 'goodsType': "Встраиваемая техника №34", 'orderedAmount': 10, 'amount': 10},
        {'codeNum': 1, 'goodsCategories2': "Холодильники", 'goodsCategories3': "Встраиваемые холодильники", 'goodsType': "Холодильники №323", 'orderedAmount': 15, 'amount': 15},
        {'codeNum': 2, 'goodsCategories2': "Плиты", 'goodsCategories3': "Кухонные мойки", 'goodsType': "Плита №452", 'orderedAmount': 12, 'amount': 2},
        {'codeNum': 3, 'goodsCategories2': "Холодильники", 'goodsCategories3': "", 'goodsType': "Холодильник №654", 'orderedAmount': 17, 'amount': 17},
        {'codeNum': 4, 'goodsCategories2': "Плиты", 'goodsCategories3': "", 'goodsType': "Плита №123", 'orderedAmount': 5, 'amount': 5},
        {'codeNum': 5, 'goodsCategories2': "Электродуховки", 'goodsCategories3': "Бытовые приборы для дома", 'goodsType': "Электродуховка №323", 'orderedAmount': 15, 'amount': 15},
        {'codeNum': 7, 'goodsCategories2': "Электродуховки", 'goodsCategories3': "Бытовые приборы для дома", 'goodsType': "Электродуховка №345", 'orderedAmount': 16, 'amount': 11}
    ])
        
    //-------------------------------------стол 1 конец

    var date; function set_date(value) {date = value}
    var documents; function set_documents(value) {documents = value}
    
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
            temp_table_list[i] = {id: item[0], category: item[1], sub_category: item[2], text: item[3], amount: item[4], code: item[5]}
        })

        var check=true
        temp_table_list.map(function(item,i){
            if (item.category == ""){
                check=false
                alert("Ошибка, категория не может быть пустой");
            }
            if (item.sub_category == ""){
                check=false
                alert("Ошибка, подкатегория не может быть пустой");
            }
            if (item.text == ""){
                check=false
                alert("Ошибка, Наименование не может быть пустой");
            }
            if (item.amount < 0){
                check=false
                alert("Ошибка, кол-во коробок не может быть отрицательным");
            }
            
        })

        //if (check) props.func2(temp_table_list)
        //console.log(temp_table_list)
    }
    //-------------------------------------------------------------------------Блок 2 конец
    //[0,"Встраиваемая техника","Варочные поверхности","Варочная поверхность Bosch PKE 645 B17E","0",true],];
    

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



//#endregion категории с первой вкладки конец

//#region Страница 1 подстраница 1


  // function apiGetGoodsType() {
  //   var size = goods_by_order.length;
  //   console.log(goods_by_order)
  //   goods_by_order.forEach( function(element, i) {
  //     console.log(`element = ${element.code}`)
  //     var xhr = new XMLHttpRequest();
  //     var elm = i
  //     xhr.open('GET', host+'/goods_type'+'?'+`code=${goods_by_order[elm].code}`, true);
      
  //     xhr.onreadystatechange = function() {
  //       if (xhr.readyState == XMLHttpRequest.DONE) {
  //         var id = goods_by_order[elm].id
          
  //         var answer = JSON.parse(this.response)
  //         console.log(`answer: ${answer}`)
  //         console.log(`Element before: ${goods_by_order[elm].text}`)
  //         element = {id:id, category: goods_categories[answer.category-1], sub_category: goods_categories2[answer.sub_category_2-1],  text: answer.name, amount_ordered: answer.amount_ordered, amount: answer.amount, code: answer.code}
  //         goods_by_order[elm] = element
  //         console.log(`Element: ${goods_by_order[elm].text}`)
       
  //         if (i == size-1) reloadPage()
  //       }
  //     }
      
  //     xhr.send(null);
  //   })
    
  //}
//#endregion Страница 1 подстраница 1 конец
//#endregion


    return (
        <FlexibleBlocksPage Id={getId()}>
            <FlexibleBlock>
                <ListWithSearch Id={getId()} item_list={orders} func={setOrders} width={list_with_search_width} height={list_with_search_height}/>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Прием товаров</div>
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} defValue={"2022-01-14"} func={set_date}/></div>
                {/* <div class="low_text row_with_item_wide"><div>Товар&nbsp;</div><ExpandListInputRegular Id={getId()} defValue={expand_imput_list_1[3].value} list={expand_imput_list_1} func={set_expand_list_input_1}  i={0} j={0}/></div> */}
                {/* <InputText styles = "row_with_ite   m_wide" Id={getId()} label="Поставщик" placeholder="Поставщик" set={set_provider_1}/> */}
                <div class="low_text"><InputFile Id={getId()} func={set_documents}/></div>
                {/* <Table Id={getId()} table_headers={tableHeaders} table_field_height={table_field_height} table_list={tableList} func={setTableList} numb={0} search="true" add="true" delete="true"/> */}
               
                <div style={{width:800+'px', display:'inline-table'}} >
                    <Table2 columns={tableHeaders} rows={tableList} setNewTableList={setTableList}/>
                </div>
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
      
    )

    function rerender() {
        this.forceUpdate()
    }

}
