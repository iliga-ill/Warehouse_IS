import React from "react";
import './Table.css';

var grid_template_columns=""

var styles = {
    table: {
        display: "grid",
        gridTemplateColumns: "",
        height: "max-content",
    }
}



export default function Table(props){
    //console.log(props.tabs.length)
    grid_template_columns=""
    props.table_headers.map(function(item, i){
        grid_template_columns += " max-content"
    })
    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns

    var tableData=props.table_list

    function onInputChange(id, j, i){
        console.log("id: " + id)
        if (document.getElementById(id) != null){
            tableData[j][i]=document.getElementById(id).value
            props.func(tableData)
        }
    }
    
    return (
        <div class="low_text middle" style={styles.table}>
            {props.table_headers.map(item=>{
                return <div class="border">{item.title}</div>
            })}
            {props.table_list.map(function(item, j){
                return (<>{
                    item.map(function(item, i) {
                        if (props.table_headers[i].mode == "text")
                            return <div class="border">{item}</div>
                        else if (props.table_headers[i].mode == "input")
                            return <input id={props.Id+"_"+j+"_"+i} class="input" defaultValue={item} onChange={onInputChange(props.Id+"_"+j+"_"+i, j, i)} placeholder={""}/>
                    })
                }</>)
            })}
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
    )
}