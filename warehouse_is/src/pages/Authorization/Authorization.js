import React, { Component, Fragment } from "react";
import './Authorization.css';
import Table from "../../components/Table/Table";


export default function Authorization(props){

  var accounts = props.accounts
  function submitClicked(){
    var login = document.getElementById("inputName").value
    var password = document.getElementById("inputPassword").value
    var passCheck=true
    accounts.map(item=>{
      if (item.login==login && item.password==password){
        passCheck=false
        props.func()
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
