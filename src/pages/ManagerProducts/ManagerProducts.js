import React, { Component, Fragment } from "react";
import './ManagerProducts.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../components/InputText/InputText";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import { TableComponent } from "../../components/Table/TableComponent";
import { recomposeColor } from "@material-ui/core";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import { Api } from "../../api/managerApi"

var api = new Api()
const styles = {

}

let subCategoryList2 = [
    {value: ""     , menuItem: ""},
    {value: "Встраиваемая техника"     , menuItem: "Встраиваемая техника"},
    {value: "Стиральные машины"        , menuItem: "Стиральные машины"},
    {value: "Сушильные машины"         , menuItem: "Сушильные машины"},
    {value: "Холодильники"             , menuItem: "Холодильники"},
    {value: "Морозильные камеры"       , menuItem: "Морозильные камеры"},
    {value: "Винные шкафы"             , menuItem: "Винные шкафы"},
    {value: "Вытяжки"                  , menuItem: "Вытяжки"},
    {value: "Плиты"                    , menuItem: "Плиты"},
    {value: "Посудомоечные машины"     , menuItem: "Посудомоечные машины"},
    {value: "Мелкая бытовая техника"   , menuItem: "Мелкая бытовая техника"},
    {value: "Микроволновые печи"       , menuItem: "Микроволновые печи"},
    {value: "Электродуховки"           , menuItem: "Электродуховки"},
    {value: "Пылесосы"                 , menuItem: "Пылесосы"},
    {value: "Водонагреватели"          , menuItem: "Водонагреватели"},
    {value: "Кулеры и пурифайеры"      , menuItem: "Кулеры и пурифайеры"},
    {value: "Швейные машины, оверлоки" , menuItem: "Швейные машины, оверлоки"}
]

let subCategoryList3 = [
    {value: ""              , menuItem: ""},
    {value: "Варочные поверхности"              , menuItem: "Варочные поверхности"},
    {value: "Духовые шкафы"                     , menuItem: "Духовые шкафы"},
    {value: "Вытяжки"                           , menuItem: "Вытяжки"},
    {value: "Встраиваемые посудомоечные машины" , menuItem: "Встраиваемые посудомоечные машины"},
    {value: "Встраиваемые холодильники"         , menuItem: "Встраиваемые холодильники"},
    {value: "Встраиваемые морозильные камеры"   , menuItem: "Встраиваемые морозильные камеры"},
    {value: "Встраиваемые микроволновые печи"   , menuItem: "Встраиваемые микроволновые печи"},
    {value: "Встраиваемые комплекты"            , menuItem: "Встраиваемые комплекты"},
    {value: "Кухонные мойки"                    , menuItem: "Кухонные мойки"},
    {value: "Измельчители отходов"              , menuItem: "Измельчители отходов"},
    {value: "Кухня"                             , menuItem: "Кухня"},
    {value: "Бытовые приборы для дома"          , menuItem: "Бытовые приборы для дома"},
    {value: "Красота и гигиена"                 , menuItem: "Красота и гигиена"},
    {value: "Косметические приборы"             , menuItem: "Косметические приборы"},
    {value: "Медицина и реабилитация"           , menuItem: "Медицина и реабилитация"},
]

class ManagerProducts extends Component {

    lastSelectedItemId = undefined

