import React from "react";
import './FlexibleBlock.css';

export default function FlexibleBlock(props){
    return (
            <div class = "block">
                <div class = "block_wrap darkgray">
                    {props.children}
                </div>
            </div>
            )
}