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
import AdministratorRackCreating from './pages/AdministratorRackCreating/AdministratorRackCreating';
import AdministratorGoodCreating from './pages/AdministratorGoodCreating/AdministratorGoodCreating';
import AdministratorZoneCreating from './pages/AdministratorZoneCreating/AdministratorZoneCreating';
import AdministratorWarehouseCreating from './pages/AdministratorWarehouseCreating/AdministratorWarehouseCreating';
import ManagerOrderCreation from './pages/ManagerOrderCreation/ManagerOrderCreation';
import ManagerSellOrders from './pages/ManagerSellOrders/ManagerSellOrders';
import ManagerShipmentOrders from './pages/ManagerShipmentOrders/ManagerShipmentOrders';
import ManagerBills from './pages/ManagerBills/ManagerBills';
import LogisticianOrders from './pages/LogisticianOrders/LogisticianOrders';
import LogisticianProducts from './pages/LogisticianProducts/LogisticianProducts';
import LogisticianBills from './pages/LogisticianBills/LogisticianBills';
import AccountantProducts from './pages/AccountantProducts/AccountantProducts';
import AccountantInvoice from './pages/AccountantInvoice/AccountantInvoice';
import PaybackOfGoods from './pages/AccountantReports/PaybackOfGoods/PaybackOfGoods';
import ProductTurnover from './pages/AccountantReports/ProductTurnover/ProductTurnover';
import PurchasedProducts from './pages/AccountantReports/PurchasedProducts/PurchasedProducts';
import SelledProducts from './pages/AccountantReports/SelledProducts/SelledProducts';
import AccountantAccounts from './pages/AccountantAccounts/AccountantAccounts';
import StorekeeperVirtualWarehouse from './pages/StorekeeperVirtualWarehouse/StorekeeperVirtualWarehouse';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import WarehouseISicon from './images/WarehouseISicon.png';
import React from 'react';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'

const mainTabsArray = [
  {title: "АРМ Кладовщика",     href:"/Storekeeper",    basicHref:"/StorekeeperAdvent/Current"},
  {title: "АРМ Менеджера",      href:"/Manager",        basicHref:"/ManagerProducts"},
  {title: "АРМ Логиста",        href:"/Logistician",    basicHref:"/LogisticianOrders/Current"},
  {title: "АРМ Бухгалтера",     href:"/Accountant",     basicHref:"/AccountantProducts"},
  {title: "АРМ Администратора", href:"/Administrator",  basicHref:"/AdministratorAccounts"},
]

const subTabsArray = [
  [
    {title: "Приход",                     roleHref:"/Storekeeper",    href:"/StorekeeperAdvent", basicHref:"/Current"},
    {title: "Расход",                     roleHref:"/Storekeeper",    href:"/StorekeeperExpend", basicHref:"/Current"},
    {title: "Расстановка товаров",        roleHref:"/Storekeeper",    href:"/StorekeeperAllocation", basicHref:""},
    {title: "Инвентаризация",             roleHref:"/Storekeeper",    href:"/StorekeeperInventory", basicHref:""},
    {title: "Виртуальный склад",          roleHref:"/Storekeeper",    href:"/StorekeeperVirtualWarehouse", basicHref:""},
  ],[
    {title: "Товары",                     roleHref:"/Manager",        href:"/ManagerProducts", basicHref:""},
    {title: "Создание заказа",            roleHref:"/Manager",        href:"/ManagerOrderCreation", basicHref:""},
    {title: "Заказы на продажу",          roleHref:"/Manager",        href:"/ManagerSellOrders", basicHref:"/Current"},
    {title: "Заказы на поставку",         roleHref:"/Manager",        href:"/ManagerShipmentOrders", basicHref:"/Current"},
    {title: "Счета на оплату",            roleHref:"/Manager",        href:"/ManagerBills", basicHref:"/NewAccounts"},
  ],[
    {title: "Заказы",                     roleHref:"/Logistician",    href:"/LogisticianOrders", basicHref:"/Current"},
    {title: "Товары",                     roleHref:"/Logistician",    href:"/LogisticianProducts", basicHref:""},
    {title: "Счета на оплату",            roleHref:"/Logistician",    href:"/LogisticianBills", basicHref:"/NewAccounts"},
  ],[
    {title: "Товары",                     roleHref:"/Accountant",     href:"/AccountantProducts", basicHref:""},
    {title: "Накладные",                  roleHref:"/Accountant",     href:"/AccountantInvoice", basicHref:"/Current"},
    {title: "Отчеты",                     roleHref:"/Accountant",     href:"/AccountantReports", basicHref:"/SelledProducts"},
    {title: "Счета на оплату",            roleHref:"/Accountant",     href:"/AccountantAccounts", basicHref:"/NewAccounts"},
  ],[
    {title: "Аккаунты",                   roleHref:"/Administrator",  href:"/AdministratorAccounts", basicHref:""},
    {title: "Создание элементов склада",  roleHref:"/Administrator",  href:"/AdministratorCreating", basicHref:"/RackCreating"},
  ]
]

