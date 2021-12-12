import React from "react";
import './TabHolder.css';

export default function TabHolder(props){
    //console.log(props.tabs.length)
    return (
        <div class="tabHolder">
            {
                props.tabs.map(item=>{
                    if (item.selected){
                        return (
                            <div class="tab selected">
                                <a>{item.title}</a>
                            </div>
                        )
                    } else{
                        return(
                            <div class="tab unselected" onClick={()=>props.onTabClick(item.id)}>
                             <a>{item.title}</a>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}