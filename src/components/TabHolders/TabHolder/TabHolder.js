import React from "react";
import './TabHolder.css';
import { useLocation, useNavigate } from 'react-router-dom'

export default function TabHolder(props){
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="main_tabHolder">
            {props.tabs.map(function(item,i){
                if (location.pathname.split("/")[1] == item.href.split("/")[1]){
                    return (
                        <div className="main_tab selected" key={i}>
                            <a>{item.title}</a>
                        </div>
                    )
                } else{
                    return(
                        <div className="main_tab unselected" key={i} 
                        onClick={()=>{
                            navigate(item.href + item.basicHref)
                        }}>
                            <a>{item.title}</a>
                        </div>
                    )
                }
            })}
        </div>
    )
}