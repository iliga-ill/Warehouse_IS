import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
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

export function TableComponent(props) {
//---------------------------настройка параметров-------------------------------
  const [columns, setColumns] = useState([ { name: 'name', title: 'Name' }]);
  const [rows, setRows] = useState();
  const [editingStateColumnExtensions, setEditingStateColumnExtensions] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);
  if (columns.length > 0) {
    if (columns != props.columns) setColumns(props.columns)
    if (rows != props.rows) {setRows(props.rows)}
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
      props.setNewTableList(changedRows)
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      props.setNewTableList(changedRows)
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
      if (columns[0].name=='number') changedRows.map(function(item,i){changedRows[i].number=i+1})
      props.setNewTableList(changedRows)
    }
    setRows(changedRows);
    props.setNewTableList(changedRows)
  };
  var EditColumnWidth = 250
  if (!props.editColumn.add && !props.editColumn.edit && !props.editColumn.delete)
  EditColumnWidth=20
//---------------------------return-------------------------------
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
          messages={{editCommand: 'Правка', addCommand: 'Новая запись', commitCommand: 'Сохранить', cancelCommand: 'Отменить'}}
          width={EditColumnWidth}
        />
      </Grid>
    </Paper>
  );
};
