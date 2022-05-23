import React from "react";
import './ExpandListInputRegular.css';

export default function ExpandListInputRegular(props){

    /*
    let [expandList1, setExpandList1]  = React.useState([
        {value: "Встраиваемая техника"     },
        {value: "Стиральные машины"        },
        {value: "Сушильные машины"         },
        {value: "Холодильники"             },
        {value: "Морозильные камеры"       },
        {value: "Винные шкафы"             },
        {value: "Вытяжки"                  },
        {value: "Плиты"                    },
        {value: "Посудомоечные машины"     },
        {value: "Мелкая бытовая техника"   },
        {value: "Микроволновые печи"       },
        {value: "Электродуховки"           },
        {value: "Пылесосы"                 },
        {value: "Водонагреватели"          },
        {value: "Кулеры и пурифайеры"      },
        {value: "Швейные машины, оверлоки" }
    ])
    let [expandListValue1, setExpandListValue1]  = React.useState(expandList1[0].value)

    <div class="low_text row_with_item_equal"><div>Категория&nbsp;</div><ExpandListInputRegular width={300} list={expandList1} func={setExpandListValue1}/></div>
     */

    return (
           <select style={{width:props.width, listStyle: "none"}} onChange={evt=>props.func(evt.target.value)}>
            {
               props.list.map(function(item, i){
                  return <option value={item.value} selected={props.defValue.value == item.value}>{item.value}</option>
               })
            }
          </select>
    )


}