//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NumberFormat from "react-number-format";

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

//Components
import TablePaginationActions from '../../components/tableGrid';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getMerchantListWithFilter, deleteMerchant } from '../../actions/merchantAction';

class PaymentProcessing extends Component {

    state = {
        name:'',
        status: '',
        location:'',
        merchantList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        permissionDisplayBox: false,
        disableReset: true,
        merchantId:'',
    };

    componentWillMount()
    {
        this.getAllMerchants();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.merchantPayload){
            if(nextProps.merchantPayload.status === 200){
                this.setState({merchantList: nextProps.merchantPayload.responseData})
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

    getAllMerchants(){
        if(this.props.userData.user.responseData.token){
            this.props.getMerchantListWithFilter(this.state.name, this.state.status, this.state.location, this.props.userData.user.responseData.token)
        }
        else{
            //#TODO : Handle token expire case
        }
    }

    onHandleSearch(){
        this.getAllMerchants();
    }


    deleteMerchant = (merchantId) => {
        if (this.state.permissionDisplayBox) {
            this.handleClose();
            if(this.props.userData.user.responseData.token){
                this.setState({showLoader:true})
                this.props.deleteMerchant(this.state.merchantId, this.props.userData.user.responseData.token);
            }
            else{
                //#TODO: Handle token expire case here
            }
        }
        else{
            this.setState({ permissionDisplayBox: true, merchantId: merchantId });
        }
        
    }

    updateMerchant = (merchantId) => {
        this.props.history.push({pathname:'/updateMerchant',state: { detail: merchantId }})
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.setState({ permissionDisplayBox: false });
    };

    addNewMerchant(){
        this.props.history.push('/addNewMerchant')
    }

    onHandleReset(){
        this.setState({name:''});
        this.setState({status:''});
        this.setState({location:''});
        this.setState({disableReset:true});
        this.props.reset();

        if(this.props.userData.user.responseData.token){
            this.props.getMerchantListWithFilter("", "", "", this.props.userData.user.responseData.token)
        }
    
    }

    render() {

        const { merchantList, rowsPerPage, page, dialogOpen, permissionDisplayBox } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, merchantList.length - page * rowsPerPage);

        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        const permissionActions = [
            <Button key="no" onClick={this.handleClose} color="primary">
                No
            </Button>,
            <Button key="yes" onClick={this.deleteMerchant} color="primary" autoFocus>
                Yes
            </Button>,
        ];

        return (
          <div className="row">
            <div className="col-xs-12">
            <Loader status={this.state.showLoader} />

            <div>
                <DialogBox 
                    displayDialogBox={dialogOpen} 
                    message="Merchant deleted successfully" 
                    actions={actions} 
                />
                <DialogBox 
                    displayDialogBox={permissionDisplayBox} 
                    message="Are you sure to delete merchant?" 
                    actions={permissionActions} 
                />
            </div> 

            <div className="row">
                <div className="col-xs-12">
                    <Paper className="pagePaper">
                        <div className="row middle-md">
                            <div className="col-md-12">
                                <div className="appTitleLabel">
                                    Payment Processing Application
                                </div>
                            </div>
                        </div>        
                        <div className="row middle-md">
                            <div className="col-md-12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>    
                        </div>
                        <div className="row center-md">
                            <div className="col-md-12">
                                <button 
                                    type="submit"
                                    className="button"
                                    onClick={this.addNewMerchant.bind(this)}
                                    > REGISTER
                                </button> 
                            </div>
                        </div>
                    </Paper> 
                </div>
            </div>        

            <div className="row">
                <div className="col-xs-12">
                    <Paper className="pagePaper">
                        <div className="row middle-md">
                            <div className="col-md-12">
                                <div style={{color:"red"}}>
                                    Disclaimer
                                </div>
                            </div>    
                        </div>        
                        <div className="row middle-md">
                            <div className="col-md-12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>    
                        </div>
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
                                <TableCell>Merchant Id</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Entity Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            (merchantList !== "") ? (
                            (merchantList.length === 0) ? 
                                (<TableRow>
                                    <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                </TableRow>)
                                : (
                                merchantList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((object, index) => {
                                    return (
                                    <TableRow className="tableRow" key={object.id}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.first_v + " " + object.last_v}</TableCell>
                                        <TableCell>{object.city_v}</TableCell>
                                        <TableCell>{object.email_v}</TableCell>
                                        <TableCell><NumberFormat value={object.phone_v} displayType={'text'} format="+1 (###) ###-####" /></TableCell>
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
                                count={merchantList.length}
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
    return bindActionCreators({ getMerchantListWithFilter, deleteMerchant }, dispatch)
  }
  
  PaymentProcessing = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      merchantPayload: state.merchant.merchantList === undefined ? undefined : state.merchant.merchantList,
      merchantDelete: state.merchant.deleteMerchant === undefined ? undefined : state.merchant.deleteMerchant
    }),
    mapDispatchToProps,
  )(PaymentProcessing)
  
  export default reduxForm({form: 'FrmPaymentProcessing'})(PaymentProcessing)