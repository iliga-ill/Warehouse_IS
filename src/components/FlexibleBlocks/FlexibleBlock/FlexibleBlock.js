import React from "react";
import './FlexibleBlock.css';

export default function FlexibleBlock(props){
    return (
            <div class = "block">
                <div class = "block_wrap darkgray">
                    <div class = "pl pr">
                        <div class="placeholder"/>
                        {props.children}
                        <div class="placeholder"/>
                    </div>
                </div>
            </div>
            )
}