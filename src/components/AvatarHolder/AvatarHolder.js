import React from "react";
import './AvatarHolder.css';
import { useNavigate } from 'react-router-dom'

export default function AvatarHolder(props){
    const [styles, setStyles] = React.useState(['dropdownMenu'])
    var accountData = props.cookies.accountData
    const navigate = useNavigate();

    function openDropdown() {setStyles(["dropdownMenu","open"])}
    function closeDropdown() {setStyles(["dropdownMenu"])}
    
    var profile = () => {
        navigate("/Profile")
        closeDropdown()
    }

    var logout = () => {
        let expires = new Date()
        expires.setTime(expires.getTime() + (1))
        props.setCookie('access_token', undefined, { path: '/',  expires})
        props.setCookie('refresh_token', undefined, { path: '/',  expires})
        props.setCookie('accountData', undefined, { path: '/',  expires})
    }
        
    return (
        <div class="userAvatar">
            <div class="avatarHolder" onClick={()=>{styles.join(' ') == "dropdownMenu open"?closeDropdown():openDropdown()}}>
                <img src={accountData.avatar} class="icon"/>
            </div>
            <div class={styles.join(' ')}>
                <div class="menuItem" onClick={profile}>Профиль</div>
                <div class="menuItem" onClick={logout}>Выйти</div>
            </div>
        </div>
    )
}