const supportTabsArray = [
    {title: "Текущие",              roleHref:"/Storekeeper",    subHref:"/StorekeeperAdvent",     supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Storekeeper",    subHref:"/StorekeeperAdvent",     supportHref:"/Completed"},
    {title: "Текущие",              roleHref:"/Storekeeper",    subHref:"/StorekeeperExpend",     supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Storekeeper",    subHref:"/StorekeeperExpend",     supportHref:"/Completed"},
    {title: "Текущие",              roleHref:"/Manager",        subHref:"/ManagerSellOrders",     supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Manager",        subHref:"/ManagerSellOrders",     supportHref:"/Completed"},
    {title: "Текущие",              roleHref:"/Manager",        subHref:"/ManagerShipmentOrders", supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Manager",        subHref:"/ManagerShipmentOrders", supportHref:"/Completed"},
    {title: "Новые счета",          roleHref:"/Manager",        subHref:"/ManagerBills",          supportHref:"/NewAccounts"},
    {title: "Закрытые счета",       roleHref:"/Manager",        subHref:"/ManagerBills",          supportHref:"/ClosedAccounts"},
    {title: "Текущие",              roleHref:"/Logistician",    subHref:"/LogisticianOrders",     supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Logistician",    subHref:"/LogisticianOrders",     supportHref:"/Completed"},
    {title: "Новые счета",          roleHref:"/Logistician",    subHref:"/LogisticianBills",      supportHref:"/NewAccounts"},
    {title: "Закрытые счета",       roleHref:"/Logistician",    subHref:"/LogisticianBills",      supportHref:"/ClosedAccounts"},
    {title: "Текущие",              roleHref:"/Accountant",     subHref:"/AccountantInvoice",     supportHref:"/Current"},
    {title: "Выполненные",          roleHref:"/Accountant",     subHref:"/AccountantInvoice",     supportHref:"/Completed"},
    {title: "Проданные товары",     roleHref:"/Accountant",     subHref:"/AccountantReports",     supportHref:"/SelledProducts"},
    {title: "Купленные товары",     roleHref:"/Accountant",     subHref:"/AccountantReports",     supportHref:"/PurchasedProducts"},
    {title: "Оборот товара",        roleHref:"/Accountant",     subHref:"/AccountantReports",     supportHref:"/ProductTurnover"},
    {title: "Окупаемость товаров",  roleHref:"/Accountant",     subHref:"/AccountantReports",     supportHref:"/PaybackOfGoods"},
    {title: "Новые счета",          roleHref:"/Accountant",     subHref:"/AccountantAccounts",    supportHref:"/NewAccounts"},
    {title: "Закрытые счета",       roleHref:"/Accountant",     subHref:"/AccountantAccounts",    supportHref:"/ClosedAccounts"},

    {title: "Создание зоны",        roleHref:"/Administrator",  subHref:"/AdministratorCreating", supportHref:"/ZoneCreating"},
    {title: "Создание стеллажа",    roleHref:"/Administrator",  subHref:"/AdministratorCreating", supportHref:"/RackCreating"},
    {title: "Создание товара",      roleHref:"/Administrator",  subHref:"/AdministratorCreating", supportHref:"/GoodCreating"},
    {title: "Изменение конфигурации склада",roleHref:"/Administrator",  subHref:"/AdministratorCreating", supportHref:"/WarehouseCreating"},
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
    if (cookies.accountData!==undefined){
      var mainTabsBuff = []
      var subTabsBuff = []
      var admin = false
      cookies.accountData.roles.map(role=>{
        if (role==="Администратор"){admin=true}
        if (role==="Кладовщик"){
          mainTabsBuff.push(mainTabsArray[0])
          subTabsBuff.push(subTabsArray[0])
        }
        if (role==="Менеджер"){
          mainTabsBuff.push(mainTabsArray[1])
          subTabsBuff.push(subTabsArray[1])
        }
        if (role==="Логист"){
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
      if (tab.href.split("/")[1]===location.pathname.split("/")[1]) check = true
    })
    return check
  }

  function checkAccess(){
      var check=false
      subTabs.map(tab=>{
        if (location.pathname.split("/")[1] === tab[0].roleHref.split("/")[1]) check=true
      })
      if (!isRolePage()) check = true
      if (!check) navigate(subTabs[0][0].roleHref + subTabs[0][0].href + subTabs[0][0].basicHref)
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
  
  if (cookies.access_token !== undefined){
    return (
      <div id = "allPageWrap">
        <div className="header">
          <div className="homePage" onClick={()=>{navigate("/Home")}}>
            <img src={WarehouseISicon} className="homeIcon"/>
          </div>
          <div className="headTabs">
            <TabHolder tabs={mainTabs}/>
          </div>
            <AvatarHolder cookies={cookies} setCookie={setCookie}/>
        </div>
        {isRolePage() && checkAccess() &&
          <SubTabHolder tabs={subTabs} supTabs={supportTabsArray}/>
        }
        <Routes>
          <Route path="/Storekeeper/StorekeeperAdvent/Current" element={wrapErrorBoundary(<StorekeeperAdvent isCurrent={true}/>)}/>
          <Route path="/Storekeeper/StorekeeperAdvent/Completed" element={wrapErrorBoundary(<StorekeeperAdvent isCurrent={false}/>)}/>
          <Route path="/Storekeeper/StorekeeperExpend/Current" element={wrapErrorBoundary(<StorekeeperExpend isCurrent={true}/>)}/>
          <Route path="/Storekeeper/StorekeeperExpend/Completed" element={wrapErrorBoundary(<StorekeeperExpend isCurrent={false}/>)}/>
          <Route path="/Storekeeper/StorekeeperAllocation" element={wrapErrorBoundary(<StorekeeperAllocation/>)}/>
          <Route path="/Storekeeper/StorekeeperInventory" element={wrapErrorBoundary(<StorekeeperInventory/>)}/>
          <Route path="/Storekeeper/StorekeeperVirtualWarehouse" element={wrapErrorBoundary(<StorekeeperVirtualWarehouse/>)}/>

          <Route path="/Manager/ManagerProducts" element={wrapErrorBoundary(<ManagerProducts/>)}/>
          <Route path="/Manager/ManagerOrderCreation" element={wrapErrorBoundary(<ManagerOrderCreation/>)}/>
          <Route path="/Manager/ManagerSellOrders/Current" element={wrapErrorBoundary(<ManagerSellOrders isCurrent={true}/>)}/>
          <Route path="/Manager/ManagerSellOrders/Completed" element={wrapErrorBoundary(<ManagerSellOrders isCurrent={false}/>)}/>
          <Route path="/Manager/ManagerShipmentOrders/Current" element={wrapErrorBoundary(<ManagerShipmentOrders isCurrent={true}/>)}/>
          <Route path="/Manager/ManagerShipmentOrders/Completed" element={wrapErrorBoundary(<ManagerShipmentOrders isCurrent={false}/>)}/>
          <Route path="/Manager/ManagerBills/NewAccounts" element={wrapErrorBoundary(<ManagerBills isCurrent={true}/>)}/>
          <Route path="/Manager/ManagerBills/ClosedAccounts" element={wrapErrorBoundary(<ManagerBills isCurrent={false}/>)}/>

          <Route path="/Logistician/LogisticianOrders/Current" element={wrapErrorBoundary(<LogisticianOrders isCurrent={true}/>)}/>
          <Route path="/Logistician/LogisticianOrders/Completed" element={wrapErrorBoundary(<LogisticianOrders isCurrent={false}/>)}/>
          <Route path="/Logistician/LogisticianProducts" element={wrapErrorBoundary(<LogisticianProducts/>)}/>
          <Route path="/Logistician/LogisticianBills/NewAccounts" element={wrapErrorBoundary(<LogisticianBills isCurrent={true}/>)}/>
          <Route path="/Logistician/LogisticianBills/ClosedAccounts" element={wrapErrorBoundary(<LogisticianBills isCurrent={false}/>)}/>

          <Route path="/Accountant/AccountantProducts" element={wrapErrorBoundary(<AccountantProducts/>)}/>
          <Route path="/Accountant/AccountantInvoice/Current" element={wrapErrorBoundary(<AccountantInvoice isCurrent={true}/>)}/>
          <Route path="/Accountant/AccountantInvoice/Completed" element={wrapErrorBoundary(<AccountantInvoice isCurrent={false}/>)}/>
          <Route path="/Accountant/AccountantReports/SelledProducts" element={wrapErrorBoundary(<SelledProducts  cookies={cookies}/>)}/>
          <Route path="/Accountant/AccountantReports/PurchasedProducts" element={wrapErrorBoundary(<PurchasedProducts  cookies={cookies}/>)}/>
          <Route path="/Accountant/AccountantReports/ProductTurnover" element={wrapErrorBoundary(<ProductTurnover  cookies={cookies}/>)}/>
          <Route path="/Accountant/AccountantReports/PaybackOfGoods" element={wrapErrorBoundary(<PaybackOfGoods  cookies={cookies}/>)}/>
          <Route path="/Accountant/AccountantAccounts/NewAccounts" element={wrapErrorBoundary(<AccountantAccounts isCurrent={true}/>)}/>
          <Route path="/Accountant/AccountantAccounts/ClosedAccounts" element={wrapErrorBoundary(<AccountantAccounts isCurrent={false}/>)}/>

          <Route path="/Administrator/AdministratorAccounts" element={wrapErrorBoundary(<AdministratorAccounts/>)}/>
          <Route path="/Administrator/AdministratorCreating/RackCreating" element={wrapErrorBoundary(<AdministratorRackCreating/>)}/>
          <Route path="/Administrator/AdministratorCreating/GoodCreating" element={wrapErrorBoundary(<AdministratorGoodCreating/>)}/>
          <Route path="/Administrator/AdministratorCreating/ZoneCreating" element={wrapErrorBoundary(<AdministratorZoneCreating/>)}/>
          <Route path="/Administrator/AdministratorCreating/WarehouseCreating" element={wrapErrorBoundary(<AdministratorWarehouseCreating/>)}/>
          
          <Route path="/Profile" element={wrapErrorBoundary(<Profile cookies={cookies}/>)}/>
          <Route path="/Home" element={wrapErrorBoundary(<Home cookies={cookies}/>)}/>
        </Routes>
      </div>
    );
  } else {
    return <Authorization setCookie={setCookie}/> 
  }
}