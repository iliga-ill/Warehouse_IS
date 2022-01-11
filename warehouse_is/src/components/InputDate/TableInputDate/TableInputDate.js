import React from "react";
import './TableInputDate.css';

export default function TableInputDate(props){
    
    //requiered data
    /*
    var id=0
    function getId(){
        id++
        return id-1
    }
    var date; function set_date(value) {date = value}
    */
   //pattern
   /*
   <InputDate Id={getId()} func={set_date}/>
   */

    function onDateChange(Id, item_id, i) {
        var date_input = document.getElementById(Id);
        props.func(date_input.value, item_id, i)
    }

    return (
       <input class="table_input_date" type="date" defaultValue={props.defValue} id={props.Id} onChange={e=>onDateChange(props.Id, props.item_id, props.i)} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
    )
}