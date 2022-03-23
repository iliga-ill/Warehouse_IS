import React from "react";
import './ExpandListInputRegular.css';

export default function ExpandListInputRegular(props){

    //requiered data
    /*
    var id=0
    function getId(){
        id++
        return id-1
    }
    var expand_imput_list_1 = [
        {id: 0, value: "Морковка", selected: true},
        {id: 1, value: "Морковка1", selected: false},
        {id: 2, value: "Морковка2", selected: false},
        {id: 3, value: "Морковка3", selected: false},
    ]
    function set_expand_list_input_1(value) {expand_imput_list_1=value}
    */

    //pattern
    /*
    <ExpandListInput Id={getId()} defValue={expand_imput_list_1[3].value} list={expand_imput_list_1} func={set_expand_list_input_1}  i={0} j={0}/>
    */
    const [itemList, setItemList] = React.useState([])
    React.useEffect(() => {console.log("work5");props.func(itemList)}, [itemList]);
    
    if (JSON.stringify(itemList) != JSON.stringify(props.list)){
        setItemList(props.list)
    }
        

    function option_selected(Id) {
        var buf=itemList
        buf.map(item=>{
            if (item.value==document.getElementById(Id).value) item.selected = true
            else item.selected = false
        })
        setItemList(buf)
    }

    if (itemList.toString() == ""){
        var buf=props.list
        buf.map(item=>{
            if (item.value == props.defValue) item.selected = true
            else item.selected = false
        })
        setItemList(buf)
    }

    return (
           <select id={"expand_list_"+props.Id} defaultValue={props.defValue} onChange={e => option_selected("expand_list_"+props.Id)}>
            {
               itemList.map(function(item, i){
                  return <option value={item.value}>{item.value}</option>
               })
            }
          </select>
    )


}