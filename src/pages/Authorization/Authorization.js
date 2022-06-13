import React, { Component, Fragment } from "react";
import './Authorization.css';
import cookie from "react-cookie";
import ManIcon from '../../images/ManIcon.svg'
import { Api } from "../../api/authorizationApi"

var accounts = [
  {name: "Владимир", surname: "Владимирович", patronymic:"Путин", login: "Путин", password: "1", phone_num:"+8 495 606 36 02", duty:"Кладовщик"},
// {name: "Николай", password:"111"},
// {name: "Сергей", password:"3"}
];
var api = new Api()

const host = 'http://localhost:5000';

export default function Authorization(props){
  let expires = new Date()
  expires.setTime(expires.getTime() + (30 * 60 * 1000))
  
  async function apiGetClients(){
    var result = await api.getClients()
    console.log(result.length)
    console.log(JSON.stringify(result))
    accounts = result
  }

  if (props.cookies.accountData == undefined) {
    apiGetClients()
  }

  function submitClicked(){
    var login = document.getElementById("inputName").value
    var password = document.getElementById("inputPassword").value
    var passCheck=true
    accounts.map(item=>{
      if (item.login==login && item.password==password){
        passCheck=false

        var access_token = -1;
        let preview = ManIcon
        if (item.avatar != ""  && item.avatar != null) {
          preview = new Image();
          preview.src = item.avatar
        }
      
        console.log("avatar")
        console.log(item.avatar)
        console.log(preview.src)

        var accountData = {
          // roles: ["Логист", "Менеджер", "Администратор"], 
          roles: [item.duty], 
          avatar: preview, 
          name: item.name, 
          surname: item.surname, 
          patronymic: item.patronymic,
          login:  item.login,
          password: item.password,
          phone_num: item.phone_num,
          operator_id: item.code
        }
        if (item.duty == "Кладовщик")  {
          access_token = 0
        }
        if (item.duty == "Менеджер") {
          access_token = 1
        }
        if (item.duty == "Администратор") {
          access_token = 2
        }
        if (item.duty == "Логист") {
          access_token = 3
        }
        if (item.duty == "Бухгалтер") {
          access_token = 4
        }
        props.setCookie('access_token', access_token, { path: '/',  expires})
        props.setCookie('refresh_token', "refresh_token", { path: '/',  expires})
        props.setCookie('accountData', accountData, { path: '/',  expires})
      }
    })
    if (passCheck) {
      alert("Ошибка, введенны некорректные данные");
    }
  }

    return (
      <div className="login-wrapper">
        <h1>Пожалуйста авторизируйтесь</h1>
        <form>
          <label>
            <p>Имя пользователя</p>
            <input id="inputName" type="text" />
          </label>
          <label>
            <p>Пароль</p>
            <input id="inputPassword" type="password" />
          </label>
          <div>
            <button type="submit" onClick={submitClicked}>Submit</button>
          </div>
        </form>
      </div>
    )
} 
