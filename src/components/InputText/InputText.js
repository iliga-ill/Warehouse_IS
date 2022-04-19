import React from "react";
import './InputText.css';
import PhoneInput from 'react-phone-input-2'

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

   function onChangeValue(value){
       if (props.mask != undefined){
            // if (value.match(item.mask))
            //     props.set(value)
            // else 
                // alert(`Значение в поле ${s} в строке №${s} должно ${s}`)
       }

    
   }


    var style = "low_text " + props.styles

    return (
        <div class={style}>
            <div>{props.label}</div>
            {props.type=="phone"
                ?<PhoneInput country={'ru'} placeholder="phone" value={props.defValue} onChange={phone => props.set(phone)} disableDropdown={true}/>
                :<input defaultValue={props.defValue} placeholder={props.placeholder} onEndedCapture={console.log("signal")} onChange={evt => props.set(evt.target.value)}/>
            }
            
            
        </div>
    )
}