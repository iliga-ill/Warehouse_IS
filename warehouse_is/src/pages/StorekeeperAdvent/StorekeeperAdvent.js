import React from "react";
import './StorekeeperAdvent.css';
import Table from "../../components/Table/Table";

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
        <div class = "page">
            <div class = "shipment_code_block">

            </div>
            <div class = "advent_block">
                <div class = "advent_block_desk darkgray">
                    <div class = "advent_block_desk">
                        <div class="advent_header">Прием товаров</div>
                        <div class="low_text">
                            <div class="inline-block">Дата приема&nbsp;</div>
                            <div class="inline-block">Поле для выбора даты</div>
                        </div>
                        <div class="low_text">
                            <div class="inline-block">Документ&nbsp;</div>
                            <div class="inline-block">Поле для добавления документа</div>
                        </div>
                        <Table table_headers={table_headers} table_list={table_list} />
                        
                        <div class="mb">
                            <div class="place_holder inline-block"/>
                            <button class="bt_send inline-block">Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "shipment_innards_block">
                <div class = "advent_block_desk darkgray">
                    <div class = "advent_block_desk">
                        <div class="advent_header">Заказ 1</div>
                        <div class="low_text table_with_field">
                            <div class="">Категория&nbsp;</div>
                            <div class=""><input class="input"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}