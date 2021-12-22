import React, { Component, Fragment } from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputDate from "../../components/InputDate/InputDate";
import InputFile from "../../components/InputFile/InputFile";

const styles = {

  }

  var table_headers = ["№", "Наименование", "Категория", "Кол-во коробок"]
  
  var table_list = [
      [0, "Морковка", "Овощи", 20],
      [0, "Капуста", "Овощи", 10],
    ]
  var i = 0;


export default function StorekeeperAdvent(){
    i=0
    table_list.map(item=>{
        i++;
        item[0] = i;
    })

    function onBlock2FileUploaded(files){
        files.map(doc=>{
            console.log("block 2 document: " + doc.name)
        })
    }

    function onBlock3FileUploaded(files){
        files.map(doc=>{
            console.log("block 3 document: " + doc.name)
        })
    }

    function onBlock2DateUploaded(date){
        console.log("block 2 date: " + date)
    }

    function onBlock3DateUploaded(date){
        console.log("block 3 date: " + date)
    }

    return (
        <FlexibleBlocksPage>
            {/* <FlexibleBlock>
                <div class = "shipment_code_block">
                </div>
            </FlexibleBlock> */}
            <FlexibleBlock>
                <div class="header_text">Прием&nbsp;товаров</div>
                <div class="low_text row_with_item_wide"><div>Дата&nbsp;приема&nbsp;</div><InputDate Id="1" func={onBlock2DateUploaded}/></div>
                <div class="low_text"><InputFile Id="1" func={onBlock2FileUploaded}/></div>
                <Table table_headers={table_headers} table_list={table_list} />
                <div class="place_holder"/><button class="bt_send">Отправить</button>
            </FlexibleBlock>
            <FlexibleBlock>
                    <div class="header_text">Заказ 1</div>
                    <div class="low_text row_with_item_equal"><div>Категория&nbsp;</div><input class="input" placeholder="Категория товара"/></div>
                    <div class="low_text row_with_item_equal"><div>Товар&nbsp;</div><input class="input" placeholder="Тип товара"/></div>
                    <div class="low_text row_with_item_equal"><div>Суммарное&nbsp;кол-во&nbsp;товара&nbsp;</div><input class="input" placeholder="Кол-во товара"/></div>
                    <div class="low_text row_with_item_equal"><div>Кол-во&nbsp;товара&nbsp;в&nbsp;поставке&nbsp;</div><input class="input" placeholder="Кол-во товара в поставке"/></div>
                    <div class="low_text row_with_item_equal"><div>Гарантия&nbsp;</div><input class="input" placeholder="Гарантия"/></div>
                    <div class="low_text row_with_item_equal"><div>Крайний&nbsp;срок&nbsp;поставки&nbsp;</div><InputDate Id="2" func={onBlock3DateUploaded}/></div>
                    <div class="low_text row_with_item_equal"><div>Кол-во&nbsp;партий&nbsp;товара&nbsp;</div><input class="input" placeholder="Кол-во партий товара"/></div>
                    <div class="low_text row_with_item_equal"><div>Вес&nbsp;ед&nbsp;продукции&nbsp;</div><input class="input" placeholder="Вес ед продукции"/></div>
                    <div class="low_text row_with_item_equal"><div>Цена&nbsp;</div><input class="input" placeholder="Цена"/></div>
                    <div class="low_text row_with_item_equal"><div>Поставщик&nbsp;</div><input class="input" placeholder="Поставщик"/></div>
                    <div class="low_text"><InputFile Id="2" func={onBlock3FileUploaded}/></div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}