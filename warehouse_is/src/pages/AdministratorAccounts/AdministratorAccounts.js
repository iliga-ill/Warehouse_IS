import React, { Component, Fragment } from "react";
import './AdministratorAccounts.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
const host = 'http://localhost:5000';
const styles = {

  }

  

export default function AdministratorAccounts(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    var table_list_value_1 = [
        {value: "Кладовщик", selected: true},
        {value: "Администратор", selected: false},
    ]

    var table_headers_1 = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Фамилия", mode:"input", column_width: "110px", listValue: []}, 
        {title:"Имя", mode:"input", column_width: "110px", listValue: []}, 
        {title:"Отчество", mode:"input", column_width: "110px", listValue: []}, 
        {title:"Номер телефона", mode:"input", column_width: "150px", listValue: []}, 
        {title:"Должность", mode:"inputList", column_width: "150px", listValue: table_list_value_1},
        {title:"Логин", mode:"input", column_width: "110px", listValue: []}, 
        {title:"Пароль", mode:"input", column_width: "110px", listValue: []}, 
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height_1 = "300px"
    var table_list_1 = []
    var accounts = []
    accounts.map(function(item,i){
        var counter=0;
        var str=[]
        str[counter++] = i
        str[counter++] = item.surname
        str[counter++] = item.name
        str[counter++] = item.patronymic
        str[counter++] = item.phone_num
        str[counter++] = item.duty
        str[counter++] = item.login
        str[counter++] = item.password
        str[counter++] = true
        table_list_1[i]=str
    })

    function set_table_list_1(value) {
        table_list_1=value
    }

    function btn_send_1() {
        var accountss=[]
        var iter=0;
        table_list_1.map(function(item,i){
            iter++;
            accountss[i] = {login: item[6], password: item[7], name: item[2], surname: item[1], patronymic: item[3], phone_num: item[4], duty: item[5]}
        })
        var check=true
        accountss.map(function(item,i){
            if (item.login == ""){
                check=false
                alert("Ошибка, логин не может быть пустым");
            }
            if (item.password == ""){
                check=false
                alert("Ошибка, пароль не может быть пустым");
            }
            if (item.name == ""){
                check=false
                alert("Ошибка, наименование не может быть пустым");
            }
            if (item.surname == ""){
                check=false
                alert("Ошибка, фамилия не может быть пустым");
            }
            if (item.patronymic == ""){
                check=false
                alert("Ошибка, отчество не может быть пустым");
            }
            if (item.phone_num == ""){
                check=false
                alert("Ошибка, телефон не может быть пустым");
            }
        })

        if (check) {
            props.func(accountss)
            apiPostNewUser(accountss[accountss.length-1])
        }
    }

    function apiPostNewUser(value) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", host+'/post_user', true);
      
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
                console.log("New shelf set")
            }
        }

        //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
      }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <Table Id={getId()} table_headers={table_headers_1} table_field_height={table_field_height_1} table_list={table_list_1} func={set_table_list_1} numb={0} search="true" add="true" delete="true"/>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}