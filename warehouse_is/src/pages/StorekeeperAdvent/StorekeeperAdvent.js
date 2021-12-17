import React from "react";
import './StorekeeperAdvent.css';

const styles = {

  }
  
  var list = [
      {id:0, product_name: "Морковка", category: "Овощи", box_amount: 20},
      {id:1, product_name: "Капуста", category: "Овощи", box_amount: 10},
    ]
  var i = 0;

export default function StorekeeperAdvent(){
    return (
        <div class = "page">
            <div class = "shipment_code_block">

            </div>
            <div class = "advent_block">
                <div class = "advent_block_desk darkgray">
                    <div class = "advent_block_desk">
                        <div class="advent_header">Прием товаров</div>
                        <div class="row_with_field low_text">
                            <div class="inline-block">Дата приема&nbsp;</div>
                            <div class="inline-block">Поле для выбора даты</div>
                        </div>
                        <div class="row_with_field low_text">
                            <div class="inline-block">Документ&nbsp;</div>
                            <div class="inline-block">Поле для добавления документа</div>
                        </div>
                        <div class="table middle">
                            <div class="low_text middle border"><a>№</a></div>
                            <div class="low_text middle border">Наименование</div>
                            <div class="low_text middle border">Категория</div>
                            <div class="low_text middle border">Кол-во коробок</div>
                        </div>
                            {list.map(item=>{
                                i++;
                                return (
                                    <div class="table">
                                        <div class="low_text border">{i-1}</div>
                                        <div class="low_text border">{item.product_name}</div>
                                        <div class="low_text border">{item.category}</div>
                                        <div class="low_text border">{item.box_amount}</div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
            <div class = "shipment_innards_block">

            </div>
        </div>
    )
}