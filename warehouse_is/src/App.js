import './App.css';
import TabHolder from './components/TabHolder/TabHolder';
import StorekeeperAdvent from './pages/StorekeeperAdvent/StorekeeperAdvent';
import StorekeeperAllocation from './pages/StorekeeperAllocation/StorekeeperAllocation';
import StorekeeperExpend from './pages/StorekeeperExpend/StorekeeperExpend';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';
import StorekeeperInventory from './pages/StorekeeperInventory/StorekeeperInventory';
import ManagerProducts from './pages/ManagerProducts/ManagerProducts';
import Authorization from './pages/Authorization/Authorization';
import React, { useState } from 'react';
//import API from './api/api.js';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
const host = 'http://localhost:5000';


const styles = {
  headTabs: {
  }
}

var authorizated = false
var accounts = [
  {name: "Владимир", password:"Путин"},
  {name: "Николай", password:"111"},
  {name: "Сергей", password:"3"}
]

var temp = []
var isFirstTime = true

function App() {
  function setTemp(value) {
    temp = value
    console.log(temp)
    apiGetGoodsByOrder(temp)
  }


  function apiGetOrders(tab_id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host+'/orders', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          var answer = JSON.parse(this.response)
          
          //console.log(answer)
          //console.log(this.request.response)
      
        //var array = this.response
        var counter = 0
        answer.map( function(item, i) {
            if (i === 0 & item.status != "closed")  temp[i] = {id:counter++, text: item.name, selected: true, code: item.code}
            else if (item.status != "closed") temp[i] = {id:counter++, text: item.name, selected: false, code: item.code}
        })
        // answer.forEach(element => {
        //     list_with_search_items.add({id:0, text: element.name, selected: false})
        // });
        console.log(temp)
        subTabs[getSelectedTabId()].map(tab => {
          let mainTabId=getSelectedTabId();
          if (tab.id != tab_id){
            subTabs[mainTabId][tab.id].selected = false
            //console.log(tabs[tab_id-1].selected + " " + tab_id)
          }
          else {
            subTabs[mainTabId][tab.id].selected = true
          }
          return tab
        })
        reloadPage()
      }
    }
    
    xhr.send(null);
  }   

  function apiGetGoodsByOrder(orders_array) {
    var xhr = new XMLHttpRequest();
    var order = ''
    orders_array.forEach(element => {
      if (element.selected == true) order = element
    });

    console.log("Selected order " + order.code)
    xhr.open('GET', host+'/order_goods_by_order'+'?'+`code=${order.code}`, true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var answer = JSON.parse(this.response)
        console.log(answer)
      }
    }
    
    xhr.send(null);
 }

  // const todos = [
  //   {id:1, completed: false, title: "Купить хлеб"},
  //   {id:2, completed: false, title: "Купить масло"},
  //   {id:3, completed: false, title: "Купить молоко"}
  // ]
/* <h1>title</h1>
      <TodoList todos={todos} /> */

  let [reload, setReload] = React.useState(0)

  function reloadPage(){
    setReload(reload+1)
  }

 
  function onAuthorized(){
      authorizated=true
      reloadPage()
    }

  let [mainTabs, setMainTab] = React.useState([
    {id:0, selected: true, title: "АРМ Кладовщика"},/*
    {id:1, selected: false, title: "АРМ Менеджера"},
    {id:2, selected: false, title: "АРМ Логиста"},
    {id:3, selected: false, title: "АРМ Бухгалтера"},
    {id:4, selected: false, title: "KeyCloak"},*/
  ])

  function getSelectedTabId(){
    for (let i=0;i<mainTabs.length;i++)
    if (mainTabs[i].selected) return i
  }

  function onTabClick(tab_id){
    setMainTab(
      mainTabs.map(tab => {
        if (tab.id != tab_id){
          mainTabs[tab.id].selected = false
          //console.log(tabs[tab_id-1].selected + " " + tab_id)
        }
        else {
          mainTabs[tab.id].selected = true
        }
        return tab
      })
    )
  }

  let [subTabs, setSubTab] = React.useState([
    [
      {id:0, selected: true, title: "Приход", page: <StorekeeperAdvent Id={100} list={temp} func={setTemp}/>},
      {id:1, selected: false, title: "Расход", page: <StorekeeperExpend Id={200}/>},
      {id:2, selected: false, title: "Расстановка товаров", page: <StorekeeperAllocation Id={300}/>},
      {id:3, selected: false, title: "Инвентаризация", page: <StorekeeperInventory Id={400}/>},
    ],[
      {id:0, selected: true, title: "Заказы", page: <StorekeeperAdvent Id={4}/>},
      {id:1, selected: false, title: "Товары", page: <ManagerProducts Id={5}/>},
      {id:2, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={6}/>},
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
    for (let i=0;i<subTabs[tabId].length;i++)
    if (subTabs[tabId][i].selected) return i
  }

  function onSubTabClick(tab_id){
    console.log("Click")
    apiGetOrders(tab_id)
    // subTabs[getSelectedTabId()].map(tab => {
    //   let mainTabId=getSelectedTabId();
    //   if (tab.id != tab_id){
    //     subTabs[mainTabId][tab.id].selected = false
    //     //console.log(tabs[tab_id-1].selected + " " + tab_id)
    //   }
    //   else {
    //     subTabs[mainTabId][tab.id].selected = true
    //   }
    //   return tab
    // })
    // reloadPage()
  }

  if (isFirstTime) { 
     isFirstTime = false
     apiGetOrders()
  }


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
    return <Authorization func={onAuthorized} accounts={accounts}/> 
  }
}

export default App;
