import React from "react";
import './SubTabHolder.css';
import { useLocation, useNavigate } from 'react-router-dom'


export default function SubTabHolder(props){
    const location = useLocation();
    const navigate = useNavigate();

    var subTabs = []
    props.tabs.map(tabs=>{
        if (location.pathname.split("/")[1] == tabs[0].roleHref.split("/")[1]) {
            subTabs=tabs
        }
    })
    return (
        <div class="tabHolder">
            {subTabs.map(item=>{
                if (location.pathname.split("/")[2] == item.href.split("/")[1]){
                    return (
                        <div class="tab selected">
                            <a>{item.title}</a>
                        </div>
                    )
                } else{
                    return(
                        <div class="tab unselected" onClick={()=>{
                            navigate(item.roleHref + item.href)
                        }}>
                            <a>{item.title}</a>
                        </div>
                    )
                }
            })}
        </div>
    )
}