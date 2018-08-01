import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TableGrid extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TableGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TableGrid,
);

let counter = 0;
function createData(srno, logo, name, location, email, phonenumber, status, action) {
  counter += 1;
  return { id: counter, srno, logo, name, location, email, phonenumber, status, action};
}

const styles = theme => ({
  root: {
    width: '98%',
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 1,
  },
  table: {
    minWidth: 320,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2f4f6',
    },
  },
});

class CustomPaginationActionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        createData(1,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(2,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(3,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(4,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(5,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(6,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(7,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(8,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(9,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(10,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(11,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(12,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(13,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
        createData(14,'logo','David Wilson','Los Angeles','david_wil278@gmail.com', '1 (877) 609-2233','Active','Edit'),
      ].sort((a, b) => (a.id < b.id ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow hover>
                    <TableCell numeric>#</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Phone Number</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow className={classes.row} key={n.id} hover={true}>
                    <TableCell numeric>{n.srno}</TableCell>
                    <TableCell>{n.logo}</TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.location}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.phonenumber}</TableCell>

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);