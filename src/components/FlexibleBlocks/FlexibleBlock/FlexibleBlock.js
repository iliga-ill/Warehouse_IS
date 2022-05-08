import React from "react";
import './FlexibleBlock.css';

export default function FlexibleBlock(props){
    return (
            <div className = "block">
                <div className = "block_wrap darkgray">
                    <div className = "pl pr">
                        <div className="placeholder"/>
                        {props.children}
                        <div className="placeholder"/>
                    </div>
                </div>
            </div>
            )
}