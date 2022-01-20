import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

var goods_categories = [
  {id:0, text: "Крупная бытовая техника"}
]
function set_goods_categories(value){ goods_categories = value}

var goods_categories2 = []
function set_goods_categories2(value){ goods_categories2 = value}

var goods_categories3 = []
function set_goods_categories3(value){ goods_categories3 = value}

var goods_categories4 = []
function set_goods_categories4(value){ goods_categories4 = value}

var goods_type_list = [{id:0, text: "", category: "", sub_category: "", ordered: "", amount: "", code: ""}]
function set_goods_type_list(value){ goods_type_list = value}

var authorizated = false
function set_authorizated(value){ authorizated = value}

var goods_by_order = []
function set_goods_by_order(value){ goods_by_order = value; }

var accounts = [
   {name: "Владимир", surname: "Владимирович", patronymic:"Путин", login: "Путин", password: "1", phone_num:"+8 495 606 36 02", duty:"Кладовщик"},
  // {name: "Николай", password:"111"},
  // {name: "Сергей", password:"3"}
]
function set_accounts(value){ accounts = value}



function rerender(){
  ReactDOM.render(
    <React.StrictMode>
      <App 
        goods_categories={goods_categories} set_goods_categories={set_goods_categories}
        goods_categories2 = {goods_categories2} set_goods_categories2={set_goods_categories2}
        goods_categories3  = {goods_categories3} set_goods_categories3={set_goods_categories3}
        goods_categories4 = {goods_categories4} set_goods_categories4={set_goods_categories4}
        goods_type_list = {goods_type_list} set_goods_type_list={set_goods_type_list}
        authorizated = {authorizated} set_authorizated={set_authorizated}
        accounts = {accounts} set_accounts={set_accounts}
        goods_by_order = {goods_by_order} set_goods_by_order={set_goods_by_order}
        rerender={rerender}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerender()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
