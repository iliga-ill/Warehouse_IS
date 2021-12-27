import React from "react";
import './InputText.css';

export default function InputText(props){
    //console.log(props.tabs.length)

    function onChange() {
        props.set(document.getElementById(props.Id).value)
    }

    var style = "low_text " + props.styles

    return (
        <div class={style} ><div>{props.label}</div><input id={props.Id} class="inputText" placeholder={props.placeholder} onChange={onChange}/></div>
    )
}