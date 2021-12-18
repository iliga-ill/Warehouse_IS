import React from "react";
import './Table.css';

var i=0

const styles = {
    table: {
        display: "grid",
        gridTemplateColumns: "",
        height: "max-content",
    }
}

export default function Table(props){
    //console.log(props.tabs.length)
    i=0
    styles.table.gridTemplateColumns = ""
    props.table_headers.map(item=>{
        styles.table.gridTemplateColumns += " max-content"
    })
    
    return (
        <div class="low_text middle" style={styles.table}>
            {props.table_headers.map(item=>{
                return <div class="border">{item}</div>
            })}
            {props.table_list.map(item=>{
                return item.map(item => {
                    return <div class="border">{item}</div>
                })
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