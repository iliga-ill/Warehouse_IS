import React from "react";
import './InputTextArea.css';
import AlertMessagebox from "../../components/Messagebox/AlertMessagebox.js";

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

    function onChange(e){
        if(props.mask != undefined && props.maskExample!=undefined && e.target.value.toString().match(props.mask)==null){
            setIsAlertMessageboxOpened(true)
            props.set(lastValue)
            e.target.value = lastValue
        }else{
            lastValue = e.target.value
            props.set(e.target.value)
        }
   }

    var style = "low_text " + props.styles
    var styles = {
        style1:{
            resize:"vertical"
            // width: "auto"
        } 
    }
    var list=[{}]

    return (
        <>
            {list.map(function(item,i){
                if (i==0) {
                    if (props.change != undefined && !props.change) {
                        return <div class={style} ><div>{props.label}</div><textarea class="textareaHeight" value={props.defValue} placeholder={props.placeholder} onChange={e=>onChange(e)}/></div>
                    } else {
                        return <div class={style} ><div>{props.label}</div><textarea class="textareaHeight" defaultValue={props.defValue} placeholder={props.placeholder} onChange={e=>onChange(e)}/></div>
                    }
                }
            })}
            <AlertMessagebox
                title={"Внимание!"}
                message={`Значение должно ${props.maskExample}`}
                isOpened={isAlertMessageboxOpened} 
                onOk={()=>{setIsAlertMessageboxOpened(false)}} 
                // onAccept={()=>{this.setState({isAlertMessageboxOpened: false});this.setSelectedRackTypeIdFromBuf()}} 
                // onCancel={()=>{this.setState({isAlertMessageboxOpened: false});this.setState({selectedRackTypeId: this.selectedRackTypeIdLast}); }}
            />
        </>
    )
}