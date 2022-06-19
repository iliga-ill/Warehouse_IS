import { React, Component, Fragment } from "react";
import './Profile.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import Avatar from 'react-avatar-edit'
import InputText from "../../components/InputText/InputText";
import { Api } from "../../api/profileApi"
import ManIcon from '../../images/ManIcon.svg'

var api = new Api()
const styles = {

}

// let avatar = null

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            reload:0,
            accountData: props.cookies.accountData,
            onChange:false,
            name: props.cookies.accountData.name,
            surname: props.cookies.accountData.surname,
            patronymic: props.cookies.accountData.patronymic,
            login: props.cookies.accountData.login,
            password: props.cookies.accountData.password,
            phoneNum: props.cookies.accountData.phone_num,
            onLoad:false,
            avatar:null,
            preview:null,
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setOnChange = (value)=>{this.setState({onChange: value});}
    setName = (value)=>{this.setState({name: value});}
    setSurname = (value)=>{this.setState({surname: value});}
    setPatronymic = (value)=>{this.setState({patronymic: value});}
    setLogin = (value)=>{this.setState({login: value});}
    setPassword = (value)=>{this.setState({password: value});}
    setPhoneNum = (value)=>{this.setState({phoneNum: value});}
    setOnLoad = (value)=>{this.setState({onLoad: value});}
    setAvatar = (value)=>{this.setState({avatar: value});}
    setPreview = (value)=>{this.setState({preview: value});}

    getAvatar = async () => {
        var res = await api.getProfileAvatar(this.state.accountData.operator_id)
        this.setAvatar(res)
        this.setPreview(res)
        this.setOnChange(!this.state.onChange)
        this.setOnChange(!this.state.onChange)
    }

    componentDidMount(){
        console.log("DidMount")
        this.getAvatar()
    }
    
    onClose = () => {this.setPreview({preview: null})}
      
    onCrop = (preview) => {this.setPreview({preview})}

    onBeforeFileLoad = (elem) => {
        if(elem.target.files[0].size > 71680){
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    onSave = () => {
        let body = {
            code: this.state.accountData.operator_id,
            name: this.state.name,
            surname: this.state.surname,
            patronymic: this.state.patronymic,
            login: this.state.login,
            password: this.state.password,
            phone_num: this.state.phoneNum,
            duty: "",
            preview: this.state.preview.preview
        }
        this.state.avatar = this.state.preview.preview
        // handleFileUpload(preview.preview)
        this.updateProfile(body)
        this.setOnChange(false)
    }

    updateProfile = async (value) => {
        let res = await api.updateProfile(value)

        var accountData = {
            // roles: ["Логист", "Менеджер", "Администратор"], 
            roles: this.state.accountData.roles, 
            avatar: this.state.avatar, 
            name: this.state.name, 
            surname: this.state.surname, 
            patronymic: this.state.patronymic,
            login:  this.state.login,
            password: this.state.password,
            phone_num: this.state.phoneNum,
            operator_id: this.state.accountData.operator_id
          }
        
        let expires = new Date()
        expires.setTime(expires.getTime() + (30 * 60 * 1000))
        this.props.setCookie('accountData', accountData, { path: '/',  expires})
    }

    render(){
        return (
            <FlexibleBlocksPage marginTop={51}>
                <FlexibleBlock>
                        {!this.state.onChange
                            ?<>
                                <table>
                                    <tr>
                                        <td>
                                            <img src={this.state.avatar!=null?this.state.avatar:ManIcon} class="profile_icon"/>
                                        </td>
                                        <td>
                                            <div class="profile_data">
                                                <div class="header_text">
                                                    {this.state.accountData.surname}&nbsp;{this.state.accountData.name}&nbsp;{this.state.accountData.patronymic}
                                                </div>
                                                <div>Логин: {this.state.accountData.login}</div>
                                                <div>Пароль: {this.state.accountData.password}</div>
                                                <div>Телефон: +{this.state.accountData.phone_num}</div>
                                                <div>Доступные&nbsp;АРМ: {this.state.accountData.roles.join(", ")}</div>
                                            </div>
                                            <div class="place_holder"/><button class="bt_send" onClick={()=>{this.setOnChange(true);}}>Изменить</button>
                                        </td>
                                    </tr>
                                </table>
                            </>
                            :<>
                                <table>
                                    <tr>
                                        <td style={{width:"200px"}}>
                                            <div style={{width:"200px"}}>
                                                <Avatar
                                                    width={200}
                                                    height={200}
                                                    onCrop={this.onCrop}
                                                    onClose={this.onClose}
                                                    onBeforeFileLoad={this.onBeforeFileLoad}
                                                    src={this.state.avatar}
                                                    // src={ManIcon}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{width:"200px"}}>
                                                {this.state.preview==null||this.state.preview.preview==null
                                                    ?<></>
                                                    :<img src={this.state.preview.preview} alt="Preview" class="preview"/>

                                                }
                                            </div>
                                        </td>
                                        <td style={{width:"200px", textAlign: "center"}}>
                                            {this.state.preview==null||this.state.preview.preview==null
                                                ?<></>
                                                :<img src={this.state.preview.preview} alt="Preview" class="preview_small"/>
                                            }
                                        </td>
                                    </tr>
                                </table>
                                <div class="profile_data">
                                    <div style={{width:"250px"}} >
                                        <InputText styles = "row_with_item_equal" label="Имя:&nbsp;" placeholder="имя" defValue={this.state.name} set={this.setName} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                        <InputText styles = "row_with_item_equal" label="Фамилия:&nbsp;" placeholder="имя" defValue={this.state.surname} set={this.setSurname} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                        <InputText styles = "row_with_item_equal" label="Отчество:&nbsp;" placeholder="имя" defValue={this.state.patronymic} set={this.setPatronymic} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                        <InputText styles = "row_with_item_equal" label="Логин:&nbsp;" placeholder="имя" defValue={this.state.login} set={this.setLogin} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                        <InputText styles = "row_with_item_equal" label="Пароль:&nbsp;" placeholder="имя" defValue={this.state.password} set={this.setPassword} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                        <InputText styles = "row_with_item_equal" label="Телефон:&nbsp;" placeholder="имя" defValue={this.state.phoneNum} set={this.setPhoneNum} type="phone"/>
                                    </div> 
                                    <div class="low_text">Доступные&nbsp;АРМ: {this.state.accountData.roles.join(", ")}</div>
                                </div>
                                <div class="place_holder double"/>
                                <button class="bt_send" onClick={()=>{this.setOnChange(false)}}>Отмена</button>
                                <button class="bt_send second"onClick={()=>{this.onSave()}}>Сохранить</button>
                            </>
                        }
                </FlexibleBlock>
            </FlexibleBlocksPage>
        )
    }
}

export default Profile