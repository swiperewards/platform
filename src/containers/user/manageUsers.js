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
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

//Components
import InputField from '../../components/inputField';
import TablePaginationActions from '../../components/tableGrid';
import {renderSelectField} from '../../components/selectControl';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getUsersByFilter, deleteUser, getUserDetails, clearUserDetails, clearUserDeleteResponse } from '../../actions/userAction';

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
};

class ManageUsers extends Component {

    state = {
        name:'',
        status: '',
        userType:'',
        usersList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        disableReset: true,
        permissionDisplayBox: false,
    };

    componentWillMount()
    {
        this.getAllUsers();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.userPayload){
            if(nextProps.userPayload.status === 200){
                this.setState({usersList: nextProps.userPayload.responseData})
            }
          }
          
          if(nextProps.deleteUserResponse){
            this.setState({showLoader:false})
            if(nextProps.deleteUserResponse.status === 200){
                this.setState({ dialogOpen: true });
                this.getAllUsers();
            }
            this.props.clearUserDeleteResponse();
          }
        }
    }

    //Method to handle change event for dropdown
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        if(this.state.name === "" && this.state.status === "" && this.state.userType === ""){
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

    getAllUsers(){
        if(this.props.userData.user.responseData.token){
            this.props.getUsersByFilter(this.state.name, this.state.status, this.state.userType, this.props.userData.user.responseData.token)
        }
        else{
            //#TODO : Handle token expire case
        }
    }

    onHandleSearch(){
        this.getAllUsers();
    }

    deleteUserById = (userId) => {

        if (this.state.permissionDisplayBox) {
            this.handleClose();
            if(this.props.userData.user.responseData.token){
                this.setState({showLoader:true})
                this.props.deleteUser(this.state.userId, this.props.userData.user.responseData.token);
            }
            else{
                //#TODO: Handle token expire case here
            }
        }
        else{
            this.setState({ permissionDisplayBox: true, userId: userId });
        }
    }

    updateUser = (userId) => {

        this.props.clearUserDetails();

        if(this.props.userData.user.responseData.token){
            this.props.getUserDetails(userId, this.props.userData.user.responseData.token)
        }

        this.props.history.push('/updateUser')
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.setState({ permissionDisplayBox: false });
    };

    onHandleReset(){
        this.setState({name:''});
        this.setState({status:''});
        this.setState({userType:''});
        this.setState({disableReset:true});
        this.props.reset();

        if(this.props.userData.user.responseData.token){
            this.props.getUsersByFilter("", "", "" ,this.props.userData.user.responseData.token)
        }
    
    }

    render() {

        const { usersList, rowsPerPage, page, dialogOpen, permissionDisplayBox } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, usersList.length - page * rowsPerPage);
        
        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        const permissionActions = [
            <Button key="no" onClick={this.handleClose} color="primary">
                No
            </Button>,
            <Button key="yes" onClick={this.deleteUserById} color="primary" autoFocus>
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
                    message="User deleted successfully" 
                    actions={actions} 
                />

                <DialogBox 
                    displayDialogBox={permissionDisplayBox} 
                    message="Are you sure to delete user?" 
                    actions={permissionActions} 
                />
            </div> 

            <div className="row">
            <div className="col-xs-12">
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="row appTitleLabel">
                        MANAGE USERS
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
                                    Data.userStatus.map((item) =>{
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
                                    name="userType"
                                    component={renderSelectField}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>
                                        User Type
                                    </MenuItem>
                                    {
                                    Data.userType.map((item) =>{
                                        return <MenuItem 
                                            style={styles.selectControl}
                                            key={item.id}
                                            value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    })
                                    }
                                </Field>    
                            </FormControl>  
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
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
                                > Search
                            </button> 
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
                                <TableCell>User Name</TableCell>
                                <TableCell>Email Address</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            (usersList !== "") ? (
                            (usersList.length === 0) ? 
                                (<TableRow>
                                    <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                </TableRow>)
                                : (
                                usersList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((object, index) => {
                                    return (
                                    <TableRow className="tableRow" key={object.serial_number}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.fullName}</TableCell>
                                        <TableCell>{object.emailId}</TableCell>
                                        <TableCell><NumberFormat value={object.contactNumber} displayType={'text'} format="+1 (###) ###-####" /></TableCell>
                                        <TableCell>{object.roleId === 3 ? "Merchant" : "Customer"}</TableCell>
                                        <TableCell>
                                            <div className={object.status === 0 ? "titleRed" : "titleGreen"}>
                                                <FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status === 0 ? "Deactive" : "Active"}</FormLabel>
                                            </div>
                                        </TableCell>
                                        <TableCell> 
                                            <div className="row start-md middle-md">
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.updateUser(object.userId)} className="enabledButton"> 
                                                        <img src="../images/ic_edit.svg" alt="" /> 
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.deleteUserById(object.userId)} className="enabledButton"> 
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
                                count={usersList.length}
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
    return bindActionCreators({ getUsersByFilter, deleteUser, getUserDetails, clearUserDetails, clearUserDeleteResponse }, dispatch)
  }
  
  ManageUsers = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      deleteUserResponse: state.userAccount.deleteUser === undefined ? undefined : state.userAccount.deleteUser,
      userPayload: state.userAccount.userList === undefined ? undefined : state.userAccount.userList,
    }),
    mapDispatchToProps,
  )(ManageUsers)
  
  export default reduxForm({form: 'FrmManageUsers'})(ManageUsers)