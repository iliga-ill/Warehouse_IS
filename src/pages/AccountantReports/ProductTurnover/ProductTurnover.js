import React, { Component, Fragment } from "react";
import './ProductTurnover.css';
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

  

export default function ProductTurnover(props){
    let newDate = new Date()

    var id=0
    function getId(){return id++}
    
    let [dateFrom, setDateFrom] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()   <10?`0${newDate.getMonth()   }`:newDate.getMonth()   }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    React.useEffect(() => {
        console.log(`dateFrom: ${dateFrom}`)
    }, [dateFrom]);

    let [dateTo, setDateTo] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1 <10?`0${newDate.getMonth()+1 }`:newDate.getMonth()+1 }-${newDate.getDate()+1<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    React.useEffect(() => {
        console.log(`dateTo: ${dateTo}`)
    }, [dateTo]);

    let [expandList1, setExpandList1]  = React.useState([
        {value: "Встраиваемая техника"     },
        {value: "Стиральные машины"        },
        {value: "Сушильные машины"         },
        {value: "Холодильники"             },
        {value: "Морозильные камеры"       },
        {value: "Винные шкафы"             },
        {value: "Вытяжки"                  },
        {value: "Плиты"                    },
        {value: "Посудомоечные машины"     },
        {value: "Мелкая бытовая техника"   },
        {value: "Микроволновые печи"       },
        {value: "Электродуховки"           },
        {value: "Пылесосы"                 },
        {value: "Водонагреватели"          },
        {value: "Кулеры и пурифайеры"      },
        {value: "Швейные машины, оверлоки" }
    ])
    let [expandListValue1, setExpandListValue1]  = React.useState(expandList1[0].value)
    React.useEffect(() => {
        console.log(`expandListValue1: ${expandListValue1}`)
    }, [expandListValue1]);

    let [expandList2, setExpandList2]  = React.useState([
        {value: "Варочные поверхности"              },
        {value: "Духовые шкафы"                     },
        {value: "Вытяжки"                           },
        {value: "Встраиваемые посудомоечные машины" },
        {value: "Встраиваемые холодильники"         },
        {value: "Встраиваемые морозильные камеры"   },
        {value: "Встраиваемые микроволновые печи"   },
        {value: "Кухонные мойки"                    },
        {value: "Измельчители отходов"              },
        {value: "Кухня"                             },
        {value: "Бытовые приборы для дома"          },
        {value: "Красота и гигиена"                 },
        {value: "Косметические приборы"             },
        {value: "Медицина и реабилитация"           },
    ])
    let [expandListValue2, setExpandListValue2]  = React.useState(expandList2[0].value)
    React.useEffect(() => {
        console.log(`expandListValue2: ${expandListValue2}`)
    }, [expandListValue2]);
    
    let [expandList3, setExpandList3]  = React.useState([
        {value: "Варочная поверхность Bosch PKE 645 B17E"},
        {value: "Варочная поверхность Bosch PKE 645 B18E"},
        {value: "Варочная поверхность Bosch PKE 645 B19E"},
        {value: "Варочная поверхность Bosch PKE 645 B20E"},
        {value: "Варочная поверхность Bosch PKE 645 B21E"},
        {value: "Варочная поверхность Bosch PKE 645 B22E"},
        {value: "Варочная поверхность Bosch PKE 645 B23E"},
    ])
    let [expandListValue3, setExpandListValue3]  = React.useState(expandList3[0].value)
    React.useEffect(() => {
        console.log(`expandListValue3: ${expandListValue3}`)
    }, [expandListValue3]);
    
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
        {name: 'orderType',         title:'Тип заказа',         editingEnabled:false,   width:100   }, 
        {name: 'orderNumber',       title:'Номер заказа',       editingEnabled:false,   width:120   }, 
        {name: 'shipmentNumber',    title:'Номер доставки',     editingEnabled:false,   width:130   }, 
        {name: 'orderedNumber',     title:'Кол-во заказанного', editingEnabled:false,   width:150   }, 
        {name: 'receivingDate',     title:'Дата приема',        editingEnabled:false,   width:110   }, 
        {name: 'receivedAmount',    title:'Кол-во принятого',   editingEnabled:false,   width:135   },
        {name: 'priceOfOneProduct', title:'Цена ед товара',     editingEnabled:false,   width:120, isCurrency:true  },
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
                    <div class="header_text">Оборот товара за промежуток времени</div>
                    <div style={{width:'170px'}}>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;от&nbsp;</div><InputDate defValue={dateFrom}   func={setDateFrom}/></div>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;до&nbsp;</div><InputDate defValue={dateTo}     func={setDateTo}/></div>
                    </div>
                    <div style={{width:'400px'}}>
                        <div class="low_text row_with_item_equal"><div>Категория&nbsp;</div><ExpandListInputRegular width={300} list={expandList1} func={setExpandListValue1}/></div>
                        <div class="low_text row_with_item_equal"><div>Подкатегория&nbsp;</div><ExpandListInputRegular width={300} list={expandList2} func={setExpandListValue2}/></div>
                        <div class="low_text row_with_item_equal"><div>Товар&nbsp;</div><ExpandListInputRegular width={300} list={expandList3} func={setExpandListValue3}/></div>
                    </div>
                    <div style={{width:"min-content", display:'inline-table'}} >
                        <TableComponent height={600} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}