import React from "react";
import './InputText.css';

export default function InputText(props){
    //requiered data
    /*
    function getId(){
        id++
        return id-1
    }
    var provider_1; function set_provider_1(value) {provider_1 = value}
    */
   //pattern
   /*
   <InputText styles = "row_with_item_wide" Id={getId()} label="Поставщик" defValue={"ss"} placeholder="Поставщик" set={set_provider_1}/>
   */

    function onChange() {
        props.set(document.getElementById(props.Id).value)
    }

    var style = "low_text " + props.styles

    return (
        <div class={style} ><div>{props.label}</div><input id={props.Id} defaultValue={props.defValue} placeholder={props.placeholder} onChange={onChange}/></div>
    )
}