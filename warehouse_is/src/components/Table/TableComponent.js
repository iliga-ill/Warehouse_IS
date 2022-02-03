import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectionState } from '@devexpress/dx-react-grid';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Table,
  Grid,
  TableHeaderRow,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  TableColumnResizing,
  TableSelection,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';

// import {
//   generateRows,
//   defaultColumnValues,
// } from '../../../demo-data/generator';

const getRowId = row => row.id

export function TableComponent(props) {
//---------------------------настройка параметров-------------------------------
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState();
  const [editingStateColumnExtensions, setEditingStateColumnExtensions] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);
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
    })
  }
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
      //props.setNewTableList(changedRows)
    }
    if (changed) {
      // console.log('changed')
      // rows.map( row => (console.log(changed[row.id] ? { ...row, ...changed[row.id] } : row)))
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
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
      //props.setNewTableList(changedRows)
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
      if (columns[0].name=='number') changedRows.map(function(item,i){changedRows[i].number=i+1})
      //props.setNewTableList(changedRows)
    }
    setRows(changedRows);
    props.setNewTableList(changedRows)
  };
  var EditColumnWidth = 220
  if (!props.editColumn.add && !props.editColumn.edit && !props.editColumn.delete)
  EditColumnWidth=20

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
//---------------------------return-------------------------------
//---------------------------эксперименты-------------------------

const [selection, setSelection] = useState([]);

function onSelected(value) {
  if (props.editColumn.select != undefined && props.editColumn.select) {
    setSelection([value[value.length-1]])
    props.onSelect(value[value.length-1])
  }
}

var height = 400
if (props.height != undefined)
    height = props.height

const [filters, setFilters] = useState([]);
if (columns.length!=1 && filters.toString()=="" && props.editColumn.filter != undefined && props.editColumn.filter) {
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
            {props.columns.map(function(item,i){
              if (i==0 && props.editColumn.filter != undefined && props.editColumn.filter) {
                return <FilteringState
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
              }
            })}
            {props.columns.map(function(item,i){
              if (i==0 && props.editColumn.filter != undefined && props.editColumn.filter) {
                return <IntegratedFiltering />
              }
            })}
            <EditingState
              onCommitChanges={commitChanges}
              //defaultEditingRowIds={[0]}
              columnExtensions={editingStateColumnExtensions}
            />
            <SelectionState
              selection={selection}
              onSelectionChange={onSelected}
            />
            <Table />
            <VirtualTable 
              height={props.height}
            />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow />
            {props.columns.map(function(item,i){
              if (i==0 && props.editColumn.filter != undefined && props.editColumn.filter) {
                return <TableFilterRow/>
              }
            })}
            
            <TableSelection
              selectByRowClick
              highlightRow
              showSelectionColumn={false}
            />
            <TableEditRow />
            <TableEditColumn
              showAddCommand={props.editColumn.add}
              showEditCommand={props.editColumn.edit}
              showDeleteCommand={props.editColumn.delete}
              messages={{editCommand: 'Правка', addCommand: 'Новая запись', commitCommand: 'Сохранить', cancelCommand: 'Отменить', deleteCommand: 'Удалить'}}
              width={EditColumnWidth}
            />
          </Grid>
        </div>
      </Paper>
    );
};
