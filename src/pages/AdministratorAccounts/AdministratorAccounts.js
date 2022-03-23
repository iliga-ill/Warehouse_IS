import React, { Component, Fragment } from "react";
import './AdministratorAccounts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
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
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:160   }, 
        {name: 'name',              title:'Имя',                editingEnabled:true,    width:160   }, 
        {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:170   }, 
        {name: 'phone_num',         title:'Номер телефона',     editingEnabled:true,    width:200   }, 
        {name: 'duty',              title:'Должность',          editingEnabled:true,    width:150   },
        {name: 'login',             title:'Логин',              editingEnabled:true,    width:130   },
        {name: 'password',          title:'Пароль',             editingEnabled:true,    width:130   }
    ]) 
    var edit_column = {add:true, edit:true, delete:true}

    const [tableList, setTableList] = React.useState([])
    function apiGetClients() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host+'/clients', true);
        console.log("Authorization apiGetClients was launched")
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            var answer = JSON.parse(this.response)
            console.log("Authorization apiGetClients answer: ")
            console.log(answer)
            var buffer = []
            answer.map( function(item, i) {
                buffer[i] = {number:i+1, name: item.name, surname: item.surname, patronymic: item.patronymic, login: item.login, password: item.password, phone_num: item.phone_num, duty: item.duty}
                buffer[i].id = 'string_' + i;
                buffer[i].code = item.code
            })
            if (JSON.stringify(tableList)!=JSON.stringify(buffer))
                setTableList(buffer)
          }
        } 
        xhr.send(null);
      }
      if(tableList.toString()=="")
        apiGetClients()
    

    

    function btn_send_1() {
        var accounts = tableList
        var check=true

        accounts.map(function(item,i){
            if (check){
                if (item.login == "" || item.login == null){
                    check=false
                    alert("Ошибка, логин не может быть пустым");
                }
                if (item.password == ""|| item.password == null){
                    check=false
                    alert("Ошибка, пароль не может быть пустым");
                }
                if (item.name == ""|| item.name == null){
                    check=false
                    alert("Ошибка, наименование не может быть пустым");
                }
                if (item.surname == ""|| item.surname == null){
                    check=false
                    alert("Ошибка, фамилия не может быть пустым");
                }
                if (item.patronymic == ""|| item.patronymic == null){
                    check=false
                    alert("Ошибка, отчество не может быть пустым");
                }
                if (item.phone_num == ""|| item.phone_num == null){
                    check=false
                    alert("Ошибка, телефон не может быть пустым");
                }
            }
        })
        console.log(accounts)
        if (check) {
            apiPostAccountTable(tableList)
        }
    }

    function apiPostAccountTable(value) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", host+'/post_user', true);
      
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");
      
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
                alert("Данные успешно отправлены")
            }
        }

        //xhr.send(`name=${value.name}&surname=${value.surname}&patronymic=${value.surname}&login=${value.login}&password=${value.password}&phone_num=${value.phone_num}&duty=${value.duty}`);
        xhr.send(JSON.stringify({value}));
      }
    //-------------------------------------стол 1 конец
    //-------------------------------------------------------------------------Блок 1 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Аккаунты</div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent  height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}