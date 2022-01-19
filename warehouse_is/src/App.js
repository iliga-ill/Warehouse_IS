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
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//import API from './api/api.js';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
const host = 'http://localhost:5000';

const styles = {
  headTabs: {
  }
}

//#region авторизация
var authorizated = false
var accounts = [
   {login: "user", password: "1", user_name: "Владимир", user_surname: "Владимирович", user_patronymic:"Путин", telephone:"+8 495 606 36 02", duty:"Кладовщик"},
  // {name: "Николай", password:"111"},
  // {name: "Сергей", password:"3"}
]

function apiGetClients() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/clients', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var answer = JSON.parse(this.response)
      answer.map( function(item, i) {
        accounts[i] = {login: item.login, password: item.password, user_name: item.name, user_surname: item.surname}
      })
      onStart()
    }
  }
  
  xhr.send(null);
}
//#endregion авторизация конец
//#region получение заказов
// var goods_by_order = []
//#endregion получение заказов конец
//#region категории с первой вкладки
var goods_categories = [
  {id:0, text: "Крупная бытовая техника"}
]
var goods_categories2 = []
var goods_categories3 = []
var goods_categories4 = []
var goods_type_list = []

function apiGetGoodsCat() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_cat', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var answer = JSON.parse(this.response)
      answer.map( function(item, i) {
        console.log(this.responseText);
      })
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat2() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat2', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var answer = JSON.parse(this.response)
      answer.map( function(item, i) {
        goods_categories2[i] = {id:i, text: item.name, code: item.code}
      })
      console.log(goods_categories2)
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat3() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat3', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var answer = JSON.parse(this.response)
      answer.map( function(item, i) {
        goods_categories3[i] = {id:i, text: item.name, code: item.code}
      })
      console.log(goods_categories3)
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsSubCat4() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_subcat4', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(this.responseText);
    }
  }
  
  xhr.send(null);
}

function apiGetGoodsType() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', host+'/goods_type', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var answer = JSON.parse(this.response)
      answer.map( function(item, i) {
        goods_type_list[i] = {id:i, text: item.name, category: item.category, sub_category: item.subcategory_2, ordered: item.amount_ordered, amount: item.amount, code: item.code}
      })
      console.log(goods_type_list)
    }
  }
  
  xhr.send(null);
}
//#endregion категории с первой вкладки конец
//#region запросы со старта
function onStart() {
  apiGetGoodsSubCat2()
  apiGetGoodsSubCat3()
  apiGetGoodsType()
}

apiGetClients()


var temp = []
var isFirstTime = true
//#endregion запросы со старта конец

