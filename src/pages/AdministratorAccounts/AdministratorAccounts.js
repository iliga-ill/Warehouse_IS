import React, { Component, Fragment } from "react";
import './AdministratorAccounts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/api"

const host = 'http://localhost:5000';
const styles = {

  }

var isFirstTime = true
var api = new Api()
var buf = {value: []}

  
export default function AdministratorAccounts(props){

    var id=props.Id
    function getId(){
        id++
        return id-1
    }

    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    //-------------------------------------------------------------------------Блок 1
    //-------------------------------------стол 1
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:160   }, 
        {name: 'name',              title:'Имя',                editingEnabled:true,    width:160   }, 
        {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:170   }, 
        {name: 'phone',             title:'Номер телефона',     editingEnabled:true,    width:200   }, 
        {name: 'email',             title:'Почта',              editingEnabled:true,    width:200   }, 
        {name: 'duty',              title:'Должность',          editingEnabled:false,   width:150   },
        {name: 'login',             title:'Логин',              editingEnabled:true,    width:130   },
        {name: 'password',          title:'Пароль',             editingEnabled:true,    width:130   }
    ]) 
    var edit_column = {add:true, edit:true, delete:true, select:true}
    const [tableList, setTableList] =  React.useState([])
    const [selectedItem, setSelectedItem] = React.useState()

    React.useEffect(() => {
        // console.log("================================")
        // console.log(tableList)
        // console.log(tableList.length)
        // console.log("================================")
        // return () => {
        //     React.effect()
        //     .then((value) => setTableList({ status: 'fulfilled', value, error: null }))
        //     .catch((error) => setTableList({ status: 'rejected', value: null, error }))
        // }

        async function apiGetClients(){
            var result = await api.getClients("GET", "/clients")
            console.log(result.length)
            console.log(JSON.stringify(result))
            // setTableList([{}])
            setTableList(result)
            // setSelectedItem()
            // buf.value = {value: result}
            // console.log("1")
            // console.log(tableList)
        }
        apiGetClients()
        // setTableList(result)
    }, []);

    if(tableList.length != 5 && isFirstTime == true) {
        console.log(`isFirstTime ${isFirstTime}`)
        isFirstTime = false
        setTableList([])
    }

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
          
            async function test(value) {
                await api.postClients("POST", "/post_user", value)
            }
            test(tableList)
        }
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