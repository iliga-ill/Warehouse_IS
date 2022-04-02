import React, { Component, Fragment } from "react";
import './AccountantReports.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../components/InputDate/InputDate";
import SwitchHolder from "../../components/TabHolders/SwitchHolder/SwitchHolder";
import { TableComponent } from "../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function AccountantReports(props){

    var id=0
    function getId(){return id++}
    
    //-------------------------------------------------------------------------Табы
    const [reload, setReload] = React.useState(0)
    function reloadPage(){
        setReload(reload+1)
    }

    var [tabs, setTabs] = React.useState([
          {id:0, selected: true, title: "Отчет 1"},
          {id:1, selected: false, title: "Отчет 2"},
          {id:2, selected: false, title: "Отчет 3"}
      ])

      React.useEffect(() => {
      }, [reload]);

    function onTabClick(tab_id){
        var mT = tabs
        mT.map(tab => {
            if (tab.id != tab_id){
                tab.selected = false
            } else {
                tab.selected = true
            }
            return tab
        })
        setTabs(mT)
        reloadPage()
    }
    //-------------------------------------------------------------------------Табы конец

    return (
        <>
            <SwitchHolder tabs={tabs} onTabClick={onTabClick}/>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">Отчеты, в разработке</div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}