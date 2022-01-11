import React from 'react';
import './App.css';
import TabHolder from './components/TabHolder/TabHolder';
import StorekeeperAdvent from './pages/StorekeeperAdvent/StorekeeperAdvent';
import StorekeeperAllocation from './pages/StorekeeperAllocation/StorekeeperAllocation';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';

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
      {id:0, selected: true, title: "Приход", page: <StorekeeperAdvent/>},
      {id:1, selected: false, title: "Расход", page: <StorekeeperAdvent/>},
      {id:2, selected: false, title: "Расстановка товаров", page: <StorekeeperAllocation/>},
      {id:3, selected: false, title: "Инвентаризация", page: <StorekeeperAdvent/>},
    ],[
      {id:0, selected: true, title: "Заказы", page: <StorekeeperAdvent/>},
      {id:1, selected: false, title: "Товары", page: <StorekeeperAdvent/>},
      {id:2, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent/>},
    ],[
      {id:0, selected: true, title: "Товары", page: <StorekeeperAdvent/>},
      {id:1, selected: false, title: "Создание заказа", page: <StorekeeperAdvent/>},
      {id:2, selected: false, title: "Заказы на продажу", page: <StorekeeperAdvent/>},
      {id:3, selected: false, title: "Заказы на поставку", page: <StorekeeperAdvent/>},
      {id:4, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent/>},
    ],[
      {id:0, selected: true, title: "Товары", page: <StorekeeperAdvent/>},
      {id:1, selected: false, title: "Накладные", page: <StorekeeperAdvent/>},
      {id:2, selected: false, title: "Отчеты", page: <StorekeeperAdvent/>},
      {id:3, selected: false, title: "Счета на оплату", page: <StorekeeperAdvent/>},
    ],[
      {id:0, selected: true, title: "Аккаунты", page: <StorekeeperAdvent/>},
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
