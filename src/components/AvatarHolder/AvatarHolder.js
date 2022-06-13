import React from "react";
import './AvatarHolder.css';
import { useNavigate } from 'react-router-dom'
import ManIcon from '../../images/ManIcon.svg'

export default function AvatarHolder(props){
    const [styles, setStyles] = React.useState(['dropdownMenu'])
    var accountData = props.cookies.accountData
    console.log("preview in avatar holder")
    console.log(accountData)
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
        <div style={{width: "49px", height: "49px", display: "inline-block", borderBottom: "1px solid darkgray"}}>
            <div className="avatarHolder" onClick={()=>{styles.join(' ') == "dropdownMenu open"?closeDropdown():openDropdown()}}>
                <img src={accountData != undefined? accountData.avatar.src: ManIcon} style={{width: "47px", height: "47px", borderRadius: "50%", backgroundColor: "white", border: "1px solid black", display: "block"}}/>
            </div>
            <div className={styles.join(' ')}>
                <div className="menuItem" onClick={profile}>Профиль</div>
                <div className="menuItem" onClick={logout}>Выйти</div>
            </div>
        </div>
    )
}