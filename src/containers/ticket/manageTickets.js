//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';

//Components
import TablePaginationActions from '../../components/tableGrid';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getTicketTypes } from '../../actions/ticketAction';

class ManageTickets extends Component {

    state = {
        ticketTypeList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        disableReset: true,
    };

    componentWillMount()
    {
        this.getTicketTypeList();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.ticketTypePayload){
            if(nextProps.ticketTypePayload.status === 200){
                this.setState({ticketTypeList: nextProps.ticketTypePayload.responseData})
            }
          }
          
          if(nextProps.merchantDelete){
            if(nextProps.merchantDelete.status === 200){
                this.setState({showLoader:false})
                this.setState({ dialogOpen: true });
                this.getAllMerchants();
            }
          }
        }
    }

    //Method to handle change event for dropdown
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        if(this.state.name!=="" && this.state.status!=="" && this.state.location!==""){
            this.setState({disableReset: true});
        }
        else{
            this.setState({disableReset:false});
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    getTicketTypeList(){
        if(this.props.userData.user.responseData.token){
            this.props.getTicketTypes(this.props.userData.user.responseData.token)
        }
        else{
            //#TODO : Handle token expire case
        }
    }

    onHandleSearch(){
        this.getAllMerchants();
    }

    deleteMerchant = (merchantId) => {
        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.deleteMerchant(merchantId, this.props.userData.user.responseData.token);
        }
        else{
            //#TODO: Handle token expire case here
        }
    }

    updateMerchant = (merchantId) => {
        this.props.history.push({pathname:'/updateMerchant',state: { detail: merchantId }})
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    addNewTicket(){
        this.props.history.push('/addNewTicket')
    }

    render() {

        const { ticketTypeList, rowsPerPage, page, dialogOpen } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, ticketTypeList.length - page * rowsPerPage);
        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        return (
          <div className="row">
            <div className="col-xs-12">
            <Loader status={this.state.showLoader} />

            <div>
                <DialogBox 
                    displayDialogBox={dialogOpen} 
                    message="Ticket deleted successfully" 
                    actions={actions} 
                />
            </div> 

            <div className="row">
            <div className="col-xs-12">
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="row appTitleLabel">
                        MANAGE TICKET TYPE
                    </div>
                    <div className="row middle-md">
                        <div className="col-xs-12 col-sm-6 col-md-9">
                            Number of Types : {ticketTypeList !== undefined ? ticketTypeList.length : "0"}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 end-md">
                            <Button 
                            variant="fab"
                            type="button"
                            color="primary"
                            onClick={this.addNewTicket.bind(this)}
                            style={{backgroundColor:'#27A24F'}}
                            > <AddIcon /></Button> 
                        </div>
                    </div>
                </form>
            </Paper> 
            </div>
            </div>
            <div className="row">
            <div className="col-xs-12">
                    <Paper className="pagePaper">
                    <div className="tableWrapperMaterial">
                    <Table className="tableMaterial">
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>#</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            (ticketTypeList !== "") ? (
                            (ticketTypeList.length === 0) ? 
                                (<TableRow>
                                    <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                </TableRow>)
                                : (
                                ticketTypeList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((object, index) => {
                                    return (
                                    <TableRow className="tableRow" key={object.id}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.ticketTypeName}</TableCell>
                                        <TableCell>
                                            <div className={object.inactive_v === 1 ? "titleRed" : "titleGreen"}><FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status}</FormLabel></div>
                                        </TableCell>
                                        <TableCell> 
                                            <div className="row start-md middle-md">
                                                <div className="col-md-6">
                                                    <button type="button" disabled={object.inactive_v === 1 ? true : false} onClick={() => this.updateMerchant(object.id)} className={object.inactive_v === 1 ? "disabledButton" : "enabledButton"}> 
                                                        <img src="../images/ic_edit.svg" alt="" /> 
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                    <button type="button" disabled={object.inactive_v === 1 ? true : false} onClick={() => this.deleteMerchant(object.id)} className={object.inactive_v === 1 ? "disabledButton" : "enabledButton"}> 
                                                        <img src="../images/ic_delete.svg" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </TableCell>    
                                    </TableRow>
                                    );
                                })
                                )
                                ):(null)
                            }
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
                                count={ticketTypeList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </div>
                </Paper>
              </div>
            </div>   
        </div> 
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getTicketTypes }, dispatch)
  }
  
  ManageTickets = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      ticketTypePayload: state.ticket.ticketTypeList === undefined ? undefined : state.ticket.ticketTypeList,
    }),
    mapDispatchToProps,
  )(ManageTickets)
  
  export default reduxForm({form: 'FrmManageTickets'})(ManageTickets)