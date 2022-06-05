import React from "react";
import './FlexibleBlock.css';

const styles={
    backgroundColor:{
        backgroundColor: "rgba(228, 228, 228, 0.575)"
    }
}

export default function FlexibleBlock(props){
    return (
            <div className = "flexibleBlock_block">
                <div style={props.paddings!=undefined && !props.paddings?{}:styles.backgroundColor} className={"flexibleBlock_block_wrap"}>
                    <div className = {props.paddings!=undefined && !props.paddings?"":"pl pr pt pb"}>
                        {props.children}
                    </div>
                </div>
            </div>
            )
}