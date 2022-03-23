import './App.css';
import TabHolder from './components/TabHolders/TabHolder/TabHolder';
import SubTabHolder from './components/TabHolders/SubTabHolder/SubTabHolder';
import StorekeeperAdvent from './pages/StorekeeperAdvent/StorekeeperAdvent';
import StorekeeperAllocation from './pages/StorekeeperAllocation/StorekeeperAllocation';
import StorekeeperExpend from './pages/StorekeeperExpend/StorekeeperExpend';
import AvatarHolder from './components/AvatarHolder/AvatarHolder';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import StorekeeperInventory from './pages/StorekeeperInventory/StorekeeperInventory';
import ManagerProducts from './pages/ManagerProducts/ManagerProducts';
import Authorization from './pages/Authorization/Authorization';
import AdministratorAccounts from './pages/AdministratorAccounts/AdministratorAccounts';
import ManagerOrderCreation from './pages/ManagerOrderCreation/ManagerOrderCreation';
import ManagerSellOrders from './pages/ManagerSellOrders/ManagerSellOrders';
import ManagerShipmentOrders from './pages/ManagerShipmentOrders/ManagerShipmentOrders';
import LogisticianOrders from './pages/LogisticianOrders/LogisticianOrders';
import LogisticianProducts from './pages/LogisticianProducts/LogisticianProducts';
import React from 'react';
import {Routes, Route} from "react-router-dom"

const host = 'http://localhost:5000';

const styles = {
  headTabs: {
  }
}

export default function App() {
  const [authorizated, setAuthorizated] = React.useState(1)

  //туду - починить переключение текущих заказов и старых 
  //вынести авторизацию и сделать на нее редирект если человек не авторизован
  //сделать нормальную авторизацию
  //проверить работоспособность всех вкладок
  //доработать роутинг согласно видео (убрать полную загрузку страницы)
  //сделать нормальное апи как в уроках
  //сделать доступными только роуты, которые есть у аккаунта
  //сделать подгрузку по несколько элментов в таблице, и до подгрузку по мере пролистывания
  //#region верхние табы

  var [mainTabs, setMainTab] = React.useState([
    {title: "АРМ Кладовщика",     href:"/Storekeeper",    basicHref:"/StorekeeperAdvent"},
    {title: "АРМ Менеджера",      href:"/Manager",        basicHref:"/ManagerProducts"},
    {title: "АРМ Логиста",        href:"/Logistician",    basicHref:"/LogisticianOrders"},
    {title: "АРМ Администратора", href:"/Administrator",  basicHref:"/AdministratorAccounts"},
    /*
    {id:4, selected: false, title: "АРМ Бухгалтера"},
    */
  ])

  var [subTabs, setSubTabs] = React.useState([
    [
      {title: "Приход",               roleHref:"/Storekeeper",    href:"/StorekeeperAdvent"},
      {title: "Расход",               roleHref:"/Storekeeper",    href:"/StorekeeperExpend"},
      {title: "Расстановка товаров",  roleHref:"/Storekeeper",    href:"/StorekeeperAllocation"},
      {title: "Инвентаризация",       roleHref:"/Storekeeper",    href:"/StorekeeperInventory"},
    ],[
      {title: "Товары",               roleHref:"/Manager",        href:"/ManagerProducts"},
      {title: "Создание заказа",      roleHref:"/Manager",        href:"/ManagerOrderCreation"},
      {title: "Заказы на продажу",    roleHref:"/Manager",        href:"/ManagerSellOrders"},
      {title: "Заказы на поставку",   roleHref:"/Manager",        href:"/ManagerShipmentOrders"},
    ],[
      {title: "Заказы",               roleHref:"/Logistician",    href:"/LogisticianOrders"},
      {title: "Товары",               roleHref:"/Logistician",    href:"/LogisticianProducts"},
    ],[
      {title: "Аккаунты",             roleHref:"/Administrator",  href:"/AdministratorAccounts"},
    ]
    // ,[
    //   {id:0, title: "Товары", roleHref:"/Storekeeper", href:"/StorekeeperAdvent", page: <StorekeeperAdvent Id={12}/>},
    //   {id:1, title: "Накладные", roleHref:"/Storekeeper", href:"/StorekeeperAdvent", page: <StorekeeperAdvent Id={13}/>},
    //   {id:2, title: "Отчеты", roleHref:"/Storekeeper", href:"/StorekeeperAdvent", page: <StorekeeperAdvent Id={14}/>},
    //   {id:3, title: "Счета на оплату", roleHref:"/Storekeeper", href:"/StorekeeperAdvent", page: <StorekeeperAdvent Id={15}/>},
    // ]
  ])
  //#endregion верхние табы конец

  function wrapErrorBoundary(component){
    return (
      <ErrorBoundary>
        {component}
      </ErrorBoundary>
    )
  }

  if (authorizated != -1){
    return (
      <div>
        <div className="header">
          <div className="headTabs">
            <TabHolder tabs={mainTabs}/>
          </div>
          <div className="userAvatar">
            <AvatarHolder/>
          </div>
        </div>
        <div className="header">
          <SubTabHolder tabs={subTabs}/>
        </div>
        {/* {subTabs[getSelectedTabId()][getSelectedSubTabId()].page} */}
        <Routes>
          <Route path="/Storekeeper/StorekeeperAdvent" element={wrapErrorBoundary(<StorekeeperAdvent Id={100}/>)}/>
          <Route path="/Storekeeper/StorekeeperExpend" element={wrapErrorBoundary(<StorekeeperExpend Id={200}/>)}/>
          <Route path="/Storekeeper/StorekeeperAllocation" element={wrapErrorBoundary(<StorekeeperAllocation Id={300}/>)}/>
          <Route path="/Storekeeper/StorekeeperInventory" element={wrapErrorBoundary(<StorekeeperInventory Id={400}/>)}/>
          <Route path="/Manager/ManagerProducts" element={wrapErrorBoundary(<ManagerProducts Id={500}/>)}/>
          <Route path="/Manager/ManagerOrderCreation" element={wrapErrorBoundary(<ManagerOrderCreation Id={600}/>)}/>
          <Route path="/Manager/ManagerSellOrders" element={wrapErrorBoundary(<ManagerSellOrders Id={700}/>)}/>
          <Route path="/Manager/ManagerShipmentOrders" element={wrapErrorBoundary(<ManagerShipmentOrders Id={800}/>)}/>
          <Route path="/Logistician/LogisticianOrders" element={wrapErrorBoundary(<LogisticianOrders Id={900}/>)}/>
          <Route path="/Logistician/LogisticianProducts" element={wrapErrorBoundary(<LogisticianProducts Id={1000}/>)}/>
          <Route path="/Administrator/AdministratorAccounts" element={wrapErrorBoundary(<AdministratorAccounts Id={1100}/>)}/>
        </Routes>
      </div>
    );
  } else {
    return <Authorization func={setAuthorizated} authorizated={authorizated}/> 
  }
}
