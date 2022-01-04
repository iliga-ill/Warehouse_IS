import React from "react";
import './InputDate.css';

export default function InputDate(props){
    
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

    function onDateChange() {
        var date_input = document.getElementById(props.Id);
        props.func(date_input.value)
    }

    return (
       <input class="input_date" type="date" id={props.Id} onChange={onDateChange} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
    )
}