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
        <div style={{
            width: "100%", 
            height: "fit-content", 
            overflowX: "scroll", 
            overflowY: "hidden", 
            backgroundColor: "white", 
            verticalAlign: "middle", 
            whiteSpace: "nowrap", 
            borderBottom: "1px solid #ccc"
        }}>
            {props.tabs.map(function(item,i){
                if (props.selTab.id == item.id && item.selection){
                    return (
                        <div className="universalTabHolder_tab" key={i} style={props.style!=undefined?props.style:{}}>
                            <div className="universalTabHolder_selected" style={{width:"calc(100%)", height:"40px"}}/>
                            <div className="noselect" style={{marginTop: "-35px", paddingLeft:"5px", paddingRight:"5px"}}>{item.title}</div>
                        </div>
                    )
                }else{
                    return(
                        <div className="universalTabHolder_tab" key={i} style={props.style!=undefined?props.style:{}}>
                            <div className="universalTabHolder_unselected" style={{width:"calc(100%)", height:"40px"}}
                                onMouseDown={()=>{props.setTab(item); item.func()}}
                            />
                            <div className="noselect" style={{marginTop: "-35px", paddingLeft:"5px", paddingRight:"5px"}}
                                onMouseDown={()=>{props.setTab(item); item.func()}}
                            >{item.title}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}