import React from "react";
import './FlexibleBlocksPage.css';

export default function FlexibleBlocksPage(props){
    return (
        <div class = "page">
            {props.children}
        </div>
    )
}