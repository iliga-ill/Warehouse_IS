import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';

// import {
//   generateRows,
//   defaultColumnValues,
// } from '../../../demo-data/generator';

const getRowId = row => row.id

const RacksFormatter = ({ value }) => {
  var str = '';
  switch (value){
    case '1': {str = 'Стеллаж 1'; break;}
    case '2': {str = 'Стеллаж 2'; break;}
    case '3': {str = 'Стеллаж 3'; break;}
    case '4': {str = 'Стеллаж 4'; break;}
    case '5': {str = 'Стеллаж 5'; break;}
    case '6': {str = 'Стеллаж 6'; break;}
    case '7': {str = 'Стеллаж 7'; break;}
    case '8': {str = 'Стеллаж 8'; break;}
    case '9': {str = 'Стеллаж 9'; break;}
    case '10': {str = 'Стеллаж 10'; break;}
  }
  return <Chip label={str}/>
}

const RacksEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value ={ value}
    onChange={event => {onValueChange(event.target.value)}
    }
    style={{ width: '100%' }}
  >
    <MenuItem value="1">Стеллаж 1  </MenuItem>
    <MenuItem value="2">Стеллаж 2  </MenuItem>
    <MenuItem value="3">Стеллаж 3  </MenuItem>
    <MenuItem value="4">Стеллаж 4  </MenuItem>
    <MenuItem value="5">Стеллаж 5  </MenuItem>
    <MenuItem value="6">Стеллаж 6  </MenuItem>
    <MenuItem value="7">Стеллаж 7  </MenuItem>
    <MenuItem value="8">Стеллаж 8  </MenuItem>
    <MenuItem value="9">Стеллаж 9  </MenuItem>
    <MenuItem value="10">Стеллаж 10</MenuItem>
  </Select>
);

const RacksTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={RacksFormatter}
    editorComponent={RacksEditor}
    {...props}
  />
);

const ZoneFormatter = ({ value }) => {
  var str = '';
  switch (value){
    case '1': {str = 'Зона 1'; break;}
    case '2': {str = 'Зона 2'; break;}
  }
  return <Chip label={str}/>
}

const ZoneEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value ={ value}
    onChange={event => {onValueChange(event.target.value)}
    }
    style={{ width: '100%' }}
  >
    <MenuItem value="1">Зона 1  </MenuItem>
    <MenuItem value="2">Зона 2  </MenuItem>
  </Select>
);

const ZoneTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ZoneFormatter}
    editorComponent={ZoneEditor}
    {...props}
  />
);

const ShelfsFormatter = ({ value }) => {
  var str = '';
  switch (value){
    case '1': {str = 'Полка 1'; break;}
    case '2': {str = 'Полка 2'; break;}
    case '3': {str = 'Полка 3'; break;}
  }
  return <Chip label={str}/>
}

const ShelfsEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value ={ value}
    onChange={event => {onValueChange(event.target.value)}
    }
    style={{ width: '100%' }}
  >
    <MenuItem value="1">Полка 1  </MenuItem>
    <MenuItem value="2">Полка 2  </MenuItem>
    <MenuItem value="3">Полка 3  </MenuItem>
  </Select>
);

const ShelfsTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ShelfsFormatter}
    editorComponent={ShelfsEditor}
    {...props}
  />
);

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

  const [rackColumn] = useState(['racks']);
  const [shelfColumn] = useState(['shelfs']);
  const [zoneColumn] = useState(['zones']);
  if (props.isDropdownActive != undefined) {
    columns.push({ name: 'zones', title: 'Зоны'})
    columns.push({ name: 'racks', title: 'Стеллажи'})
    columns.push({ name: 'shelfs', title: 'Полки'})
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
//---------------------------return-------------------------------

if (props.isDropdownActive != undefined) {
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <RacksTypeProvider
            for={rackColumn}
          />
           <ShelfsTypeProvider
            for={shelfColumn}
          />
           <ZoneTypeProvider
            for={zoneColumn}
          />
          <EditingState
            onCommitChanges={commitChanges}
            //defaultEditingRowIds={[0]}
            columnExtensions={editingStateColumnExtensions}
          />
          <Table />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={props.editColumn.add}
            showEditCommand={props.editColumn.edit}
            showDeleteCommand={props.editColumn.delete}
            messages={{editCommand: 'Правка', addCommand: 'Новая запись', commitCommand: 'Сохранить', cancelCommand: 'Отменить', deleteCommand: 'Удалить'}}
            width={EditColumnWidth}
          />
        </Grid>
      </Paper>
    );
} else {
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <EditingState
            onCommitChanges={commitChanges}
            //defaultEditingRowIds={[0]}
            columnExtensions={editingStateColumnExtensions}
          />
          <Table />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={props.editColumn.add}
            showEditCommand={props.editColumn.edit}
            showDeleteCommand={props.editColumn.delete}
            messages={{editCommand: 'Правка', addCommand: 'Новая запись', commitCommand: 'Сохранить', cancelCommand: 'Отменить', deleteCommand: 'Удалить'}}
            width={EditColumnWidth}
          />
        </Grid>
      </Paper>
    );
  }
};
