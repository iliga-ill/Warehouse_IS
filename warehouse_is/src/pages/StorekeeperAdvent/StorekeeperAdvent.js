import React, { Component, Fragment } from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";
import InputText from "../../components/InputText/InputText";

const styles = {

  }

  var table_headers = [
      {title:"№", mode:"text"}, 
      {title:"Наименование", mode:"text"}, 
      {title:"Категория", mode:"text"}, 
      {title:"Кол-во коробок", mode:"input"}
    ]
  
export default function StorekeeperAdvent(){

    var id=0
    function getId(){
        id++
        return id-1
    }
    
    var [table_list, setReload] = React.useState([
        [0, "Морковка", "Овощи", 20],
        [0, "Капуста", "Овощи", 10],
        [0, "Капуста", "Овощи", 10],
        [0, "Капуста", "Овощи", 10],
      ])
    function set_table_list(value) {setReload(table_list = value)}

    var provider_1; function set_provider_1(value) {provider_1 = value}
    var date; function set_date(value) {date = value}
    var documents; function set_documents(value) {documents = value}
    
    function btn_send_1() {
        console.log("date = " + date)
        console.log("provider_1 = " + provider_1)
        console.log(
            documents.map(doc=>{
                console.log("document: " + doc.name)
            })
        )
        console.log(table_list)
    }

    

    //Блок с заказом
    // function onBlock3FileUploaded(files){
    //     files.map(doc=>{
    //         console.log("block 3 document: " + doc.name)
    //     })
    // }
    // var good_category; function set_good_category(value) {good_category = value}
    // var good; function set_good(value) {good = value}
    // var goods_sum; function set_goods_sum(value) {goods_sum = value}
    // var one_shipment_amount; function set_one_shipment_amount(value) {one_shipment_amount = value}
    // var warranty_good; function set_warranty_good(value) {warranty_good = value}
    // var shipment_deadline; function set_shipment_deadline(value) {shipment_deadline = value}
    // var amount_of_shipments; function set_amount_of_shipments(value) {amount_of_shipments = value}
    // var good_weight; function set_good_weight(value) {good_weight = value}
    // var good_cost; function set_good_cost(value) {good_cost = value}
    // var provider_2; function set_provider_2(value) {provider_2 = value}

    // function btn_send_2() {
    //     console.log("good_category = " + good_category)
    //     console.log("good = " + good)
    //     console.log("goods_sum = " + goods_sum)
    //     console.log("one_shipment_amount = " + one_shipment_amount)
    //     console.log("warranty_good = " + warranty_good)
    //     console.log("shipment_deadline = " + shipment_deadline)
    //     console.log("amount_of_shipments = " + amount_of_shipments)
    //     console.log("good_weight = " + good_weight)
    //     console.log("good_cost = " + good_cost)
    //     console.log("provider_2 = " + provider_2)
    // }

    var i=0
    table_list.map(item=>{
        i++;
        item[0] = i;
    })

    return (
        <FlexibleBlocksPage>
            {/* <FlexibleBlock>
                <div class = "shipment_code_block">
                </div>
            </FlexibleBlock> */}
            <FlexibleBlock>
                <div class="header_text">Прием товаров</div>
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;приема&nbsp;</div><InputDate Id={getId()} func={set_date}/></div>
                <InputText styles = "row_with_item_wide" Id={getId()} label="Поставщик" placeholder="Поставщик" set={set_provider_1}/>
                <div class="low_text"><InputFile Id={getId()} func={set_documents}/></div>
                <Table Id={getId()} table_headers={table_headers} table_list={table_list} func={set_table_list}/>
                <div class="place_holder"/><button class="bt_send" onClick={btn_send_1}>Отправить</button>
            </FlexibleBlock>
            {/* //Блок с заказом
                <FlexibleBlock>
                <div class="header_text">Заказ 1</div>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Категория" placeholder="Категория товара" set={set_good_category}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Товар" placeholder="Тип товара" set={set_good}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Суммарное кол-во товара&nbsp;" placeholder="Кол-во товара" set={set_goods_sum}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Кол-во товара в поставке&nbsp;" placeholder="Кол-во товара в поставке" set={set_one_shipment_amount}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Гарантия" placeholder="Гарантия" set={set_warranty_good}/>
                <div class="low_text row_with_item_equal"><div>Крайний срок поставки&nbsp;</div><InputDate Id="2" func={set_shipment_deadline}/></div>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Кол-во партий товара&nbsp;" placeholder="Кол-во партий товара" set={set_amount_of_shipments}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Вес ед продукции&nbsp;" placeholder="Вес ед продукции" set={set_good_weight}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Цена&nbsp;" placeholder="Цена" set={set_good_cost}/>
                <InputText styles = "row_with_item_equal" Id={getId()} label="Поставщик" placeholder="Поставщик" set={set_provider}/>
                <div class="low_text"><InputFile Id={getId()} func={onBlock3FileUploaded}/></div>
                <div class="place_holder"/><button class="bt_send" onClick={btn_send_2}>Отправить</button>
            </FlexibleBlock> */}
        </FlexibleBlocksPage>
    )
}