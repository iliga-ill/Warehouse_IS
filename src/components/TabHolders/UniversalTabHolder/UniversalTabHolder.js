import React from "react";
import './UniversalTabHolder.css';

/*
tabs:[
    {id:0, title:"Вид", func:()=>{onChangeViewMode()}, selection:false, style:{textSize:"10"}},
    {id:1, title:"Тест панельки", func:()=>{this.setState({isSideBlockOpened: !this.state.isSideBlockOpened});}, selection:false, style:{textSize:"10"}}
],
selTab:{id:0, title:"Модели", func:()=>{}},

setSelTab = (value)=>{this.setState({selTab: value});}
<UniversalTabHolder tabs={this.state.tabs} setTab={this.setSelTab} selTab={this.state.selTab}/>
*/

export default function UniversalTabHolder(props){
    return (
        <div className="main_UniversalTabHolder">
            {props.tabs.map(function(item,i){
                if (props.selTab.id == item.id && item.selection){
                    return (
                        <div className="main_tab_UniversalTabHolder selected" key={i} style={item.style!=undefined?item.style:{}}>
                            {item.title}
                        </div>
                    )
                }else{
                    return(
                        <div className="main_tab_UniversalTabHolder unselected" key={i} style={item.style!=undefined?item.style:{}}
                            onClick={()=>{props.setTab(item); item.func()}}
                        >
                            {item.title}
                        </div>
                    )
                }
            })}
        </div>
    )
}