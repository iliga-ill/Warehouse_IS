import React from "react";
import './TabHolder.css';

export default function TabHolder(props){

    return (
        <div class="tabHolder">
            {
                props.tabs.map(item=>{
                    return (
                        <div class="tab">
                            <a>{item.title}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}