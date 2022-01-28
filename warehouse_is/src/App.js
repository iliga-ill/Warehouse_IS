import './App.css';
import TabHolder from './components/TabHolder/TabHolder';
import StorekeeperAdvent from './pages/StorekeeperAdvent/StorekeeperAdvent';
import StorekeeperAllocation from './pages/StorekeeperAllocation/StorekeeperAllocation';
import StorekeeperExpend from './pages/StorekeeperExpend/StorekeeperExpend';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';
import StorekeeperInventory from './pages/StorekeeperInventory/StorekeeperInventory';
import ManagerProducts from './pages/ManagerProducts/ManagerProducts';
import Authorization from './pages/Authorization/Authorization';
import AdministratorAccounts from './pages/AdministratorAccounts/AdministratorAccounts';
import React from 'react';

//import API from './api/api.js';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
const host = 'http://localhost:5000';

const styles = {
  headTabs: {
  }
}

export default function App() {

  //#region reloadPage
  const [reload, setReload] = React.useState(0)
  const [authorizated, setAuthorizated] = React.useState(false)

  function reloadPage(){
    setReload(reload+1)
  }

  //#region верхние табы

  var [mainTabs, setMainTab] = React.useState([
    {id:0, selected: true, title: "АРМ Кладовщика"},
    {id:1, selected: false, title: "АРМ Менеджера"},
    {id:2, selected: false, title: "АРМ Администратора"},
    /*
    {id:1, selected: false, title: "АРМ Менеджера"},
    {id:2, selected: false, title: "АРМ Логиста"},
    {id:3, selected: false, title: "АРМ Бухгалтера"},
    {id:4, selected: false, title: "KeyCloak"},*/
  ])

  function getSelectedTabId(){
    for (let i=0;i<mainTabs.length;i++){
      if (mainTabs[i].selected) return i
    }
  }

  function onTabClick(tab_id){
    var mT = mainTabs
    mT.map(tab => {
      if (tab.id != tab_id){
        tab.selected = false
      } else {
        tab.selected = true
      }
      return tab
    })
    setMainTab(mT)
    reloadPage()
  }

  var [subTabs, setSubTabs] = React.useState([
    [
      {id:0, selected: true, title: "Приход", page: <StorekeeperAdvent Id={100}/>},
      {id:1, selected: false, title: "Расход", page: <StorekeeperExpend Id={200}/>},
      {id:2, selected: false, title: "Расстановка товаров", page: <StorekeeperAllocation Id={300}/>},
      {id:3, selected: false, title: "Инвентаризация", page: <StorekeeperInventory Id={400}/>},
    ],[
      {id:0, selected: true, title: "Заказы", page: <StorekeeperAdvent Id={500}/>},
      {id:1, selected: false, title: "Товары", page: <ManagerProducts Id={600}/>},
      {id:2, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={700}/>},
    ],[
      {id:0, selected: true, title: "Аккаунты", page: <AdministratorAccounts Id={800}/>},
    ],[
      {id:0, selected: true, title: "Товары", page: <StorekeeperAdvent Id={7}/>},
      {id:1, selected: false, title: "Создание заказа", page: <StorekeeperAdvent Id={8}/>},
      {id:2, selected: false, title: "Заказы на продажу", page: <StorekeeperAdvent Id={9}/>},
      {id:3, selected: false, title: "Заказы на поставку", page: <StorekeeperAdvent Id={10}/>},
      {id:4, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={11}/>},
    ],[
      {id:0, selected: true, title: "Товары", page: <StorekeeperAdvent Id={12}/>},
      {id:1, selected: false, title: "Накладные", page: <StorekeeperAdvent Id={13}/>},
      {id:2, selected: false, title: "Отчеты", page: <StorekeeperAdvent Id={14}/>},
      {id:3, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={15}/>},
    ],[
      {id:0, selected: true, title: "Аккаунты", page: <StorekeeperAdvent Id={16}/>},
    ]
  ])

  function getSelectedSubTabId(){
    let tabId = getSelectedTabId();
    for (let i=0;i<subTabs[tabId].length;i++){
      if (subTabs[tabId][i].selected) return i
    }
  }

  function onSubTabClick(tab_id){
    var sT = subTabs
    sT[getSelectedTabId()].map(tab => {
      if (tab.id == tab_id){
        tab.selected = true
      }else {
        tab.selected = false
      }
      return tab
    })
    setSubTabs(sT)
    reloadPage()
  }
  //#endregion верхние табы конец

  if (authorizated){
    return (
      <div>
        <div class="header">
          <div class="headTabs">
            <TabHolder tabs={mainTabs} onTabClick={onTabClick}/>
          </div>
          <div class="userAvatar">
            <AvatarHolder/>
          </div>
        </div>
        <div class="header">
          <TabHolder tabs={subTabs[getSelectedTabId()]} onTabClick={onSubTabClick}/>
        </div>
            {subTabs[getSelectedTabId()][getSelectedSubTabId()].page} 
      </div>
    );
  } else {
    return <Authorization func={setAuthorizated} authorizated={authorizated}/> 
  }
}


