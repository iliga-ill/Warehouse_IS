import React from "react";
import './InputText.css';
import PhoneInput from 'react-phone-input-2'
import AlertMessagebox from "../../components/Messagebox/AlertMessagebox.js";


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
   <InputText styles = "row_with_item_wide" Id={getId()} label="Поставщик" defValue={"ss"} placeholder="Поставщик" set={set_provider_1} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/>
    mask={/^(.)(.*)$/i} maskExample="быть заполнено"
    mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"
    mask={/^[-0-9]{0,10}$/i} maskExample="быть числом"
    mask={/^[1-9][0-9]{0,10}$/i} maskExample="быть числом больше единицы"
    mask={/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/i} maskExample="соответствовать шаблону +7 (930) 442-5665"
    mask={/^(.)(.*)(.@.*)\.(.)(.)$/i} maskExample="соответствовать шаблону example@service.ru"
   */
    const [isAlertMessageboxOpened, setIsAlertMessageboxOpened] = React.useState(false)

    let lastValue = props.defValue!=undefined?props.defValue:undefined

   function onChangeValue(evt){
        if(props.mask != undefined && props.maskExample!=undefined && evt.target.value.toString().match(props.mask)==null){
            setIsAlertMessageboxOpened(true)
            props.set(lastValue)
            evt.target.value = lastValue
        }else{
            if (evt.target != undefined){
                lastValue = evt.target.value
                props.set(evt.target.value)
            }else{
                lastValue = evt
                props.set(evt)
            }
            
        }
   }


    var style = "low_text " + props.styles

    return (
        <div class={style}>
            <div>{props.label}</div>
            {props.type!=undefined && props.type=="phone"
                ?<PhoneInput country={'ru'} placeholder="phone" value={props.defValue} onChange={phone => onChangeValue(phone)} disableDropdown={true}/>
                :<input defaultValue={props.defValue} placeholder={props.placeholder} 
                // onEndedCapture={} 
                onChange={evt => onChangeValue(evt)}/>
            }
            <AlertMessagebox
                title={"Внимание!"}
                message={`Значение должно ${props.maskExample}`}
                isOpened={isAlertMessageboxOpened} 
                onOk={()=>{setIsAlertMessageboxOpened(false)}} 
                // onAccept={()=>{this.setState({isAlertMessageboxOpened: false});this.setSelectedRackTypeIdFromBuf()}} 
                // onCancel={()=>{this.setState({isAlertMessageboxOpened: false});this.setState({selectedRackTypeId: this.selectedRackTypeIdLast}); }}
            />
        </div>
    )
}