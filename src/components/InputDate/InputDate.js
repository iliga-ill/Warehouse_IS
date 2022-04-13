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
   <InputDate Id={getId()} defValue={"2022-01-14"} func={set_date}/>
   */

    return (
       <input class="input_date" type="date" defaultValue={props.defValue} onChange={evt=>props.func(evt.target.value)} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
    )
}