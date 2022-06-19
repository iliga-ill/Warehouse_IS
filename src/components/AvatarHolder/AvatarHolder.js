import { React, Component, Fragment } from "react";
import './AvatarHolder.css';
import { useNavigate } from 'react-router-dom'
import ManIcon from '../../images/ManIcon.svg'
import { Api } from "../../api/profileApi"
import { withRouter } from "./withRouter";

var api = new Api()

class AvatarHolder extends Component {
    constructor(props){
        super(props)
        this.state = {
            reload:0,
            styles: ['dropdownMenu'],
            accountData: props.cookies.accountData,
            avatar:null,
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setStyles = (value)=>{this.setState({styles: value});}
    setAvatar = (value)=>{this.setState({avatar: value});}

    openDropdown=()=>{this.setStyles(["dropdownMenu","open"])}
    closeDropdown=()=>{this.setStyles(["dropdownMenu"])}

    componentDidMount(){
        this.getAvatar()
    }

    getAvatar = async () => {
        var res = await api.getProfileAvatar(this.state.accountData.operator_id)
        this.setAvatar(res)
    }
    
    profile = () => {
        this.props.navigate("/Profile");
        this.closeDropdown()
    }

    logout = () => {
        let expires = new Date()
        expires.setTime(expires.getTime() + (1))
        this.props.setCookie('access_token', undefined, { path: '/',  expires})
        this.props.setCookie('refresh_token', undefined, { path: '/',  expires})
        this.props.setCookie('accountData', undefined, { path: '/',  expires})
    }

    render(){
        return (
            <div style={{width: "49px", height: "49px", display: "inline-block", borderBottom: "1px solid darkgray"}}>
                <div className="avatarHolder" onClick={()=>{this.state.styles.join(' ') == "dropdownMenu open"?this.closeDropdown():this.openDropdown()}}>
                    <img src={this.state.avatar != null? this.state.avatar: ManIcon} style={{width: "47px", height: "47px", borderRadius: "50%", backgroundColor: "white", border: "1px solid black", display: "block"}}/>
                    {/* <img src={ManIcon} style={{width: "47px", height: "47px", borderRadius: "50%", backgroundColor: "white", border: "1px solid black", display: "block"}}/> */}
                </div>
                <div className={this.state.styles.join(' ')}>
                    <div className="menuItem" onClick={this.profile}>Профиль</div>
                    <div className="menuItem" onClick={this.logout}>Выйти</div>
                </div>
            </div>
        )
    }
}

export default withRouter(AvatarHolder)