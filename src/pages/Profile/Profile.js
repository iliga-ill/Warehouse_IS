import React from "react";
import './Profile.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";

const styles = {

}

export default function Profile(props){
    var accountData = props.cookies.accountData

    var id=1200
    function getId(){
        id++
        return id-1
    }

    return (
        <FlexibleBlocksPage Id={getId()}>
            <FlexibleBlock>
                <div>Hello</div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}
