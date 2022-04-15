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
            <div class="sub_tabHolder">
                {subTabs.map(item=>{
                    if (location.pathname.split("/")[2] == item.href.split("/")[1]){
                        return (
                            <div class="sub_tab selected">
                                <a>{item.title}</a>
                            </div>
                        )
                    } else{
                        return(
                            <div class="sub_tab unselected" onClick={()=>{
                                navigate(item.roleHref + item.href + item.basicHref)
                            }}>
                                <a>{item.title}</a>
                            </div>
                        )
                    }
                })}
            </div>
            {isContainedSupTab &&
                <div class="sub_tabHolder">
                {props.supTabs.map(item=>{
                    if (location.pathname.split("/")[2] == item.subHref.split("/")[1] && location.pathname.split("/")[3]==item.supportHref.split("/")[1]){
                        return (
                            <div class="sub_tab selected">
                                <a>{item.title}</a>
                            </div>
                        )
                    } else if (location.pathname.split("/")[2] == item.subHref.split("/")[1]) {
                        return(
                            <div class="sub_tab unselected" onClick={()=>{
                                navigate(item.roleHref + item.subHref + item.supportHref)
                            }}>
                                <a>{item.title}</a>
                            </div>
                            )
                        }
                    })}
                </div>
            }
    </>
    )
}