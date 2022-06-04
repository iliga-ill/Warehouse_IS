import React from "react";
import './TabHolder.css';
import { useLocation, useNavigate } from 'react-router-dom'

export default function TabHolder(props){
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div style={{width: "100%", height: "50px", overflowX: "scroll", overflowY: "hidden", backgroundColor: "white", verticalAlign: "middle", whiteSpace: "nowrap", borderBottom: "1px solid #ccc"}}>
            {props.tabs.map(function(item,i){
                if (location.pathname.split("/")[1] == item.href.split("/")[1]){
                    return (
                        <div className="main_tab" style={{marginRight:"10px"}} key={i}>
                            <div className="main_selected" style={{width:"calc(100% + 10px)", height:"50px"}}/>
                            <div className="noselect" style={{marginTop: "-38px", marginLeft:"5px"}}>{item.title}</div>
                        </div>
                    )
                } else{
                    return(
                        <div className="main_tab" style={{marginRight:"10px"}} key={i}>
                            <div className="main_unselected" style={{width:"calc(100% + 10px)", height:"50px"}}
                                onMouseDown={()=>{navigate(item.href + item.basicHref)}}
                            />
                            <div className="noselect" style={{marginTop: "-38px", marginLeft:"5px"}}
                                onMouseDown={()=>{navigate(item.href + item.basicHref)}}
                            >{item.title}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}