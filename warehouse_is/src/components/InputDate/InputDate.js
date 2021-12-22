import React from "react";
import './InputDate.css';

export default function InputDate(props){
    //console.log(props.tabs.length)

    function onDateChange() {
        var date_input = document.getElementById("date_input_" + props.Id);
        //list, value, valueAsDate, valueAsNumber.
        props.func(date_input.value)
    }

    return (
       <input class="input_date" type="date" id={"date_input_" + props.Id} onChange={onDateChange} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
    )
}