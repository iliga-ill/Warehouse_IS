import React, { Component, Fragment } from "react";
import './PaybackOfGoods.css';
import Table from "../../../components/Table/Table";
import FlexibleBlocksPage from "../../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import InputText from "../../../components/InputText/InputText";
import InputTextArea from "../../../components/InputTextArea/InputTextArea";
import ExpandListInputRegular from "../../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import InputDate from "../../../components/InputDate/InputDate";
import { TableComponent } from "../../../components/Table/TableComponent";
const host = 'http://localhost:5000';

const styles = {

  }

  

export default function PaybackOfGoods(props){
    let accountData = props.cookies.accountData
    let newDate = new Date()
    let title = "Окупаемость товаров за промежуток времени"

    var id=0
    function getId(){return id++}

    const [dateFrom, setDateFrom] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()   <10?`0${newDate.getMonth()   }`:newDate.getMonth()   }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    const [dateTo, setDateTo] =     React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1 <10?`0${newDate.getMonth()+1 }`:newDate.getMonth()+1 }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)

    var customizationSettings={
        customizeCell:(exportVariables, cell, row, column)=>{

            if (column.name == "profit" && cell.value<=0)
                cell.font = { color: { argb: 'FF0000' } }
                
            if (column.name == "profit" && cell.value>0)
                cell.font = { color: { argb: '00B050' } }

            return cell
        },
        customizeSummaryCell: (exportVariables, cell, isExportSeletedRows, selection, rows)=>{
            cell.value = ""
            return cell
        },
        customizeHeader: (exportVariables, worksheet)=>{
            const generalStyles = {
                font: { bold: true },
                alignment: { horizontal: 'left' },
            };

            const generalFont = { bold: true, size: 12 }
            
            //row 1 cell 1
            worksheet.getRow(1).getCell(1).value = 'Дата составления:'
            Object.assign(worksheet.getRow(1).getCell(1), generalStyles)
            worksheet.getRow(1).getCell(1).font = generalFont
            //row 1 cell 3
            worksheet.getRow(1).getCell(2).value = exportVariables.currentDate
            //row 1 cell 4
            worksheet.getRow(1).getCell(3).value = 'Составил:'
            Object.assign(worksheet.getRow(1).getCell(3), generalStyles);
            worksheet.getRow(1).getCell(3).font = generalFont
            //row 1 cell 5
            worksheet.mergeCells(1, 4, 1, 5);
            worksheet.getRow(1).getCell(4).value = `${exportVariables.accountData.surname} ${exportVariables.accountData.name} ${exportVariables.accountData.patronymic}`

            //row 3 cell 1
            worksheet.getRow(3).getCell(1).value = 'Содержание:'
            Object.assign(worksheet.getRow(3).getCell(1), generalStyles);
            worksheet.getRow(3).getCell(1).font = generalFont
            //row 3 cell 2
            worksheet.mergeCells(3, 2, 3, 4);
            worksheet.getRow(3).getCell(2).value = exportVariables.title
            //row 4 cell 1
            worksheet.getRow(4).getCell(1).value = 'Дата от:'
            Object.assign(worksheet.getRow(4).getCell(1), generalStyles);
            worksheet.getRow(4).getCell(1).font = generalFont
            //row 4 cell 2
            worksheet.getRow(4).getCell(2).value = exportVariables.dateFrom
            //row 4 cell 3
            worksheet.getRow(4).getCell(3).value = 'Дата до:'
            Object.assign(worksheet.getRow(4).getCell(3), generalStyles);
            worksheet.getRow(4).getCell(3).font = generalFont
            //row 4 cell 4
            worksheet.getRow(4).getCell(4).value = exportVariables.dateTo

            worksheet.addRow({});

            return worksheet
        },
        customizeFooter:(exportVariables, worksheet, isExportSeletedRows, selection, rows)=>{
            const generalStyles = {
                font: { bold: true },
                alignment: { horizontal: 'left' },
            };
            const generalFont = { bold: true, size: 12 }
            const { lastRow, columnCount } = worksheet;
            console.log(worksheet)
            let currentRowIndex = lastRow.number + 1;

            let sumProfit = 0
            rows.map(row=>{
                var isSelected = false
                selection.map(selectedId=>{
                    if (row.id == selectedId) isSelected=true
                })
                if (!isExportSeletedRows || isSelected){
                    sumProfit+=row.profit
                }
            })

            //Ожидаемый остаток на складе
            worksheet.mergeCells(currentRowIndex, columnCount-2, currentRowIndex, columnCount-1);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).value = 'Чистая прибыль:'
            Object.assign(worksheet.getRow(currentRowIndex).getCell(columnCount-2), generalStyles);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).font = generalFont

            worksheet.getRow(currentRowIndex).getCell(columnCount).value = sumProfit
            worksheet.getRow(currentRowIndex).getCell(columnCount).numFmt = '0₽';
            
            return worksheet
        },
    }
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                      editingEnabled:false,   width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',              editingEnabled:false,   width:100   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',           editingEnabled:false,   width:120   }, 
        {name: 'goodsType',         title:'Наименование',           editingEnabled:false,   width:120   }, 
        {name: 'selledNumber',      title:'Кол-во проданного',      editingEnabled:false,   width:150   }, 
        {name: 'avgPurchaseCost',   title:'Средняя цена закупки',   editingEnabled:false,   width:165, isCurrency:true }, 
        {name: 'avgSellCost',       title:'Средняя цена продажи',   editingEnabled:false,   width:175, isCurrency:true }, 
        {name: 'profit',            title:'Прибыль',                editingEnabled:false,   width:120, totalCount:{type:['sum'], expantionAlign: 'left'}, isCurrency:true},
    ]) 

    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        filter: true,
        select:true, 
        massSelection:true,
        exportExel:true, 
        exportExelFileName:"SelledProductsReport",
        exportCustomization: customizationSettings,
        exportVariables:{
            title:title, 
            currentDate:`${newDate.getFullYear()}.${newDate.getMonth()+1<10?`0${newDate.getMonth()+1}`:newDate.getMonth()}.${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`, 
            accountData:accountData, 
            dateFrom:dateFrom.replace("-", ".").replace("-", "."), 
            dateTo:dateTo.replace("-", ".").replace("-", "."),
        }
    }

    const [tableList, setTableList] = React.useState([
        {id:0, number:"1",goodsCategories2:"Встраиваемая техника",goodsCategories3:"Варочные поверхности",goodsType:"Варочная поверхность Bosch PKE 645 B17E",selledNumber:30,avgPurchaseCost:44.5,avgSellCost:54.5, profit:30*54.5-30*44.5},
        {id:1, number:"2",goodsCategories2:"Встраиваемая техника",goodsCategories3:"Варочные поверхности",goodsType:"Варочная поверхность Bosch PKE 645 B17E",selledNumber:14,avgPurchaseCost:34.5,avgSellCost:24.5, profit:14*24.5-14*34.5},
        {id:2, number:"3",goodsCategories2:"Встраиваемая техника",goodsCategories3:"Варочные поверхности",goodsType:"Варочная поверхность Bosch PKE 645 B17E",selledNumber:25,avgPurchaseCost:24.5,avgSellCost:34.5, profit:25*34.5-25*24.5},
    ])


    return (
        <>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">{title}</div>
                    <div style={{width:'170px'}}>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;от&nbsp;</div><InputDate defValue={dateFrom}   func={setDateFrom}/></div>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;до&nbsp;</div><InputDate defValue={dateTo}     func={setDateTo}/></div>
                    </div>
                    <div style={{width:"min-content", display:'inline-table'}} >
                        <TableComponent height={600} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
    
}