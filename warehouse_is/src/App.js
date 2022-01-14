import React from 'react';
import './App.css';
import TabHolder from './components/TabHolder/TabHolder';
import StorekeeperAdvent from './pages/StorekeeperAdvent/StorekeeperAdvent';
import StorekeeperAllocation from './pages/StorekeeperAllocation/StorekeeperAllocation';
import StorekeeperExpend from './pages/StorekeeperExpend/StorekeeperExpend';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';
import StorekeeperInventory from './pages/StorekeeperInventory/StorekeeperInventory';

const styles = {
  headTabs: {
  }
}


function App() {

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
  
  let [mainTabs, setMainTab] = React.useState([
    {id:0, selected: true, title: "АРМ Кладовщика"},
    {id:1, selected: false, title: "АРМ Менеджера"},
    {id:2, selected: false, title: "АРМ Логиста"},
    {id:3, selected: false, title: "АРМ Бухгалтера"},
    {id:4, selected: false, title: "KeyCloak"},
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
      {id:0, selected: true, title: "Приход", page: <StorekeeperAdvent Id={0}/>},
      {id:1, selected: false, title: "Расход", page: <StorekeeperExpend Id={1}/>},
      {id:2, selected: false, title: "Расстановка товаров", page: <StorekeeperAllocation Id={2}/>},
      {id:3, selected: false, title: "Инвентаризация", page: <StorekeeperInventory Id={3}/>},
    ],[
      {id:4, selected: true, title: "Заказы", page: <StorekeeperAdvent Id={4}/>},
      {id:5, selected: false, title: "Товары", page: <StorekeeperAdvent Id={5}/>},
      {id:6, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={6}/>},
    ],[
      {id:7, selected: true, title: "Товары", page: <StorekeeperAdvent Id={7}/>},
      {id:8, selected: false, title: "Создание заказа", page: <StorekeeperAdvent Id={8}/>},
      {id:9, selected: false, title: "Заказы на продажу", page: <StorekeeperAdvent Id={9}/>},
      {id:10, selected: false, title: "Заказы на поставку", page: <StorekeeperAdvent Id={10}/>},
      {id:11, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={11}/>},
    ],[
      {id:12, selected: true, title: "Товары", page: <StorekeeperAdvent Id={12}/>},
      {id:13, selected: false, title: "Накладные", page: <StorekeeperAdvent Id={13}/>},
      {id:14, selected: false, title: "Отчеты", page: <StorekeeperAdvent Id={14}/>},
      {id:15, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent Id={15}/>},
    ],[
      {id:16, selected: true, title: "Аккаунты", page: <StorekeeperAdvent Id={16}/>},
    ]
  ])

  function getSelectedSubTabId(){
    let tabId = getSelectedTabId();
    for (let i=0;i<subTabs[tabId].length;i++)
    if (subTabs[tabId][i].selected) return i
  }

  function onSubTabClick(tab_id){
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
}

export default App;