function App() {

  //#region reloadPage
  let [reload, setReload] = React.useState(0)

  function reloadPage(){
    setReload(reload+1)
  }
  var [goods_by_order, setGoodsByOrder] = React.useState([])
  //#endregion reloadPage конец

//   function rerender() {
//     forceUpdate()
// }
  //#region авторизация
  function onAuthorized(){
    authorizated=true
    reloadPage()
  }

  function setAccounts(value){
    accounts=value
  }
  //#endregion авторизация конец

  //#region верхние табы

  let [mainTabs, setMainTab] = React.useState([
    {id:0, selected: true, title: "АРМ Кладовщика"},
    {id:1, selected: false, title: "АРМ Администратора"},
    /*
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
      {id:0, selected: true, title: "Приход", page: <StorekeeperAdvent Id={100} list={temp} func={setTemp} order_list={goods_by_order} func2={setGoodByOrder}/>},
      {id:1, selected: false, title: "Расход", page: <StorekeeperExpend Id={200}/>},
      {id:2, selected: false, title: "Расстановка товаров", page: <StorekeeperAllocation Id={300}/>},
      {id:3, selected: false, title: "Инвентаризация", page: <StorekeeperInventory Id={400}/>},
    ],[
      {id:0, selected: true, title: "Аккаунты", page: <AdministratorAccounts accounts={accounts} func={setAccounts} Id={500}/>},
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

  function changeSubTab(tab_id){
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

  function onSubTabClick(tab_id){
    if (tab_id==0) {
      apiGetOrders(tab_id)
    } else {
      changeSubTab(tab_id)
    }
  }
  //#endregion верхние табы конец

  //#region Страница 1 подстраница 1
  function setTemp(value, tab_id) {
    temp = value
    console.log(temp)
    apiGetGoodsByOrder(temp, tab_id)
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
        //setTemp(temp, tab_id)
        changeSubTab(tab_id)
        reloadPage()
      }
    }
    
    xhr.send(null);
  }   

  function apiGetGoodsByOrder(orders_array, tab_id) {
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
        console.log("------------")
        console.log(answer)
        console.log("------------")
        var bar = []
        //console.log(goods_type_list)
        answer.map( function(item, i) {
          var foo = item.goods
          //goods_by_order[i] = {id:i, category: "goods_categories[answer.category-1]", sub_category: "goods_categories2[answer.sub_category_2-1]",  text: "answer.name", amount_ordered: "answer.amount_ordered", amount: "answer.amount", code: foo}
          goods_type_list.forEach (function(item2, j) {
            var it = parseInt(item2.code)
            if (it == item.goods) {
              bar[i] = {id:i, category: goods_categories[0].text, sub_category: goods_categories2[item2.sub_category-1].text,  text: item2.text, amount_ordered: item2.ordered, amount: item2.amount, code: foo}
            }
              
          })
        })
        console.log(bar)
        // changeSubTab(1)
        // changeSubTab(0)
        // if (tab_id == 0) {
        //   ReactDOM.render(
        //     <StorekeeperAdvent Id={100} list={temp} func={setTemp} order_list={goods_by_order} func2={setGoodByOrder}/>,
        //     document.getElementById('page_container')
        //   )
        // }
        //subTabs[0][0].page.setReload()
        document.getElementById('page_container').removeChild(document.getElementById('100'))
        
        setGoodByOrder(bar)
        document.getElementById('page_container').appendChild(subTabs[getSelectedTabId()][getSelectedSubTabId()].page)
        reloadPage()
        // changeSubTab(tab_id)
        //apiGetGoodsType()
      }
    }
  
    
    xhr.send(null);
  }

  // function apiGetGoodsType() {
  //   var size = goods_by_order.length;
  //   console.log(goods_by_order)
  //   goods_by_order.forEach( function(element, i) {
  //     console.log(`element = ${element.code}`)
  //     var xhr = new XMLHttpRequest();
  //     var elm = i
  //     xhr.open('GET', host+'/goods_type'+'?'+`code=${goods_by_order[elm].code}`, true);
      
  //     xhr.onreadystatechange = function() {
  //       if (xhr.readyState == XMLHttpRequest.DONE) {
  //         var id = goods_by_order[elm].id
          
  //         var answer = JSON.parse(this.response)
  //         console.log(`answer: ${answer}`)
  //         console.log(`Element before: ${goods_by_order[elm].text}`)
  //         element = {id:id, category: goods_categories[answer.category-1], sub_category: goods_categories2[answer.sub_category_2-1],  text: answer.name, amount_ordered: answer.amount_ordered, amount: answer.amount, code: answer.code}
  //         goods_by_order[elm] = element
  //         console.log(`Element: ${goods_by_order[elm].text}`)
       
  //         if (i == size-1) reloadPage()
  //       }
  //     }
      
  //     xhr.send(null);
  //   })
    
  //}

  function setGoodByOrder(value) {
    setGoodsByOrder(value)
    console.log(`Goods: ${goods_by_order}`)
  }

  //#endregion Страница 1 подстраница 1 конец

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
          <div id='page_container'>
             {subTabs[getSelectedTabId()][getSelectedSubTabId()].page} 
          </div>
      </div>
    );
  } else {
    return <Authorization func={onAuthorized} accounts={accounts}/> 
  }
}

export default App;
