import React from "react";
import './Table.css';

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
    //console.log(props.tabs.length)
    grid_template_columns=""
    props.table_headers.map(function(item, i){
        grid_template_columns += " " + props.table_headers[i].column_width
    })
    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns
    if (styles.scroll.height != props.table_field_height) styles.scroll.height = props.table_field_height

    var tableData=props.table_list

    function onInputChange(Id, j, i){
        // console.log("id: " + Id)
        // console.log("id: " + j)
        // console.log("id: " + i)
        if (document.getElementById(Id) != null){
            tableData[j][i]=document.getElementById(Id).value
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
            <div style={styles.scroll} class="marginVertical">
                <div class="low_table_text middle" style={styles.table}>
                    {props.table_list.map(function(item, j){
                        return (<>{
                            item.map(function(item, i) {
                                if (props.table_headers[i].mode == "text")
                                    return <div class="border middle">{item}</div>
                                else if (props.table_headers[i].mode == "input")
                                    //return <input id={props.Id+"_"+j+"_"+i} class="input" defaultValue={item} onChange={onInputChange} Id={props.Id+"_"+j+"_"+i} j={j} i={i} placeholder={""}/>
                                    return <input id={props.Id+"_"+j+"_"+i} class="middle input" defaultValue={item} onChange={e => onInputChange(e.target.id, j, i)} placeholder={""}/>
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