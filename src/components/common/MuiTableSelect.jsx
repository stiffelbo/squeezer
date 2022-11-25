import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class MuiTableSelect extends Component {    

    state = { 
        order : 'asc',
        orderBy: '',
        selectedIds: [],
        page: 0,
        dense: true,
        rowsPerPage: 25,
    }  

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedIds !== this.state.selectedIds){
            this.render();
        }
    }

    handleRequestSort = (event, property) => {
        let {order, orderBy} = this.state;
        const isAsc = orderBy === property && order === 'asc';
        order = isAsc ? 'desc' : 'asc'
        orderBy = property;
        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event) => {
        const data = this.props.data;
        const {onSelect} = this.props;
        if (event.target.checked) {
          const selectedIds = data.map((n) => n.id);
          onSelect(selectedIds);
          this.setState({selectedIds});
          return;
        }
        const selectedIds = [];
        onSelect(selectedIds);
        this.setState({selectedIds});
    };

    handleSelect = (event, id) => {
        const {selectedIds} = this.state;
        const {onSelect} = this.props;
        if(selectedIds.indexOf(id) > -1){
            selectedIds.splice(selectedIds.indexOf(id), 1);
        }else{
            selectedIds.push(id);
        }
        onSelect(selectedIds);
        this.setState({selectedIds});
    };

    handleChangePage = (event, newPage) => {
        const page = newPage;
        this.setState({page});
    };

    handleChangeRowsPerPage = (event) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        const page = 0;
        this.setState({page, rowsPerPage});
    };

    handleChangeDense = (event) => {
        const dense = event.target.checked;
        this.setState({dense});
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    emptyRows = this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.data.length) : 0;

    render() { 
        const {selectedIds: selected, order, orderBy, dense, page, rowsPerPage} = this.state;
        const {headCells, data: rows} = this.props;
        return (
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = selected.indexOf(row.id) > -1;
                            const labelId = `enhanced-table-checkbox-${row.id}`;
                            return (
                                <TableRow
                                hover
                                onClick={(event) => this.handleSelect(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={`row_key_${row.id}`}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    key={`checkBox${row.id}`}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    key={row.id}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.id}
                                </TableCell>
                                {headCells && headCells.map((item, idx) => {
                                    if(idx > 0){
                                        return <TableCell align="left" key={row.id + row[item['id']]}>{row[item['id']]}</TableCell>
                                    }
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100, 150, 200]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={this.handleChangeDense} />}
                    label="zagęść"
                />
            </Box>
        );
    }
}
 
export default MuiTableSelect;