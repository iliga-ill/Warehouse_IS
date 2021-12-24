import React from "react";
import './InputText.css';

export default function InputText(props){
    //console.log(props.tabs.length)

    function onChange() {
        props.set(document.getElementById(props.Id).value)
    }

    return (
        <div class="low_text row_with_item_equal"><div>{props.label}</div><input id={props.Id} class="input" placeholder={props.placeholder} onChange={onChange}/></div>
    )
}