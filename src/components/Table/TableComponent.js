import React, { useState, useRef, useCallback  } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectionState } from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
  EditingState,
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
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import saveAs from 'file-saver';


/* example
const [dropdownList, setDropdownList] = React.useState([
    {menuItem:""},
    {menuItem:"Не инвентаризирован"},
    {menuItem:"Проинвентаризирован"},
    {menuItem:"Потерян"},
    {menuItem:"Найден"},
    {menuItem:"Пусто"},
])

const [tableHeaders, setTableHeaders] = React.useState([
    {name: 'number',            title:'№',                  editingEnabled:false,   width:40, totalCount:{type:['count', 'sum', 'max', 'min', 'avg'], expantionAlign: 'right', isCurrency:false}  }, 
    {name: 'surname',           title:'Фамилия',            editingEnabled:true,    width:160                                                                               }, 
    {name: 'name',              title:'Имя',                editingEnabled:true,    width:160                                                                               }, 
    {name: 'patronymic',        title:'Отчество',           editingEnabled:true,    width:170                                                                               }, 
    {name: 'phone',             title:'Номер телефона',     editingEnabled:true,    width:200,  mask:/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/i, maskExample:"+7 (930) 442-5665"    }, 
    {name: 'email',             title:'Почта',              editingEnabled:true,    width:200                                                                               }, 
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
  validation:true,
  cell:true, 
  exportExel:true, 
  exportExelFileName:"Accounts"
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

 //---------------------------эксперименты-------------------------

  const [tableColumnExtensions] = useState([]);
  const [totalSummaryItems] = useState([]);
  const [currencyColumns] = useState([]);



//---------------------------эксперименты-------------------------

  var onSaveCheck = 0
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
          totalSummaryItems.push({ columnName: item.name, type: item1 },)
        });
        if(item.totalCount.isCurrency)
          currencyColumns.push(item.name)
      }
    })
  }

  console.log('tableColumnExtensions')
  console.log(tableColumnExtensions)
  console.log('totalSummaryItems')
  console.log(totalSummaryItems)
  console.log('currencyColumns')
  console.log(currencyColumns)
//---------------------------экспорт таблицы-------------------------------
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const onSave = (workbook) => {
    if (onSaveCheck++==0){
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${settings.exportExelFileName}.xlsx`);
      });
    } else {onSaveCheck=0}
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
    }
    
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      rows.map(row =>{
        if (changed[row.id] != undefined){
          columns.map(item=>{
            var keys = Object.keys(changed[row.id])
            keys.map(key=>{
              if (item.name == key && item.mask!=undefined && changed[row.id][key].match(item.mask)==null){
                alert(`Значение в поле ${item.title} в строке №${row.id+1} должно ${item.maskExample}`)
                changedRows[row.id][key] = rows[row.id][key]
              }
            });
          });
        }
      });
      
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
    }

    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
      if (columns[0].name=='number') changedRows.map(function(item,i){changedRows[i].number=i+1})
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
//---------------------------return-------------------------------
//---------------------------эксперименты-------------------------

// const customizeSummaryCell = (cell) => {
//   cell.font = { italic: true };
// };

// const customizeHeader = (worksheet) => {
//   const generalStyles = {
//     font: { bold: true },
//     fill: {
//       type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
//     },
//     alignment: { horizontal: 'left' },
//   };
//   for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
//     worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
//     worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
//     Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
//     Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
//   }
//   worksheet.getRow(1).height = 20;
//   worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
//   worksheet.getRow(1).getCell(4).numFmt = 'd mmmm yyyy';
//   worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
//   worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
//   worksheet.getColumn(4).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
//   worksheet.addRow({});
// };

// const customizeFooter = (worksheet) => {
//   const { lastRow } = worksheet;
//   let currentRowIndex = lastRow.number + 2;
//   for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
//     worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 6);
//     Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
//   }
//   worksheet.getRow(currentRowIndex).getCell(1).value = 'If you have any questions, please contact John Smith.';
//   currentRowIndex += 1;
//   worksheet.getRow(currentRowIndex).getCell(1).value = 'Phone: +111-111';
//   currentRowIndex += 1;
//   worksheet.getRow(currentRowIndex).getCell(1).value = 'For demonstration purposes only';
//   worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
// };
// /* eslint-enable no-param-reassign */

// const onSave = (workbook) => {
//   workbook.xlsx.writeBuffer().then((buffer) => {
//     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//   });
// };
const CurrencyFormatter = ({ value }) => (
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);



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


            <CurrencyTypeProvider
              for={currencyColumns}
            />
            <SummaryState
              totalItems={totalSummaryItems}
            />
            <IntegratedSummary />
            <Table
              columnExtensions={tableColumnExtensions}
            />

            {/* <Table/> */}
            <VirtualTable 
              height={props.height}
              width={props.width}
            />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow />
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
            onSave={onSave}
          />
      </Paper>
    );
};
