import React from "react";
import './FlexibleBlockDouble.css';

export default function FlexibleBlockDouble(props){
    return (<>
                <div class = "block">
                    <div class = "block_wrap darkgray">
                        <div class = "pl pr">
                            <div class="placeholder"/>
                            {props.block1}
                            <div class="placeholder"/>
                        </div>
                    </div>
                    <div class = "block_wrap darkgray">
                        <div class = "pl pr">
                            <div class="placeholder"/>
                            {props.block2}
                            <div class="placeholder"/>
                        </div>
                    </div>
                </div>
            </>
    )
}