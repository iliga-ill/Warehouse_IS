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
        <div className="userAvatar">
            <div className="avatarHolder" onClick={()=>{styles.join(' ') == "dropdownMenu open"?closeDropdown():openDropdown()}}>
                <img src={accountData.avatar} className="icon"/>
            </div>
            <div className={styles.join(' ')}>
                <div className="menuItem" onClick={profile}>Профиль</div>
                <div className="menuItem" onClick={logout}>Выйти</div>
            </div>
        </div>
    )
}