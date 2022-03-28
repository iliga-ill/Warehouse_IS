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
import AccountantProducts from './pages/AccountantProducts/AccountantProducts';
import AccountantInvoice from './pages/AccountantInvoice/AccountantInvoice';
import AccountantReports from './pages/AccountantReports/AccountantReports';
import AccountantAccounts from './pages/AccountantAccounts/AccountantAccounts';
import Profile from './pages/Profile/Profile';
import React from 'react';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'

const host = 'http://localhost:5000';

const mainTabsArray = [
  {title: "АРМ Кладовщика",     href:"/Storekeeper",    basicHref:"/StorekeeperAdvent"},
  {title: "АРМ Менеджера",      href:"/Manager",        basicHref:"/ManagerProducts"},
  {title: "АРМ Логиста",        href:"/Logistician",    basicHref:"/LogisticianOrders"},
  {title: "АРМ Администратора", href:"/Administrator",  basicHref:"/AdministratorAccounts"},
  {title: "АРМ Бухгалтера",     href:"/Accountant",     basicHref:"/AccountantProducts"},
]

const subTabsArray = [
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
  ],[
    {title: "Товары",               roleHref:"/Accountant",     href:"/AccountantProducts"},
    {title: "Накладные",            roleHref:"/Accountant",     href:"/AccountantInvoice"},
    {title: "Отчеты",               roleHref:"/Accountant",     href:"/AccountantReports"},
    {title: "Счета на оплату",      roleHref:"/Accountant",     href:"/AccountantAccounts"},
  ]
]


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'accountData'])
  // let expires = new Date()
  // expires.setTime(expires.getTime() + (20 * 1000))

  var [mainTabs, setMainTab] = React.useState([])
  var [subTabs, setSubTabs] = React.useState(subTabsArray)

  React.useEffect(() => {
    if (cookies.accountData!=undefined){
      var mainTabsBuff = []
      var subTabsBuff = []
      var admin = false
      cookies.accountData.roles.map(role=>{
        if (role=="Администратор"){admin=true}
        if (role=="Кладовщик"){
          mainTabsBuff.push(mainTabsArray[0])
          subTabsBuff.push(subTabsArray[0])
        }
        if (role=="Менеджер"){
          mainTabsBuff.push(mainTabsArray[1])
          subTabsBuff.push(subTabsArray[1])
        }
        if (role=="Логист"){
          mainTabsBuff.push(mainTabsArray[2])
          subTabsBuff.push(subTabsArray[2])
        }
      })
      if (admin){
        mainTabsBuff = mainTabsArray
        subTabsBuff = subTabsArray
      }
      setMainTab(mainTabsBuff)
      setSubTabs(subTabsBuff)
      checkAccess()
    }
  }, [cookies.accountData]);

  function isRolePage(){
    var check = false
    mainTabsArray.map(tab=>{
      if (tab.href.split("/")[1]==location.pathname.split("/")[1]) check = true
    })
    return check
  }

  function checkAccess(){
      var check=false
      subTabs.map(tab=>{
        if (location.pathname.split("/")[1] == tab[0].roleHref.split("/")[1]) check=true
      })
      if (!isRolePage()) check = true
      if (!check) navigate(subTabs[0][0].roleHref + subTabs[0][0].href)
      return check
  }

  function wrapErrorBoundary(component){
    return (
      <ErrorBoundary>
        {component}
      </ErrorBoundary>
    )
  }
  
  //setCookie('access_token', undefined, { path: '/Storekeeper/StorekeeperAdvent',  expires})

  console.log("cookies.get('Authorization'): " + cookies.access_token)
  
  if (cookies.access_token != undefined){
    return (
      <div>
        <div className="header">
          <div className="headTabs">
            <TabHolder tabs={mainTabs}/>
          </div>
          <div className="userAvatar">
            <AvatarHolder cookies={cookies} setCookie={setCookie}/>
          </div>
        </div>
        {isRolePage() && checkAccess()
          ? <div className="header">
              <SubTabHolder tabs={subTabs}/>
            </div>
          : <></>
        }
        <Routes>
          <Route path="/Storekeeper/StorekeeperAdvent" element={wrapErrorBoundary(<StorekeeperAdvent/>)}/>
          <Route path="/Storekeeper/StorekeeperExpend" element={wrapErrorBoundary(<StorekeeperExpend/>)}/>
          <Route path="/Storekeeper/StorekeeperAllocation" element={wrapErrorBoundary(<StorekeeperAllocation/>)}/>
          <Route path="/Storekeeper/StorekeeperInventory" element={wrapErrorBoundary(<StorekeeperInventory/>)}/>
          <Route path="/Manager/ManagerProducts" element={wrapErrorBoundary(<ManagerProducts/>)}/>
          <Route path="/Manager/ManagerOrderCreation" element={wrapErrorBoundary(<ManagerOrderCreation/>)}/>
          <Route path="/Manager/ManagerSellOrders" element={wrapErrorBoundary(<ManagerSellOrders/>)}/>
          <Route path="/Manager/ManagerShipmentOrders" element={wrapErrorBoundary(<ManagerShipmentOrders/>)}/>
          <Route path="/Logistician/LogisticianOrders" element={wrapErrorBoundary(<LogisticianOrders/>)}/>
          <Route path="/Logistician/LogisticianProducts" element={wrapErrorBoundary(<LogisticianProducts/>)}/>
          <Route path="/Administrator/AdministratorAccounts" element={wrapErrorBoundary(<AdministratorAccounts/>)}/>

          <Route path="/Accountant/AccountantProducts" element={wrapErrorBoundary(<AccountantProducts/>)}/>
          <Route path="/Accountant/AccountantInvoice" element={wrapErrorBoundary(<AccountantInvoice/>)}/>
          <Route path="/Accountant/AccountantReports" element={wrapErrorBoundary(<AccountantReports/>)}/>
          <Route path="/Accountant/AccountantAccounts" element={wrapErrorBoundary(<AccountantAccounts/>)}/>

          <Route path="/Profile" element={wrapErrorBoundary(<Profile cookies={cookies}/>)}/>
        </Routes>
      </div>
    );
  } else {
    return <Authorization setCookie={setCookie}/> 
  }
}
