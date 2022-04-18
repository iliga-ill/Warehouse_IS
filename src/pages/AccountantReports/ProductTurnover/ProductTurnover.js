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
    let accountData = props.cookies.accountData
    let newDate = new Date()
    let title = "Оборот товара за промежуток времени"

    var id=0
    function getId(){return id++}
    
    let [dateFrom, setDateFrom] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()   <10?`0${newDate.getMonth()   }`:newDate.getMonth()   }-${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`)
    React.useEffect(() => {
        console.log(`dateFrom: ${dateFrom}`)
    }, [dateFrom]);

    let [dateTo, setDateTo] = React.useState(`${newDate.getFullYear()}-${newDate.getMonth()+1 <10?`0${newDate.getMonth()+1 }`:newDate.getMonth()+1 }-${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`)
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
        customizeCell:(exportVariables, cell, row, column)=>{
            return cell
        },
        customizeSummaryCell: (exportVariables, cell, isExportSeletedRows, selection, rows)=>{
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

            //row 6 cell 1
            worksheet.getRow(6).getCell(1).value = 'Категория:'
            Object.assign(worksheet.getRow(6).getCell(1), generalStyles);
            worksheet.getRow(6).getCell(1).font = generalFont
            //row 6 cell 2
            worksheet.getRow(6).getCell(2).value = exportVariables.goodsCategories2

            //row 7 cell 1
            worksheet.getRow(7).getCell(1).value = 'Подкатегория:'
            Object.assign(worksheet.getRow(7).getCell(1), generalStyles);
            worksheet.getRow(7).getCell(1).font = generalFont
            //row 7 cell 2
            worksheet.getRow(7).getCell(2).value = exportVariables.goodsCategories3

            //row 8 cell 1
            worksheet.getRow(8).getCell(1).value = 'Товар:'
            Object.assign(worksheet.getRow(8).getCell(1), generalStyles);
            worksheet.getRow(8).getCell(1).font = generalFont
            //row 8 cell 2
            worksheet.getRow(8).getCell(2).value = exportVariables.goodsType

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
            let remnantsInWarehouse = 0
            let sumExpenditure = 0
            let sumRevenue = 0
            rows.map(row=>{
                var isSelected = false
                selection.map(selectedId=>{
                    if (row.id == selectedId) isSelected=true
                })
                if (!isExportSeletedRows || isSelected){
                    if (row.orderType == "Покупка") {
                        sumProfit-=row.sumPrice
                        remnantsInWarehouse+=row.receivedAmount
                        sumRevenue+=row.sumPrice
                    }
                    if (row.orderType == "Продажа") {
                        sumProfit+=row.sumPrice
                        remnantsInWarehouse-=row.receivedAmount
                        sumExpenditure+=row.sumPrice
                    }
                    sumProfit-=row.shipmentCost
                }
            })

            //Ожидаемый остаток на складе
            worksheet.mergeCells(currentRowIndex, columnCount-2, currentRowIndex, columnCount-1);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).value = 'Ожидаемый остаток на складе:'
            Object.assign(worksheet.getRow(currentRowIndex).getCell(columnCount-2), generalStyles);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).font = generalFont

            worksheet.getRow(currentRowIndex).getCell(columnCount).value = remnantsInWarehouse
            
            currentRowIndex++
            
            //Суммарная выручка
            worksheet.mergeCells(currentRowIndex, columnCount-2, currentRowIndex, columnCount-1);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).value = 'Суммарная выручка:'
            Object.assign(worksheet.getRow(currentRowIndex).getCell(columnCount-2), generalStyles);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).font = generalFont

            worksheet.getRow(currentRowIndex).getCell(columnCount).value = sumRevenue
            worksheet.getRow(currentRowIndex).getCell(columnCount).numFmt = '0₽';

            currentRowIndex++

            //Суммарные траты
            worksheet.mergeCells(currentRowIndex, columnCount-2, currentRowIndex, columnCount-1);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).value = 'Суммарные траты:'
            Object.assign(worksheet.getRow(currentRowIndex).getCell(columnCount-2), generalStyles);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).font = generalFont

            worksheet.getRow(currentRowIndex).getCell(columnCount).value = sumExpenditure
            worksheet.getRow(currentRowIndex).getCell(columnCount).numFmt = '0₽';

            currentRowIndex++
            
            //Суммарная прибыль
            worksheet.mergeCells(currentRowIndex, columnCount-2, currentRowIndex, columnCount-1);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).value = 'Суммарная прибыль:'
            Object.assign(worksheet.getRow(currentRowIndex).getCell(columnCount-2), generalStyles);
            worksheet.getRow(currentRowIndex).getCell(columnCount-2).font = generalFont

            worksheet.getRow(currentRowIndex).getCell(columnCount).value = sumProfit
            worksheet.getRow(currentRowIndex).getCell(columnCount).numFmt = '0₽';
            
            return worksheet
        },
    }
    
    const [tableHeaders, setTableHeaders] = React.useState([
        {name: 'number',            title:'№',                  editingEnabled:false,   width:40    }, 
        {name: 'orderType',         title:'Тип заказа',         editingEnabled:false,   width:100   }, 
        {name: 'orderNumber',       title:'Номер заказа',       editingEnabled:false,   width:120   }, 
        {name: 'shipmentNumber',    title:'Номер доставки',     editingEnabled:false,   width:130   }, 
        {name: 'shipmentCost',      title:'Стоимость доставки', editingEnabled:false,   width:130, isCurrency:true}, 
        {name: 'orderedAmount',     title:'Кол-во заказанного', editingEnabled:false,   width:150   }, 
        {name: 'receivingDate',     title:'Дата приема',        editingEnabled:false,   width:110   }, 
        {name: 'receivedAmount',    title:'Кол-во принятого',   editingEnabled:false,   width:135   },
        {name: 'priceOfOneProduct', title:'Цена ед товара',     editingEnabled:false,   width:120, isCurrency:true},
        {name: 'sumPrice',          title:'Цена всего',         editingEnabled:false,   width:100, isCurrency:true},
    ]) 

    var tableSettings = {
        add:false, 
        edit:false, 
        delete:false, 
        filter: true,
        select:true, 
        massSelection:true,
        exportExel:true, 
        exportExelFileName:"ProductTurnoverReport",
        exportCustomization: customizationSettings,
        exportVariables:{
            title:title, 
            currentDate:`${newDate.getFullYear()}.${newDate.getMonth()+1<10?`0${newDate.getMonth()+1}`:newDate.getMonth()}.${newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()}`, 
            accountData:accountData, 
            dateFrom:dateFrom.replace("-", ".").replace("-", "."), 
            dateTo:dateTo.replace("-", ".").replace("-", "."),
            goodsCategories2:expandListValue1,
            goodsCategories3:expandListValue2,
            goodsType:expandListValue3,
        }
    }

    const [tableList, setTableList] = React.useState([
        {id:0, number:"1",orderType:"Покупка",orderNumber:"Заказ №0000001",shipmentNumber:"Доставка №11111", shipmentCost:30,orderedAmount:25,receivingDate:"18.04.2022",receivedAmount:20, priceOfOneProduct:15.4, sumPrice:20*15.4},
        {id:1, number:"2",orderType:"Покупка",orderNumber:"Заказ №0000001",shipmentNumber:"Доставка №11112", shipmentCost:30,orderedAmount:15,receivingDate:"20.04.2022",receivedAmount:15, priceOfOneProduct:15.4, sumPrice:15*15.4},
        {id:2, number:"3",orderType:"Продажа",orderNumber:"Заказ №0000002",shipmentNumber:"Доставка №11121", shipmentCost:30,orderedAmount:25,receivingDate:"12.04.2022",receivedAmount:20, priceOfOneProduct:20.5, sumPrice:20*20.5},
        {id:3, number:"4",orderType:"Продажа",orderNumber:"Заказ №0000002",shipmentNumber:"Доставка №11122", shipmentCost:30,orderedAmount:10,receivingDate:"04.04.2022",receivedAmount:10, priceOfOneProduct:20.5, sumPrice:10*20.5},
    ])
    const [selectedItemId, setSelectedItemId] = React.useState()
    

    const [sumProfit, setSumProfit] = React.useState(0)
    const [remnantsInWarehouse, setRemnantsInWarehouse] = React.useState(0)
    const [sumExpenditure, setSumExpenditure] = React.useState(0)
    const [sumRevenue, setSumRevenue] = React.useState(0)

    React.useEffect(() => {
        recountTotalCountFields()
    });
    function recountTotalCountFields(){
        let sumProfitBuf = 0
        let remnantsInWarehouseBuf = 0
        let sumExpenditureBuf = 0
        let sumRevenueBuf = 0
        tableList.map(row=>{
            var isSelected = false
            if (selectedItemId!=undefined && selectedItemId!=""){
                selectedItemId.map(selectedId=>{
                    if (row.id == selectedId) isSelected=true
                })
            } else {isSelected=true}
            if (isSelected){
                if (row.orderType == "Покупка") {
                    sumProfitBuf-=row.sumPrice
                    remnantsInWarehouseBuf+=row.receivedAmount
                    sumRevenueBuf+=row.sumPrice
                }
                if (row.orderType == "Продажа") {
                    sumProfitBuf+=row.sumPrice
                    remnantsInWarehouseBuf-=row.receivedAmount
                    sumExpenditureBuf+=row.sumPrice
                }
                sumProfitBuf-=row.shipmentCost
            }
        })
        setSumProfit(sumProfitBuf)
        setRemnantsInWarehouse(remnantsInWarehouseBuf)
        setSumExpenditure(sumExpenditureBuf)
        setSumRevenue(sumRevenueBuf)
    }

    return (
        <>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <div class="header_text">{title}</div>
                    <div style={{width:'170px'}}>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;от&nbsp;</div><InputDate defValue={dateFrom}   func={setDateFrom}/></div>
                        <div class="low_text row_with_item_equal"><div>Дата&nbsp;до&nbsp;</div><InputDate defValue={dateTo}     func={setDateTo}/></div>
                    </div>
                    <div style={{width:'400px'}}>
                        <div class="low_text row_with_item_equal"><div>Категория&nbsp;</div><ExpandListInputRegular width={300} list={expandList1} func={setExpandListValue1}/></div>
                        <div class="low_text row_with_item_equal"><div>Подкатегория&nbsp;</div><ExpandListInputRegular width={300} list={expandList2} func={setExpandListValue2}/></div>
                        <div class="low_text row_with_item_equal"><div>Товар&nbsp;</div><ExpandListInputRegular width={300} list={expandList3} func={setExpandListValue3}/></div>
                    </div>
                    <div style={{width:'260px'}}>
                        <div class="low_text">Ожидаемый&nbsp;остаток&nbsp;на&nbsp;складе:&nbsp;<label class="normal">{sumProfit}₽</label></div>
                        <div class="low_text">Суммарная&nbsp;выручка:&nbsp;<label class="normal">{remnantsInWarehouse}</label></div>
                        <div class="low_text">Суммарные&nbsp;траты:&nbsp;<label class="normal">{sumExpenditure}₽</label></div>
                        <div class="low_text">Суммарная&nbsp;прибыль:&nbsp;<label class="normal">{sumRevenue}₽</label></div>
                    </div>
                    <div style={{width:"min-content", display:'inline-table'}} >
                        <TableComponent height={500} columns={tableHeaders} rows={tableList} onSelect={setSelectedItemId} setNewTableList={setTableList} tableSettings={tableSettings}/>
                    </div>
                    
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
    )
}