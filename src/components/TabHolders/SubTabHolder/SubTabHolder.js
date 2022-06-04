import React from "react";
import './SubTabHolder.css';
import { useLocation, useNavigate } from 'react-router-dom'


export default function SubTabHolder(props){
    const location = useLocation();
    const navigate = useNavigate();
    var isContainedSupTab = false

    var subTabs = []
    props.tabs.map(tabs=>{
        if (location.pathname.split("/")[1] == tabs[0].roleHref.split("/")[1]) {
            subTabs=tabs
        }
    })

    props.supTabs.map(item=>{
        if (item.subHref.split("/")[1] == location.pathname.split("/")[2]) isContainedSupTab=true
    })
    return (
        <>
            <div className="sub_tabHolder">
                {subTabs.map(function(item, i){
                    if (location.pathname.split("/")[2] == item.href.split("/")[1]){
                        return (
                            <div className="sub_tab" style={{marginRight:"10px"}} key={i}>
                                <div className="sub_selected" style={{width:"calc(100% + 10px)", height:"40px"}}/>
                                <div className="noselect" style={{marginTop: "-35px", marginLeft:"5px"}}>{item.title}</div>
                            </div>
                        )
                    } else{
                        return(
                            <div className="sub_tab" style={{marginRight:"10px"}} key={i}>
                                <div className="sub_unselected" style={{width:"calc(100% + 10px)", height:"40px"}}
                                    onMouseDown={()=>{navigate(item.roleHref + item.href + item.basicHref)}}
                                />
                                <div className="noselect" style={{marginTop: "-35px", marginLeft:"5px"}}
                                    onMouseDown={()=>{navigate(item.roleHref + item.href + item.basicHref)}}
                                >{item.title}</div>
                            </div>
                        )
                    }
                })}
            </div>
            {isContainedSupTab &&
                <div className="sub_tabHolder">
                {props.supTabs.map(function(item, i){
                    if (location.pathname.split("/")[2] == item.subHref.split("/")[1] && location.pathname.split("/")[3]==item.supportHref.split("/")[1]){
                        return (
                            <div className="sub_tab" style={{marginRight:"10px"}} key={i}>
                                <div className="sub_selected" style={{width:"calc(100% + 10px)", height:"40px"}}/>
                                <div className="noselect" style={{marginTop: "-35px", marginLeft:"5px"}}>{item.title}</div>
                            </div>
                        )
                    } else if (location.pathname.split("/")[2] == item.subHref.split("/")[1]) {
                        return(
                            <div className="sub_tab" style={{marginRight:"10px"}} key={i}>
                                <div className="sub_unselected" style={{width:"calc(100% + 10px)", height:"40px"}}
                                    onMouseDown={()=>{navigate(item.roleHref + item.subHref + item.supportHref)}}
                                />
                                <div className="noselect" style={{marginTop: "-35px", marginLeft:"5px"}}
                                    onMouseDown={()=>{navigate(item.roleHref + item.subHref + item.supportHref)}}
                                >{item.title}</div>
                            </div>
                            )
                        }
                    })}
                </div>
            }
    </>
    )
}