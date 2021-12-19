import React from "react";
import './Table.css';

var i=0
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
    
    return (
        <div class="low_text middle" style={styles.table}>
            {props.table_headers.map(item=>{
                return <div class="border">{item}</div>
            })}
            {props.table_list.map(item=>{
                return (<>{
                    item.map(item => {
                        return <div class="border">{item}</div>
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