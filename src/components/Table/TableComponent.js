import React, { useState, useRef, useCallback  } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  SelectionState,
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
  EditingState,
  IntegratedSelection,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Table,
  Grid,
  TableHeaderRow,
  TableSummaryRow,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  TableColumnResizing,
  TableSelection,
  VirtualTable,
  TableInlineCellEditing,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import saveAs from 'file-saver';


/* example

    var customizationSettings={
      customizeCell:(exportVariables, cell, row, column)=>{
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
      customizeSummaryCell: (exportVariables, cell, isExportSeletedRows, selection, rows)=>{
          cell.font = { italic: true };
          return cell
      },
      customizeHeader: (exportVariables, worksheet)=>{
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
      customizeFooter:(exportVariables, worksheet, isExportSeletedRows, selection, rows)=>{
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

const [dropdownList, setDropdownList] = React.useState([
    {menuItem:""},
    {menuItem:"Не инвентаризирован"},
    {menuItem:"Проинвентаризирован"},
    {menuItem:"Потерян"},
    {menuItem:"Найден"},
    {menuItem:"Пусто"},
])

const [tableHeaders, setTableHeaders] = React.useState([
    {name: 'number',            title:'№',                  editingEnabled:false,   width:40, totalCount:{type:['count', 'sum', 'max', 'min', 'avg'], expantionAlign: 'right'}, isCurrency:true }, 
    {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:160                                                                               }, 
    {name: 'name',              title:'Имя',                editingEnabled:true,    width:160,  mask:/^(.)(.*)$/i,                       maskExample:"быть заполнено"       }, 
    {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:170                                                                               }, 
    {name: 'phone',             title:'Номер телефона',     editingEnabled:true,    width:200,  mask:/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/i, maskExample:"+7 (930) 442-5665"    }, 
    {name: 'email',             title:'Почта',              editingEnabled:true,    width:200,  mask:/^(.)(.*)(.@.*)\.(.)(.)$/i,         maskExample:"соотвестсвовать шаблону example@service.ru"   }, 
    {name: 'duty',              title:'Должность',          editingEnabled:false,   width:150                                                                               },
    {name: 'login',             title:'Логин',              editingEnabled:true,    width:130                                                                               },
    {name: 'password',          title:'Пароль',             editingEnabled:true,    width:130, dropdownList: dropdownList                                                   }
]) 

var tableSettings = {
  editColumnWidth: 220, 
  add:true, edit:true, 
  delete:true, 
  filter: true, 
  select:true,
  defaultSelection:true,
  massSelection:true,
  cell:true, 
  exportExel:true, 
  exportExelFileName:"Accounts",
  exportCustomization: customizationSettings,
  exportVariables:{currentDate:newDate.getDate(), accountData:accountData, dateFrom:dateFrom, dateTo:dateTo}
}
const [tableList, setTableList] = React.useState([])
const [selectedItem, setSelectedItem] = React.useState()


<div style={{width:800+'px', display:'inline-table'}} >
    <TableComponent  height={500} columns={tableHeaders} rows={tableList} setNewTableList={setTableList} tableSettings={tableSettings} onSelect={setSelectedItem}/>
</div>
*/

const getRowId = row => row.id

