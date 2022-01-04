import React from "react";
import './Table.css';
import ExpandListInput from "../ExpandListInput/ExpandListInput";

var grid_template_columns=""

var styles = {
    table: {
        display: "grid",
        gridTemplateColumns: "",
        height: "max-content",
    },
    scroll: {
        height: "",
        overflowY: "scroll",
    }
}

export default function Table(props){

    //requiered data
    /*
    var id=0
    function getId(){
        id++
        return id-1
    }

    var table_list_value = [
        {value: "Стиральные машины", selected: true},
        {value: "Пылесосы", selected: false},
        {value: "Утюги", selected: false},
        {value: "Вытяжки", selected: false},
    ]

    var table_headers = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Наименование", mode:"text", column_width: "100px", listValue: []}, 
        // {title:"Категория", mode:"text", column_width: "70px", listValue: table_list_value}, 
        {title:"Категория", mode:"inputList", column_width: "160px", listValue: table_list_value}, 
        {title:"Кол-во коробок", mode:"input", column_width: "70px", listValue: []}
    ]

    var  table_field_height = "100px"

    var table_list = [
        [0, "Стиральная машина А30", "Стиральные машины", "20"],
        [0, "Утюг В3000", "Утюги", "10"],
        [0, "Вытяжка S240", "Вытяжки", "10"],
        [0, "Утюг Ж510", "Утюги", "10"],
    ]
    function set_table_list_1(value) {table_list = value}
    */

    //pattern
    /*
    <Table Id={getId()} table_headers={table_headers} table_field_height={table_field_height} table_list={table_list} func={set_table_list_1}/>
    */
    
    grid_template_columns=""
    props.table_headers.map(function(item, i){
        grid_template_columns += " " + props.table_headers[i].column_width
    })
    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns
    if (styles.scroll.height != props.table_field_height) styles.scroll.height = props.table_field_height

    var tableData=props.table_list

    function onInputChange(Id, j, i){
        if (document.getElementById(Id) != null){
            tableData[j][i]=document.getElementById(Id).value
            props.func(tableData)
        }
    }

    function onListInputChange(value, i, j){
        if (value != null && i!=undefined && j!= undefined){
            value.map(item=>{
                if (item.selected) 
                tableData[j][i]=item.value
            })
            props.func(tableData)
        }
    }
    
    return (
        <>
            <div class="low_table_text middle" style={styles.table}>
                {props.table_headers.map(item=>{
                    return <div class="border middle">{item.title}</div>
                })}
            </div>
            <div style={styles.scroll} class="scroll_field">
                <div class="low_table_text middle" style={styles.table}>
                    {props.table_list.map(function(item, j){
                        return (<>{
                            item.map(function(item, i) {
                                if (props.table_headers[i].mode == "text")
                                    return <div class="border middle">{item}</div>
                                else if (props.table_headers[i].mode == "input")
                                    return <input id={props.Id+"_"+j+"_"+i} class="middle input" defaultValue={item} onChange={e => onInputChange(e.target.id, j, i)} placeholder={""}/>
                                else if (props.table_headers[i].mode == "inputList")
                                    return <ExpandListInput class="border middle" Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} i={i} j={j} func={onListInputChange}/>
                            })
                        }</>)
                    })}
                </div>
            </div>
            <div class="low_table_text middle" style={styles.table}>
                {props.table_headers.map(function(item,i){
                    if (i==0) 
                        return (
                            <div class="middle border">
                                <img className="plus_icon" src={`${process.env.PUBLIC_URL}/src/images/plus_icon.png`} alt="plus_icon"/>
                            </div>
                            )
                    else
                        return <div class="border"></div>
                })} 
            </div>
        </>
    )
}