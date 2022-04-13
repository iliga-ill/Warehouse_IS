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

    var id=0
    function getId(){return id++}
    
    let newDate = new Date()

    const [dateFrom, setDateFrom] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()   <10?`0${newDate.getMonth()   }`:newDate.getMonth()   }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    const [dateTo, setDateTo] =     React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1 <10?`0${newDate.getMonth()+1 }`:newDate.getMonth()+1 }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)

    var customizationSettings={
        customizeCell:(cell, row, column)=>{
            if (row.number < 3) {
              cell.font = { color: { argb: 'AAAAAA' } };
            }
            if (row.number > 4) {
              if (column.name === 'password') {
                cell.font = { color: { argb: '000000' } };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
              }
            }
            return cell
        },
        customizeSummaryCell: (cell)=>{
            cell.font = { italic: true };
            return cell
        },
        customizeHeader: (worksheet)=>{
            const generalStyles = {
                font: { bold: true },
                fill: {
                  type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
                },
                alignment: { horizontal: 'left' },
            };
            for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
                worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
                worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
                Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
                Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
            }
            worksheet.getRow(1).height = 20;
            worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
            worksheet.getRow(1).getCell(4).numFmt = 'd mmmm yyyy';
            worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
            worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
            worksheet.getColumn(4).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
            worksheet.addRow({});
            return worksheet
        },
        customizeFooter:(worksheet)=>{
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
        {name: 'sumPrice',          title:'Цена всего',         editingEnabled:false,   width:100, totalCount:{type:['sum'], expantionAlign: 'left'}, isCurrency:true},
    ]) 

    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        filter: true,
        exportExel:true, 
        exportExelFileName:"SelledProductsReport",
        exportCustomization: customizationSettings
    }

    const [tableList, setTableList] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState()

    return (
        <>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">Проданные товары за промежуток времени</div>
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