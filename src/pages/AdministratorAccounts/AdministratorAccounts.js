import React, { Component, Fragment } from "react";
import './AdministratorAccounts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
import { Api } from "../../api/administatoApi"

const styles = {

  }

var api = new Api()
var buf = {value: []}

  
//export default function AdministratorAccounts(props){
class AdministratorAccounts extends Component {

    lastSelectedItem = undefined
    // tableListBuf = []

    constructor(props){
        super(props)
        this.state={
            reload:0,
            tabsHeight:102,
            tableHeaders:[
                {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
                {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:100,  mask:/^(.)(.*)$/i,                          maskExample:"быть заполнено", basicValue:"-"                                }, 
                {name: 'name',              title:'Имя',                editingEnabled:true,    width:80,   mask:/^(.)(.*)$/i,                          maskExample:"быть заполнено", basicValue:"-"                                }, 
                {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:120,  mask:/^(.)(.*)$/i,                          maskExample:"быть заполнено", basicValue:"-"                                }, 
                {name: 'phone',             title:'Номер телефона',     editingEnabled:true,    width:150,  mask:/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/i,    maskExample:"соответствовать шаблону +7 (930) 442-5665", basicValue:"+7 (930) 442-5665"     }, 
                {name: 'email',             title:'Почта',              editingEnabled:true,    width:160,  mask:/^(.)(.*)(.@.*)\.(.)(.)$/i,            maskExample:"соответствовать шаблону example@service.ru", basicValue:"example@service.ru"    }, 
                {name: 'duty',              title:'Должность',          editingEnabled:false,   width:170                                                                                                           },
                {name: 'login',             title:'Логин',              editingEnabled:true,    width:130,  mask:/^(.)(.*)$/i,                          maskExample:"быть заполнено", basicValue:"-"                                },
                {name: 'password',          title:'Пароль',             editingEnabled:true,    width:130,  mask:/^(.)(.*)$/i,                          maskExample:"быть заполнено", basicValue:"-"                                }
            ],
            tableSettings:{
                add:true, 
                edit:true, 
                delete:true, 
                select:true, 
                cell:false
            },
            tableList:[],
            selectedItem:undefined,
            allDuties:["Администратор", "Кладовщик", "Менеджер", "Логист", "Бухгалтер"],
        }

    }


    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setTableHeaders = (value)=>{this.setState({tableHeaders: value});}
    setTableList = (value)=>{this.setState({tableList: value});}
    setSelectedItem = (value)=>{this.setState({selectedItem: value});}

    componentDidMount(){
        console.log("DidUpdate")
        if (this.state.tableList == ""){
            this.apiGetClients()
        }
    }

    componentDidUpdate(){
        console.log("DidUpdate")

        if (this.lastSelectedItem != this.state.selectedItem){
            let counter = 0
            this.state.allDuties.map(duty=>{
                document.getElementById("checkbox"+counter++).checked=this.state.selectedItem.duty.includes(duty)
            })
            this.lastSelectedItem = this.state.selectedItem
        }
    }

    apiGetClients = async ()=>{
        let result = await api.getClients()
        console.log(result.length)
        console.log(JSON.stringify(result))
        this.setTableList(result)
    }

    btn_send_1=()=>{
        async function apiPostClients(value) {
            await api.postClients(value)
        }
        let buf = JSON.parse(JSON.stringify(this.state.tableList)).map(item=>{
            if (item.duty.split(" ")[0]=="") {
                let buf = ""
                item.duty.split(" ").map(function(item,i){
                    if (i!=0 && item!=""){
                        buf+=item+" "
                    }
                        
                })
                item.duty = buf
            }
            return item
        })
        apiPostClients(buf)
    }

    isSelectedItemUndefined=()=>{return this.state.selectedItem==undefined}

    onAccessChange=(duty)=>{
        console.log()
        let buf = JSON.parse(JSON.stringify(this.state.tableList)).map(item=>{
            if (item.duty.split(" ")[0]!="")
                item.duty = " " + item.duty
            if (item.id==this.state.selectedItem.id && this.state.selectedItem.duty.includes(duty)){
                item.duty = item.duty.replace(` ${duty}`,'');
                this.state.selectedItem.duty = item.duty.replace(` ${duty}`,'')
            } else if (item.id==this.state.selectedItem.id && !this.state.selectedItem.duty.includes(duty)){
                item.duty = item.duty + ` ${duty}`
                this.state.selectedItem.duty = item.duty + ` ${duty}`
            } 
            return item
        })
        this.state.tableList = buf
        this.setReload()
    }

    render(){
        return (
            <FlexibleBlocksPage marginTop={this.state.tabsHeight}>
                <FlexibleBlock>
                    <div class="header_text">Аккаунты</div>
                    <div style={{width:800+'px', display:'inline-table'}} >
                        <TableComponent height={document.documentElement.clientHeight - this.state.tabsHeight - 100} columns={this.state.tableHeaders} rows={this.state.tableList} setNewTableList={this.setTableList} tableSettings={this.state.tableSettings} onSelect={this.setSelectedItem}/>
                    </div>
                    <div></div>
                    <div class="place_holder_administrator"/><button class="bt_send_administrator" onClick={this.btn_send_1}>Подтвердить</button>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Доступные АРМ</div>
                    <div><input id="checkbox0" type="checkbox" onChange={()=>this.onAccessChange(this.state.allDuties[0])}  disabled={this.isSelectedItemUndefined()}/> <a> {this.state.allDuties[0]}</a></div>
                    <div><input id="checkbox1" type="checkbox" onChange={()=>this.onAccessChange(this.state.allDuties[1])}  disabled={this.isSelectedItemUndefined()}/> <a> {this.state.allDuties[1]}</a></div>
                    <div><input id="checkbox2" type="checkbox" onChange={()=>this.onAccessChange(this.state.allDuties[2])}  disabled={this.isSelectedItemUndefined()}/> <a> {this.state.allDuties[2]}</a></div>
                    <div><input id="checkbox3" type="checkbox" onChange={()=>this.onAccessChange(this.state.allDuties[3])}  disabled={this.isSelectedItemUndefined()}/> <a> {this.state.allDuties[3]}</a></div>
                    <div><input id="checkbox4" type="checkbox" onChange={()=>this.onAccessChange(this.state.allDuties[4])}  disabled={this.isSelectedItemUndefined()}/> <a> {this.state.allDuties[4]}</a></div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        )
    }
}

export default AdministratorAccounts