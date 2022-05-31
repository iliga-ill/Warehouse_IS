import React from "react";
import './Profile.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import Avatar from 'react-avatar-edit'
import InputText from "../../components/InputText/InputText";

const styles = {

}

export default function Profile(props){
    var accountData = props.cookies.accountData
    const [onChange, setOnChange] = React.useState(false)

    const [name, setName] = React.useState(accountData.name)
    const [surname, setSurname] = React.useState(accountData.surname)
    const [patronymic, setPatronymic] = React.useState(accountData.patronymic)
    const [login, setLogin] = React.useState(accountData.login)
    const [password, setPassword] = React.useState(accountData.password)
    const [phoneNum, setPhoneNum] = React.useState(accountData.phone_num)

    var id=1300
    function getId(){return ++id-1;}

    const [avatar, setAvatar] = React.useState(accountData.avatar)
    const [preview, setPreview] = React.useState(null)

    function onClose() {
        setPreview({preview: null})
      }
      
    function onCrop(preview) {
        setPreview({preview})
    }

    function onBeforeFileLoad(elem) {
        if(elem.target.files[0].size > 71680){
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    function onSave(){
        console.log("preview: " + preview)
        console.log("name: " + name)
        console.log("surname: " + surname)
        console.log("patronymic: " + patronymic)
        console.log("login: " + login)
        console.log("password: " + password)
        console.log("phoneNum: " + phoneNum)
    }

    return (
        <FlexibleBlocksPage marginTop={51}>
            <FlexibleBlock>
                    {!onChange
                        ?<>
                            <table>
                                <tr>
                                    <td>
                                        <img src={accountData.avatar} class="profile_icon"/>
                                    </td>
                                    <td>
                                        <div class="profile_data">
                                            <div class="header_text">
                                                {accountData.surname}&nbsp;{accountData.name}&nbsp;{accountData.patronymic}
                                            </div>
                                            <div>Логин: {accountData.login}</div>
                                            <div>Пароль: {accountData.password}</div>
                                            <div>Телефон: +{accountData.phone_num}</div>
                                            <div>Доступные&nbsp;АРМ: {accountData.roles.join(", ")}</div>
                                        </div>
                                        <div class="place_holder"/><button class="bt_send" onClick={()=>{setOnChange(true)}}>Изменить</button>
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
                                                onCrop={onCrop}
                                                onClose={onClose}
                                                onBeforeFileLoad={onBeforeFileLoad}
                                                src={avatar}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{width:"200px"}}>
                                            {preview==null||preview.preview==null
                                                ?<></>
                                                :<img src={preview.preview} alt="Preview" class="preview"/>

                                            }
                                        </div>
                                    </td>
                                    <td style={{width:"200px", textAlign: "center"}}>
                                        {preview==null||preview.preview==null
                                            ?<></>
                                            :<img src={preview.preview} alt="Preview" class="preview_small"/>

                                        }
                                    </td>
                                    
                                </tr>
                            </table>
                            <div class="profile_data">
                                <div style={{width:"250px"}} >
                                    <InputText styles = "row_with_item_equal" label="Имя:&nbsp;" placeholder="имя" defValue={name} set={setName} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                    <InputText styles = "row_with_item_equal" label="Фамилия:&nbsp;" placeholder="имя" defValue={surname} set={setSurname} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                    <InputText styles = "row_with_item_equal" label="Отчество:&nbsp;" placeholder="имя" defValue={patronymic} set={setPatronymic} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                    <InputText styles = "row_with_item_equal" label="Логин:&nbsp;" placeholder="имя" defValue={login} set={setLogin} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                    <InputText styles = "row_with_item_equal" label="Пароль:&nbsp;" placeholder="имя" defValue={password} set={setPassword} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/> 
                                    <InputText styles = "row_with_item_equal" label="Телефон:&nbsp;" placeholder="имя" defValue={phoneNum} set={setPhoneNum} type="phone"/>
                                </div> 
                                <div class="low_text">Доступные&nbsp;АРМ: {accountData.roles.join(", ")}</div>
                            </div>
                            <div class="place_holder double"/>
                            <button class="bt_send" onClick={()=>{setOnChange(false)}}>Отмена</button>
                            <button class="bt_send second"onClick={()=>{onSave()}}>Сохранить</button>
                        </>
                    }
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}
