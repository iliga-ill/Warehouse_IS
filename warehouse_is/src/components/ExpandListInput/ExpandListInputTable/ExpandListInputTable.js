import React from "react";
import './ExpandListInputTable.css';

export default function ExpandListInputTable(props){

    //requiered data
    /*
    var id=0
    function getId(){
        id++
        return id-1
    }
    var expand_imput_list_1 = [
        {id: 0, value: "Морковка", selected: true},
        {id: 1, value: "Морковка1", selected: false},
        {id: 2, value: "Морковка2", selected: false},
        {id: 3, value: "Морковка3", selected: false},
    ]
    function set_expand_list_input_1(value) {expand_imput_list_1=value}
    */

    //pattern
    /*
    <ExpandListInput Id={getId()} defValue={expand_imput_list_1[3].value} list={expand_imput_list_1} func={set_expand_list_input_1}  i={0} j={0}/>
    */
    
    var itemList = props.list

    function option_selected(Id, item_id, i) {
        itemList.map(item=>{
            if (item.value==document.getElementById(Id).value) item.selected = true
            else item.selected = false
        })
        props.func(itemList, item_id, i)
    }

    props.list.map(item=>{
        if (item.value == props.defValue) item.selected = true
        else item.selected = false
    })
    props.func(itemList)

    var defVal = props.defValue
    var check = false
    itemList.map(item=>{
        if (defVal == item.value) check=true
    })
    if (!check) {
        console.log(props.list[0])
        defVal = props.list[0].value
        changeDef(props.item_id, props.i)
    }

    function changeDef(item_id, i) {
        itemList.map(item=>{
            if (item.value==defVal) item.selected = true
            else item.selected = false
        })
        props.func(itemList, item_id, i)
    }

    return (
           <select id={props.Id} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave} defaultValue={defVal} onChange={e => option_selected(props.Id, props.item_id, props.i)}>
            {
               props.list.map(function(item, i){
                  return <option value={item.value}>{item.value}</option>
               })
            }
          </select>
    )


}