    constructor(props){
        super(props)
        this.state={
            reload:0,
            tabsHeight:102,
            expandList1:subCategoryList2,
            expandListValue1:subCategoryList2[0],
            expandList2:subCategoryList3,
            expandListValue2:subCategoryList3[0],
            tableHeaders:[
                {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
                {name: 'goodsCategories2',  title:'Категория',          editingEnabled:true,    width:200, dropdownList: subCategoryList2, basicValue:subCategoryList2[0].value}, 
                {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:true,    width:200, dropdownList: subCategoryList3, basicValue:subCategoryList3[0].value}, 
                {name: 'goodsType',         title:'Наименование',       editingEnabled:true,    width:330,  mask:/^(.)(.*)$/i, maskExample:"быть заполнено", basicValue:"Товар"}, 
                {name: 'amountOnWarehouse', title:'Кол-во на складе',   editingEnabled:false,   width:135, basicValue:"0"}, 
                {name: 'cost',              title:'Цена ед товара',     editingEnabled:true,    width:125, isCurrency:true,  mask:/^[1-9][0-9]{0,10}$/i, maskExample:"быть числом больше единицы", basicValue:"1"},
                {name: 'goodsLimit',        title:'Лимит товара',       editingEnabled:true,    width:120,  mask:/^[0-9]{0,10}$/i, maskExample:"быть числом больше нуля", basicValue:"0"},
            ],
            tableSettings:{
                add:true, 
                edit:true, 
                delete:false, 
                select:true, 
                defaultSelection:true,
                filter: true
            },
            tableList:[],
            selectedItemId:undefined,
            isRedacting:false,
            good:"",
            cost:"",
            goodLimit:"",
            goodCharacteristics:"",
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setExpandListValue1 = (value)=>{this.setState({expandListValue1: {value:value}});}
    setExpandListValue2 = (value)=>{this.setState({expandListValue2: {value:value}});}
    setTableList = (value)=>{this.setState({tableList: value});}
    setSelectedItemId = (value)=>{this.setState({selectedItemId: value});}
    setIsRedacting = (value)=>{this.setState({isRedacting: value});}
    setGood = (value)=>{this.setState({good: value});}
    setCost = (value)=>{this.setState({cost: value});}
    setGoodLimit = (value)=>{this.setState({goodLimit: value});}
    setGoodCharacteristics = (value)=>{this.setState({goodCharacteristics: value});}

    apiGetGoodsTypeCats = async () => {
        var buffer = await api.getGoodsTypeCats()
        this.setTableList(buffer)
        this.setSelectedItemId(buffer[0])
    }

    componentDidMount(){
        if (this.state.tableList.toString() == "")
            this.apiGetGoodsTypeCats()
    }

    componentDidUpdate(){
        if (this.lastSelectedItemId != this.state.selectedItemId){
            this.setIsRedacting(false)
            if (this.state.tableList.length > 0) this.setDataInTable2(this.state.selectedItemId)
            this.lastSelectedItemId = this.state.selectedItemId
        }
    }

    setDataInTable2=(value)=>{
        if (value != undefined){
            this.state.good = value.goodsType
            this.state.expandListValue1 = {value:value.goodsCategories2}
            this.state.expandListValue2 = {value:value.goodsCategories3}
            this.state.cost = value.cost
            this.state.goodLimit = value.goodsLimit
            this.state.goodCharacteristics = value.description
            this.setReload()
        }
    }

    btn_1=()=>{
        this.setIsRedacting(!this.state.isRedacting)
    }

    btn_2=()=>{
        
        this.setTableList(this.state.tableList.map(good=>{
            if (good.id == this.state.selectedItemId.id){
                console.log(good)
                good = {
                    id: good.id, 
                    number: good.number, 
                    goodsCategories2: this.state.expandListValue1.value, 
                    goodsCategories3: this.state.expandListValue2.value, 
                    goodsType: this.state.good, 
                    goodsLimit: this.state.goodLimit, 
                    amountOnWarehouse: good.amountOnWarehouse,
                    description: this.state.goodCharacteristics,
                    code: good.code,
                    cost: this.state.cost
                }
            }
            return good
        }))
        this.setIsRedacting(false)
    }

    //-------------------------------------------------------------------------Блок 3 конец
    

    render(){
        return (
            <FlexibleBlocksPage marginTop={this.state.tabsHeight}>
                <FlexibleBlock>
                    <div class="header_text">Товары</div>
                    <div style={{width:800+'px', display:'inline-table'}}>
                        <TableComponent height={document.documentElement.clientHeight - this.state.tabsHeight - 70} columns={this.state.tableHeaders} rows={this.state.tableList} onSelect={this.setSelectedItemId} setNewTableList={this.setTableList} tableSettings={this.state.tableSettings}/>
                    </div>
                </FlexibleBlock>
                <FlexibleBlock>
                    {!this.state.isRedacting
                    ?<div style={{width:350+"px"}}>
                        <div class="header_text">Характеристики товара</div>
                        <div class="low_text bold">Название:&nbsp;<label class="normal">{this.state.good}</label></div>
                        <div class="low_text bold">Категория:&nbsp;<label class="normal">{this.state.expandListValue1.value}</label></div>
                        <div class="low_text bold">Подкатегория:&nbsp;<label class="normal">{this.state.expandListValue2.value}</label></div>
                        <div class="low_text bold">Цена&nbsp;ед&nbsp;товара&nbsp;<label class="normal">{this.state.cost} ₽</label></div>
                        <div class="low_text bold">Лимит&nbsp;товара&nbsp;:&nbsp;<label class="normal">{this.state.goodLimit}</label></div>
                        <div class="low_text bold">Хар-ки&nbsp;товара:&nbsp;</div><div class="low_text normal">{this.state.goodCharacteristics}</div>
                        <div></div>
                        <div style={{width: 'calc(100% - 110px)', display: 'inline-block'}}/><button style={{width: "110px", height: "fit-content", alignSelf: "flex-end"}} onClick={this.btn_1}>Редактировать</button>
                    </div>
                    :<div style={{width:350+"px"}}>
                        <div class="header_text">Редактирование товара</div>
                        <InputTextArea styles = "" label="Название:&nbsp;" placeholder="название товара" set={this.setGood} defValue={this.state.good}  mask={/^(.)(.*)$/i} maskExample="быть заполнено"/>
                        {/* <InputText styles = "row_with_item_equal" label="Название:&nbsp;" placeholder="название товара" defValue={good} set={setGood} mask={/^(.)(.*)$/i} maskExample="быть заполнено"/>  */}
                        <div class="low_text row_with_item_equal"><div>Категория&nbsp;</div><ExpandListInput width={177} defValue={this.state.expandListValue1} list={this.state.expandList1} func={this.setExpandListValue1}/></div>
                        <div class="low_text row_with_item_equal"><div>Подкатегория&nbsp;</div><ExpandListInput width={177} defValue={this.state.expandListValue2} list={this.state.expandList2} func={this.setExpandListValue2}/></div>
                        <InputText styles = "row_with_item_equal" label="Цена&nbsp;ед&nbsp;товара&nbsp;" placeholder="цена ед товара" defValue={this.state.cost} set={this.setCost} mask={/^[1-9][0-9]{0,10}$/i} maskExample="быть числом больше единицы"/> 
                        <InputText styles = "row_with_item_equal" label="Лимит&nbsp;товара&nbsp;" placeholder="лимит товара" defValue={this.state.goodLimit} set={this.setGoodLimit} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputTextArea styles = "" label="Хар-ки&nbsp;товара:&nbsp;" placeholder="хар-ки товара" set={this.setGoodCharacteristics} defValue={this.state.goodCharacteristics}/>
                        <div></div>
                        <div style={{width: 'calc(100% - 230px)', display: 'inline-block'}}/>
                        <button style={{width: "110px", height: "fit-content", alignSelf: "flex-end", marginRight:"10px"}} onClick={this.btn_2}>Сохранить</button>
                        <button style={{width: "110px", height: "fit-content", alignSelf: "flex-end"}} onClick={this.btn_1}>Отмена</button>
                    </div>
                    }
                </FlexibleBlock>
            </FlexibleBlocksPage>
        )
    }
}
export default ManagerProducts