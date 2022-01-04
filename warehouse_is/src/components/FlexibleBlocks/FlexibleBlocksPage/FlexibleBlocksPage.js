import React from "react";
import './FlexibleBlocksPage.css';

export default function FlexibleBlocksPage(props){

    //pattern
    /*
    <FlexibleBlocksPage>
        <FlexibleBlock>
        </FlexibleBlock>
    </FlexibleBlocksPage>
    */

    let [pageStyle, setPageStyle] = React.useState(
        {
            listStyle: "none",
            width: "100%",
            height: (document.documentElement.clientHeight-100).toString() + "px",
            fontSize: "1.25rem",
            overflowX: "scroll",
            overflowY: "scroll",
        }
    )

    return (
        <div style={pageStyle}>
            {props.children}
        </div>
    )
}