export function TableComponent(props) {
//---------------------------настройка параметров-------------------------------
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState();
  const [editingStateColumnExtensions, setEditingStateColumnExtensions] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);
  const [selection, setSelection] = useState([]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [tableColumnExtensions] = useState([]);
  const [totalSummaryItems] = useState([]);
  const [currencyColumns] = useState([]);

  var onSaveCheck = 0
  var onCustomizeHeaderCheck = 0
  var onCustomizeFooterCheck = 0

  var settings = props.tableSettings
  var EditColumnWidth = settings.editColumnWidth!=undefined?settings.editColumnWidth:220

  if (!settings.add && !settings.edit && !settings.delete)
    EditColumnWidth=20
  
  if (columns.length > 0 || JSON.stringify(rows)!=JSON.stringify(props.rows)) {
    
    if (JSON.stringify(columns) != JSON.stringify(props.columns)) {setColumns(props.columns)}
    props.rows.map(function(item,i){
      if (item.new != undefined && item.new){
        var buf = props.rows
        buf[i].new=false
        rows.push(buf[buf.length-1])
      }
    })

    if (JSON.stringify(rows) != JSON.stringify(props.rows)) {setRows(props.rows)}
    if (editingStateColumnExtensions.toString()=="" && columnWidths.toString()=="")
    props.columns.map(function(item, i){
      editingStateColumnExtensions[i] = {  columnName: item.name, editingEnabled: item.editingEnabled }
      columnWidths[i] = { columnName: item.name, width: item.width}
      if (item.totalCount!=undefined){
        tableColumnExtensions.push({ columnName: item.name, align: item.totalCount.expantionAlign })
        item.totalCount.type.map(item1=>{
          totalSummaryItems.push({ columnName: item.name, type: item1 })
        });
      }
      if(item.isCurrency) currencyColumns.push(item.name)
    })
    if (settings.defaultSelection && selection == '')
      selection.push(0)
  }
//---------------------------экспорт таблицы-------------------------------
  var counter = 0
  var numberCounter = 0

  const exporterRef = useRef(null);

  const startExport = useCallback((options) => {
    console.log(options)
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const onSave = (workbook) => {
    if (onSaveCheck++==0){
      console.log("exported")
      counter = 0
      numberCounter=0
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${settings.exportExelFileName!=undefined?settings.exportExelFileName:'DataGrid'}.xlsx`);
      });
    } else {
      onSaveCheck=0
      counter = 0
      numberCounter=0
    }
  };
  
  const customizeCell = (cell, row, column) => {

    if (settings.exportCustomization!=undefined) {
      counter++
      cell=settings.exportCustomization.customizeCell(settings.exportVariables, cell, row, column)
    }

    if (column.name == 'number')
      cell.value = ++numberCounter

    currencyColumns.map(item=>{
      if (column.name==item) cell.numFmt = '0₽';
    })
  }
  
  const customizeSummaryCell = (cell) => {
    if (settings.exportCustomization!=undefined)
      var isExportSeletedRows = counter != columns.length*rows.length
      cell=settings.exportCustomization.customizeSummaryCell(settings.exportVariables, cell, isExportSeletedRows, selection, rows)
      if (columns[cell._column._number-1].isCurrency) cell.numFmt = '0₽';
  };
  
  const customizeHeader = (worksheet) => {
    if (onCustomizeHeaderCheck++==0 && settings.exportCustomization!=undefined && onSaveCheck==0){

      worksheet = settings.exportCustomization.customizeHeader(settings.exportVariables, worksheet)
    } else {onCustomizeHeaderCheck=0}
  };
  
  const customizeFooter = (worksheet) => {
    if (onCustomizeFooterCheck++==0 && settings.exportCustomization!=undefined){
      var isExportSeletedRows = counter != columns.length*rows.length
      worksheet = settings.exportCustomization.customizeFooter(settings.exportVariables, worksheet, isExportSeletedRows, selection, rows)
    } else {onCustomizeFooterCheck=0}
  };
//---------------------------изменение таблицы-------------------------------
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    

    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];

      if (columns[0].name=='number') changedRows.map(function(item,i){changedRows[i].number=i+1})
      
      columns.map(item=>{
        if (item.name == "shipmentStatus")
          changedRows.map(function(item,i){
            if (item.shipmentStatus == "" || item.shipmentStatus == undefined)
              changedRows[i].shipmentStatus = "Пустой"
              changedRows[i].goodsInOrder = []
          })
      })

      if (columns[0].name=='number') 
      var counter=0
      columns.map(item=>{
        if (item.name == "amount" || item.name == "cost" || item.name == "sumCost" ) counter++
      })
      if (counter==3) {
        changedRows.map(function(item,i){
          if (!isNaN(parseInt(changedRows[i].amount)) && !isNaN(parseInt(changedRows[i].cost)))
            changedRows[i].sumCost=changedRows[i].amount * changedRows[i].cost
          else changedRows[i].sumCost=0
        })
      }
      
      // changedRows.map(function(item,i){
      //   console.log(`${item.id} == ${startingAddedId}`)
      //   if (item.id == startingAddedId){
      //     changedRows[i].editingStatus = "added";
      //     console.log("+")
      //   }
      // })
      // console.log("changedRows")
      // console.log(changedRows)
    }
    
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      rows.map(row =>{
        if (changed[row.id] != undefined){
          columns.map(item=>{
            var keys = Object.keys(changed[row.id])
            keys.map(key=>{
              console.log(changedRows)
              console.log(changedRows[row.id])
              if (item.name == key && item.isCurrency!=undefined && item.isCurrency){
                changedRows[row.id][key] = parseFloat(changedRows[row.id][key])
              }
              if (item.name == key && item.mask!=undefined && changed[row.id][key].match(item.mask)==null){
                alert(`Значение в поле ${item.title} в строке №${row.number} должно ${item.maskExample}`)
                changedRows[row.id][key] = rows[row.id][key]
              }
              
            });
          });
        }
      });
      rows.map(row =>{

      })
      
      
      let counter=0
      columns.map(item=>{
        if (item.name == "amount" || item.name == "cost" || item.name == "sumCost" ) counter++
      })
      if (counter==3) {
        changedRows.map(function(item,i){
          if (!isNaN(parseInt(changedRows[i].amount)) && !isNaN(parseInt(changedRows[i].cost)))
            changedRows[i].sumCost=changedRows[i].amount * changedRows[i].cost
          else changedRows[i].sumCost=0
        })
      }
      // changedRows.map(function(item,i){
      //   if (changedRows[i].editingStatus == undefined) 
      //     changedRows[i].editingStatus = "changed"
      // })
    }

    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
      if (columns[0].name=='number') changedRows.map(function(item,i){
        changedRows[i].number=i+1
        changedRows[i].id=i
      })
    }
    
    setRows(changedRows);
    props.setNewTableList(changedRows)
    
  };

  function getColumn(value){
    var column = {dropdownList:[]}
    if (value!=undefined){
      columns.map(item=>{
        if (item.dropdownList != undefined && item.dropdownList.length>0) {
          item.dropdownList.map(item2=>{
            if (item2.menuItem == value)
              column=item
          })
        }
      })
    }
    return column
  }
  
  const DropdownFormatter = ({ value }) => {
    var column = getColumn(value)
    var buf
    column.dropdownList.map(item=>{
      if (value == item.menuItem){
        buf = <Chip label={item.menuItem}/>
      }
    })
    return buf
  }
  
  const DropdownEditor = ({ value, onValueChange }) => (
    <Select
      input={<Input />}
      value ={value}
      onChange={event => {onValueChange(event.target.value)}}
      style={{ width: '100%' }}
    >
      {getColumn(value).dropdownList.map(item=>{
        return <MenuItem value={item.menuItem}>{item.menuItem}</MenuItem>
      })}
    </Select>
  );
  
  const DropdownProvider = props => (
    <DataTypeProvider
      formatterComponent={DropdownFormatter}
      editorComponent={DropdownEditor}
      {...props}
    />
  );

  function onSelected(value) {
    if (settings.massSelection==undefined || settings.massSelection==false){
      if (settings.select != undefined && settings.select) {
        setSelection([value[value.length-1]])
        var check = false
        rows.map(function(element, i){
          if (element.id == value[value.length-1]) {
              props.onSelect(element)
              check=true
          }   
        })
        if (!check) props.onSelect(undefined)
      }
    } else {
      setSelection(value)
      if (props.onSelect!=undefined)
        props.onSelect(value)
    }
  }
  
  var height = 400
  if (props.height != undefined)
      height = props.height
  
  const [filters, setFilters] = useState([]);
  if (columns.length!=1 && filters.toString()=="" && settings.filter != undefined && settings.filter) {
    var buf = []
    var check = false
    columns.map(item=>{
      if (item.dropdownList != undefined && item.dropdownList.length>0) {
        buf.push({ columnName: item.name, value: item.dropdownList[0].menuItem})
        check = true
      }
    })
    if (check)
    setFilters(buf)
  }

  const CurrencyFormatter = ({ value }) => (
    value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
  );
  
  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      {...props}
    />
  );
//------------------------------разобраться как работает-----------
const DateFormatter = ({ value }) => (
  <span>
    {value.toLocaleDateString()}
  </span>
);

const DateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

//---------------------------эксперименты-------------------------

//---------------------------эксперименты-------------------------

    return (
      <Paper>
        <div className="card">
          <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
          >
            {props.columns.map(item=>{
              if (item.dropdownList != undefined && item.dropdownList.length>0 && item.editingEnabled) {
                return <DropdownProvider
                  for={[item.name]}
                />
              }
            })}
            {settings.filter==true?<FilteringState filters={filters} onFiltersChange={setFilters}/>:<></>}
            {settings.filter==true?<IntegratedFiltering />:<></>}
            <EditingState
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={setEditingRowIds}
              rowChanges={rowChanges}
              onRowChangesChange={setRowChanges}
              onCommitChanges={commitChanges}
              columnExtensions={editingStateColumnExtensions}
            />
            <SelectionState
              selection={selection}
              onSelectionChange={onSelected}
            />
            <CurrencyTypeProvider for={currencyColumns}/>

            <SummaryState
              totalItems={totalSummaryItems}
            />
            <IntegratedSummary />
            <Table
              columnExtensions={tableColumnExtensions}
            />
            <VirtualTable 
              height={props.height}
              width={props.width}
            />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow />
            <IntegratedSelection />
            {settings.exportExel==true?<Toolbar/>:<></>}
            {settings.exportExel==true?<ExportPanel startExport={startExport}/>:<></>}
            {settings.filter==true?<TableFilterRow/>:<></>}
            
            <TableSelection
              selectByRowClick
              highlightRow
              showSelectionColumn={false}
            />
            <TableEditRow />
            <TableEditColumn
              showAddCommand={settings.add}
              showEditCommand={settings.edit}
              showDeleteCommand={settings.delete}
              messages={{editCommand: 'Правка', addCommand: 'Новая запись', commitCommand: 'Сохранить', cancelCommand: 'Отменить', deleteCommand: 'Удалить'}}
              width={EditColumnWidth}
            />
            {settings.cell==true?<TableInlineCellEditing/>:<></>}
            <TableSummaryRow />
          </Grid>
        </div>
        <GridExporter
            ref={exporterRef}
            rows={rows}
            columns={columns}
            totalSummaryItems={totalSummaryItems}
            customizeCell={customizeCell}
            customizeSummaryCell={customizeSummaryCell}
            customizeHeader={customizeHeader}
            customizeFooter={customizeFooter}
            selection={selection}
            onSave={onSave}
          />
      </Paper>
    );
};
