import React, { Component, Fragment } from "react";
import './SelledProducts.css';
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

  

export default function SelledProducts(props){
    let accountData = props.cookies.accountData


    var id=0
    function getId(){return id++}
    
    let newDate = new Date()
    let title = 'Проданные товары за промежуток времени'
    

    const [dateFrom, setDateFrom] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()   <10?`0${newDate.getMonth()   }`:newDate.getMonth()   }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    const [dateTo, setDateTo] =     React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1 <10?`0${newDate.getMonth()+1 }`:newDate.getMonth()+1 }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)

    var customizationSettings={
        customizeCell:(exportVariables, cell, row, column)=>{
            // if (row.number < 3) {
            //   cell.font = { color: { argb: 'AAAAAA' } };
            // }
            // if (row.number > 4) {
            //   if (column.name === 'password') {
            //     cell.font = { color: { argb: '000000' } };
            //     cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
            //   }
            // }
            return cell
        },
        customizeSummaryCell: (exportVariables, cell)=>{
            // cell.font = { italic: true };
            return cell
        },
        customizeHeader: (exportVariables, worksheet)=>{
            const generalStyles = {
                font: { bold: true },
                alignment: { horizontal: 'left' },
            };

            const generalFont = { bold: true, size: 12 }
            
            //row 1 cell 1
            console.log("1 1")
            worksheet.getRow(1).getCell(1).value = 'Дата составления:'
            Object.assign(worksheet.getRow(1).getCell(1), generalStyles)
            worksheet.getRow(1).getCell(1).font = generalFont
            //row 1 cell 3
            console.log("1 3")
            worksheet.getRow(1).getCell(2).value = exportVariables.currentDate
            //row 1 cell 4
            console.log("1 4")
            worksheet.getRow(1).getCell(3).value = 'Составил:'
            Object.assign(worksheet.getRow(1).getCell(3), generalStyles);
            worksheet.getRow(1).getCell(3).font = generalFont
            //row 1 cell 5
            console.log("1 5")
            worksheet.getRow(1).getCell(4).value = `${exportVariables.accountData.surname} ${exportVariables.accountData.name} ${exportVariables.accountData.patronymic}`

            //row 3 cell 1
            console.log("2")
            worksheet.getRow(3).getCell(1).value = 'Содержание:'
            Object.assign(worksheet.getRow(3).getCell(1), generalStyles);
            worksheet.getRow(3).getCell(1).font = generalFont
            //row 3 cell 3
            console.log("3")
            worksheet.mergeCells(3, 2, 3, 4);
            worksheet.getRow(3).getCell(2).value = exportVariables.title
            //row 4 cell 1
            console.log("4")
            worksheet.getRow(4).getCell(1).value = 'Дата от:'
            Object.assign(worksheet.getRow(4).getCell(1), generalStyles);
            worksheet.getRow(4).getCell(1).font = generalFont
            //row 4 cell 3
            worksheet.getRow(4).getCell(2).value = exportVariables.dateFrom
            //row 4 cell 4
            worksheet.getRow(4).getCell(3).value = 'Дата до:'
            Object.assign(worksheet.getRow(4).getCell(3), generalStyles);
            worksheet.getRow(4).getCell(3).font = generalFont
            //row 4 cell 5
            worksheet.getRow(4).getCell(4).value = exportVariables.dateTo

            worksheet.addRow({});

            return worksheet
        },
        customizeFooter:(exportVariables, worksheet)=>{
            const { lastRow } = worksheet;
            let currentRowIndex = lastRow.number + 2;
            for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
                worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 6);
                Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
            }
            worksheet.getRow(currentRowIndex).getCell(1).value = 'If you have any questions, please contact John Smith.';
            currentRowIndex += 1;
            worksheet.getRow(currentRowIndex).getCell(1).value = 'Phone: +111-111';
            currentRowIndex += 1;
            worksheet.getRow(currentRowIndex).getCell(1).value = 'For demonstration purposes only';
            worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
            return worksheet
        },
    }
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'goodsCategories2',  title:'Категория',          editingEnabled:false,   width:100   }, 
        {name: 'goodsCategories3',  title:'Подкатегория',       editingEnabled:false,   width:120   }, 
        {name: 'goodsType',         title:'Наименование',       editingEnabled:false,   width:120   }, 
        {name: 'selledNumber',      title:'Кол-во проданного',  editingEnabled:false,   width:150   }, 
        {name: 'priceOfOneProduct', title:'Цена ед товара',     editingEnabled:false,   width:120, isCurrency:true }, 
        {name: 'sumPrice',          title:'Цена всего',         editingEnabled:false,   width:120, totalCount:{type:['sum'], expantionAlign: 'right'}, isCurrency:true},
    ]) 

    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        filter: true,
        exportExel:true, 
        exportExelFileName:"SelledProductsReport",
        exportCustomization: customizationSettings,
        exportVariables:{
            title:title, 
            currentDate:`${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}.${newDate.getMonth()+1<10?`0${newDate.getMonth()+1}`:newDate.getMonth()}.${newDate.getFullYear()}`, 
            accountData:accountData, 
            dateFrom:dateFrom.replace("-", ".").replace("-", "."), 
            dateTo:dateTo.replace("-", ".").replace("-", ".")
        }
    }

    const [tableList, setTableList] = React.useState([
        {id:0, number:"1",goodsCategories2:"Встраиваемая техника",goodsCategories3:"Варочные поверхности",goodsType:"Варочная поверхность Bosch PKE 645 B17E",selledNumber:30,priceOfOneProduct:44.5,sumPrice:30*44.5},
        {id:1, number:"2",goodsCategories2:"Стиральные машины",goodsCategories3:"Духовые шкафы",goodsType:"Варочная поверхность Bosch PKE 645 B18E",selledNumber:45,priceOfOneProduct:37.3,sumPrice:45*37.3}
    ])
    const [selectedItem, setSelectedItem] = React.useState()

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