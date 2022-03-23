import React from "react";
import './AvatarHolder.css';
import ManIcon from '../../images/ManIcon.svg'

export default function AvatarHolder(){

    return (
        <div class="avatarHolder">
            <img src={ManIcon} class="icon"/>
        </div>
    )
}