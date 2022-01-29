import React from "react";
import './InputTextArea.css';

export default function InputTextArea(props){
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

    function onChange(id) {
        props.set(document.getElementById(id).value)
    }

    var style = "low_text " + props.styles
    var styles = {
        style1:{
            // width: props.width + "px"
            width: "auto"
        } 
    }

    return (
        <div class={style} ><div>{props.label}</div><textarea class="textareaHeight" class={styles.style1} id={props.Id} defaultValue={props.defValue} placeholder={props.placeholder} onChange={e=>onChange(props.Id)}/></div>
    )
}