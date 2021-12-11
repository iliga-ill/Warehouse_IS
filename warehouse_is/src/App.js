import React from 'react';
import './App.css';
import TabHolder from './components/TabHolder/TabHolder';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';
//import TodoList from './pages/test/TodoList';

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
  
    const tabs = [
        {id:1, selected: true, title: "АРМ Кладовщика"},
        {id:2, selected: false, title: "АРМ Менеджера"},
        {id:3, selected: false, title: "АРМ Логиста"},
        {id:4, selected: false, title: "АРМ Бухгалтера"},
        {id:5, selected: false, title: "KeyCloak"},
      ]

  return (
      <div class="header">
        <div class="headTabs">
          <TabHolder tabs={tabs}/>
        </div>
        <div class="userAvatar">
          <AvatarHolder/>
        </div>
      </div>
  );
}

export default App;
