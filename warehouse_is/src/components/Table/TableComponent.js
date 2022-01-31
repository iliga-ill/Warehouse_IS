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
  TableEditRow,
  TableEditColumn,
  TableColumnResizing,
  TableSelection,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';

// import {
//   generateRows,
//   defaultColumnValues,
// } from '../../../demo-data/generator';

const getRowId = row => row.id

export function TableComponent(props) {
//---------------------------настройка параметров-------------------------------
  const [columns, setColumns] = useState([ { name: 'name', title: 'Name' }]);
  const [rows, setRows] = useState();
  const [editingStateColumnExtensions, setEditingStateColumnExtensions] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);
  if (columns.length > 0) {
    if (columns != props.columns) setColumns(props.columns)
    if (rows != props.rows) {setRows(props.rows)}
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
      //props.setNewTableList(changedRows)
    }
    if (changed) {
      // console.log('changed')
      // rows.map( row => (console.log(changed[row.id] ? { ...row, ...changed[row.id] } : row)))
 
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
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
    var column
    columns.map(item=>{
      if (item.dropdownList != undefined && item.dropdownList.length>0) {
        item.dropdownList.map(item2=>{
          if (item2.menuItem == value)
          column=item
        })
      }
    })
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
  console.log(value)
  //setSelection(value)
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
            <SelectionState
              selection={selection}
              onSelectionChange={onSelected}
            />
            {props.columns.map(item=>{
              if (item.dropdownList != undefined && item.dropdownList.length>0) {
                return <DropdownProvider
                  for={[item.name]}
                />
              }
            })}
            
            <EditingState
              onCommitChanges={commitChanges}
              //defaultEditingRowIds={[0]}
              columnExtensions={editingStateColumnExtensions}
            />
            <Table />
            <VirtualTable />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow />
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
