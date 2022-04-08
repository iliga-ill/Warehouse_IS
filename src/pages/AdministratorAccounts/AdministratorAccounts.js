import React, { Component, Fragment } from "react";
import './AdministratorAccounts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';
const styles = {

  }

  

export default function AdministratorAccounts(props){

    var id=0
    function getId(){return id++}

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40                                       }, 
        {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:160                                      }, 
        {name: 'name',              title:'Имя',                editingEnabled:true,    width:160                                      }, 
        {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:170                                      }, 
        {name: 'phone',             title:'Номер телефона',     editingEnabled:true,    width:200,  mask:/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/i, maskExample:"+7 (930) 442-5665"  }, 
        {name: 'email',             title:'Почта',              editingEnabled:true,    width:200                                      }, 
        {name: 'duty',              title:'Должность',          editingEnabled:false,   width:150                                      },
        {name: 'login',             title:'Логин',              editingEnabled:true,    width:130                                      },
        {name: 'password',          title:'Пароль',             editingEnabled:true,    width:130                                      }
    ]) 
    var edit_column = {add:true, edit:true, delete:true, select:true, validation:true}

    const [tableList, setTableList] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState()
    
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
                buffer[i] = {number:i+1, name: item.name, surname: item.surname, patronymic: item.patronymic, login: item.login, password: item.password, phone: item.phone_num, duty: " Кладовщик Менеджер", email:""}
                buffer[i].id = i;
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
    //-------------------------------------------------------------------------Блок 2 начало
    var allDuties=["Администратор", "Кладовщик", "Менеджер", "Логист", "Бухгалтер"]
    var isSelectedItemUndefined=()=>{return selectedItem==undefined}
    var isSelectedItemIncludes=(value)=>{return !isSelectedItemUndefined()?selectedItem.duty.split(" ").includes(value):false}

    function onAccessChange(duty){
        var tableBuf = tableList.map(item=>{
            if (item.id==selectedItem.id && isSelectedItemIncludes(duty))
                item.duty = item.duty.replace(` ${duty}`,'');
            else if (item.id==selectedItem.id && !isSelectedItemIncludes(duty))
                item.duty = item.duty + ` ${duty}`
            return item
        })
        setTableList(tableBuf)
    }

    React.useEffect(() => {
        allDuties.map(function(duty, i){
            document.getElementById("checkbox"+i).checked=isSelectedItemIncludes(duty)
        })
    }, [selectedItem]);
    //-------------------------------------------------------------------------Блок 2 конец

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">Аккаунты</div>
                <div style={{width:800+'px', display:'inline-table'}} >
                    <TableComponent  height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} editColumn={edit_column} onSelect={setSelectedItem}/>
                </div>
                <div></div>
                <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={btn_send_1}>Подтвердить</button>
            </FlexibleBlock>
            <FlexibleBlock>
                <div class="header_text">Доступные АРМ</div>
                <div><input id="checkbox0" type="checkbox" onChange={()=>onAccessChange(allDuties[0])}  disabled={isSelectedItemUndefined()}/> <a> {allDuties[0]}</a></div>
                <div><input id="checkbox1" type="checkbox" onChange={()=>onAccessChange(allDuties[1])}  disabled={isSelectedItemUndefined()}/> <a> {allDuties[1]}</a></div>
                <div><input id="checkbox2" type="checkbox" onChange={()=>onAccessChange(allDuties[2])}  disabled={isSelectedItemUndefined()}/> <a> {allDuties[2]}</a></div>
                <div><input id="checkbox3" type="checkbox" onChange={()=>onAccessChange(allDuties[3])}  disabled={isSelectedItemUndefined()}/> <a> {allDuties[3]}</a></div>
                <div><input id="checkbox4" type="checkbox" onChange={()=>onAccessChange(allDuties[4])}  disabled={isSelectedItemUndefined()}/> <a> {allDuties[4]}</a></div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}