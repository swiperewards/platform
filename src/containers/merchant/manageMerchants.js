//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NumberFormat from "react-number-format";

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

//Components
import InputField from '../../components/inputField';
import TablePaginationActions from '../../components/tableGrid';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'

//Actions
import { getMerchantListWithFilter, deleteMerchant, getMerchantDetailsAPI } from '../../actions/merchantAction';

//Data
import Data from '../../staticData';

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
      root: {
        width: '100%',
        marginTop: 2 * 1,
        marginLeft: 2 * 1,
      },
      table: {
        minWidth: 320,
      },
      tableWrapper: {
        overflowX: 'auto',
      },
      head: {
        backgroundColor: 'black',
        color: 'white',
      },
      row: {
        '&:nthOfType(odd)': {
          backgroundColor: '#f2f4f6',
        },
      },
      titleGreen: {
        backgroundColor: '#2EC55D',
        height:'10%',
        width:'150%',
        borderRadius: '12px',
        textAlign:'center',
       },
       titleRed: {
        backgroundColor: '#DE3630',
        height:'10%',
        width:'150%',
        borderRadius: '12px',
        textAlign:'center',
       }
};

class ManageMerchants extends Component {

    state = {
        name:'',
        status: '',
        location:'',
        merchantList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        disableReset: true,
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
          else if(nextProps.merchantDelete){
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
        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.deleteMerchant(merchantId, this.props.userData.user.responseData.token);
        }
        else{
            //#TODO: Handle token expire case here
        }
    }

    updateMerchant = (merchantId) => {
        if(this.props.userData.user.responseData.token){
            this.props.getMerchantDetailsAPI(merchantId, this.props.userData.user.responseData.token)
        }
        this.props.history.push('/updateMerchant')
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
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

        const { merchantList, rowsPerPage, page, dialogOpen } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, merchantList.length - page * rowsPerPage);

        return (
          <div>
            <Loader status={this.state.showLoader} />

            <div>
                <Dialog
                    open={dialogOpen}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Merchant deleted successfully"}</DialogTitle>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div> 

            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="appTitleLabel">
                        MANAGE MERCHANT
                    </div>
                    <div className="row middle-md">
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            type="text"
                            name="name" 
                            myPlaceHolder="Name" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Field
                                    name="status"
                                    component={renderSelectField}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>
                                        Status
                                    </MenuItem>
                                    {
                                    Data.searchStatus.map((item) =>{
                                        return <MenuItem 
                                            style={styles.selectControl}
                                            key={item.id}
                                            value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    })
                                    }
                                </Field>    
                            </FormControl>  
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Field
                                    name="location"
                                    component={renderSelectField}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>
                                        Location
                                    </MenuItem>
                                    {
                                    Data.states.map((item) =>{
                                        return <MenuItem 
                                            style={styles.selectControl}
                                            key={item.id}
                                            value={item.prefix}>
                                            {item.name}
                                        </MenuItem>
                                    })
                                    }
                                </Field>    
                            </FormControl>  
                        </div>    
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <button 
                                type="button"
                                onClick={this.onHandleReset.bind(this)}
                                style={{backgroundColor:'#BCBCBC'}}
                                disabled={this.state.disableReset}
                                className={this.state.disableReset ? "disabledButton button" : "enabledButton button"}
                                > Reset
                            </button>
                            <button 
                                type="button"
                                onClick={this.onHandleSearch.bind(this)}
                                className="button"
                                > Filter
                            </button> 
                        </div>       
                        <div className="col-xs-12 col-sm-6 col-md-3 end-md">
                            <button 
                            type="button"
                            onClick={this.addNewMerchant.bind(this)}
                            className="button"
                            style={{backgroundColor:'#27A24F'}}
                            > +Add Merchant</button> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                                <Paper style={styles.root}>
                                <div style={styles.tableWrapper}>
                                <Table style={styles.table} padding='dense'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell numeric>#</TableCell>
                                            <TableCell>Merchant Name</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>Email Address</TableCell>
                                            <TableCell>Phone Number</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { 
                                        (merchantList.length === 0) ? 
                                        (<TableRow style={styles.row}>
                                            <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                        </TableRow>)
                                        : (
                                        merchantList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((object, index) => {
                                            return (
                                            <TableRow style={styles.row} key={object.id}>
                                                <TableCell numeric>{object.serial_number}</TableCell>
                                                <TableCell>{object.first_v + " " + object.last_v}</TableCell>
                                                <TableCell>{object.city_v}</TableCell>
                                                <TableCell>{object.email_v}</TableCell>
                                                <TableCell><NumberFormat value={object.phone_v} displayType={'text'} format="+1 (###) ###-####" /></TableCell>
                                                <TableCell>
                                                    <div style={object.inactive_v === 1 ? styles.titleRed : styles.titleGreen}><FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status}</FormLabel></div>
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
                </form>
            </Paper>  
           </div> 
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMerchantListWithFilter, deleteMerchant, getMerchantDetailsAPI }, dispatch)
  }
  
  ManageMerchants = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      merchantPayload: state.merchant.merchantList === undefined ? undefined : state.merchant.merchantList,
      merchantDelete: state.merchant.deleteMerchant === undefined ? undefined : state.merchant.deleteMerchant
    }),
    mapDispatchToProps,
  )(ManageMerchants)
  
  export default reduxForm({form: 'FrmManageMerchant'})(ManageMerchants)