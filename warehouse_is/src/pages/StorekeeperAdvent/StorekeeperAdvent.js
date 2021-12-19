import React from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";

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
    return (
        <FlexibleBlocksPage>
            {/* <FlexibleBlock>
                <div class = "shipment_code_block">
                </div>
            </FlexibleBlock> */}
            <FlexibleBlock>
                <div class = "advent_block_inner pl pr">
                    <div class="advent_header">Прием&nbsp;товаров</div>
                    <div class="low_text row_with_item"><div>Дата&nbsp;приема&nbsp;</div><div>Поле_для_выбора_даты</div></div>
                    <div class="low_text row_with_item"><div>Документ&nbsp;</div><div>Поле_для_добавления_документа</div></div>
                    <Table styles="" table_headers={table_headers} table_list={table_list} />
                    <div class="mb">
                            <div class="place_holder inline-block"/>
                            <button class="bt_send inline-block">Отправить</button>
                    </div>
                </div>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class = "advent_block_inner pl pr">
                    <div class="advent_header">Заказ 1</div>
                    <div class="low_text row_with_item"><div>Категория&nbsp;</div><input class="input" placeholder="Категория товара"/></div>
                    <div class="low_text row_with_item"><div>Товар&nbsp;</div><input class="input" placeholder="Тип товара"/></div>
                    <div class="low_text row_with_item"><div>Суммарное кол-во товара&nbsp;</div><input class="input" placeholder="Кол-во товара"/></div>
                    <div class="low_text row_with_item"><div>Кол-во товара в поставке&nbsp;</div><input class="input" placeholder="Кол-во товара в поставке"/></div>
                    <div class="low_text row_with_item"><div>Гарантия&nbsp;</div><input class="input" placeholder="Гарантия"/></div>
                    <div class="low_text row_with_item"><div>Крайний срок поставки&nbsp;</div><div>Поле_для_выбора_даты</div></div>
                    <div class="low_text row_with_item"><div>Кол-во партий товара&nbsp;</div><input class="input" placeholder="Кол-во партий товара"/></div>
                    <div class="low_text row_with_item"><div>Вес ед продукции&nbsp;</div><input class="input" placeholder="Вес ед продукции"/></div>
                    <div class="low_text row_with_item"><div>Цена&nbsp;</div><input class="input" placeholder="Цена"/></div>
                    <div class="low_text row_with_item"><div>Поставщик&nbsp;</div><input class="input" placeholder="Поставщик"/></div>
                    <div class="low_text row_with_item"><div>Документ&nbsp;</div><div>Поле_для_добавления_документа</div></div>
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}