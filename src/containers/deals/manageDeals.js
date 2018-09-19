//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'

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
import AddIcon from '@material-ui/icons/Add';

//Components
import InputField from '../../components/inputField';
import TablePaginationActions from '../../components/tableGrid';
import {renderSelectField} from '../../components/selectControl';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getUserProfile } from '../../actions/accountAction';
import { getDealsListWithFilter, deleteDeal, getDealDetails, getCitiesList } from '../../actions/dealAction';

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

class ManageDeals extends Component {

    state = {
        name:'',
        status: '',
        location:'',
        fromDate:'',
        toDate:'',
        dealsList:'',
        citiesList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        disableReset: true,
        permissionDisplayBox: false,
    };

    componentWillMount()
    {
        this.getAllDeals();

        if(this.props.userData.user.responseData.token){
            this.props.getCitiesList(this.props.userData.user.responseData.token)
        }

        if(this.props.userData.user.responseData.role === 'merchant'){
            const profileMerchantId = this.props.userProfile === undefined ? null : this.props.userProfile.responseData.merchantId
            if(this.props.userData.user.responseData.token && profileMerchantId === null){
                this.setState({showLoader:true})
                this.props.getUserProfile(this.props.userData.user.responseData.token);
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.dealsPayload){
            if(nextProps.dealsPayload.status === 200){
                this.setState({dealsList: nextProps.dealsPayload.responseData})
            }
          }
          
          if(nextProps.dealDelete){
            this.setState({showLoader:false})
            if(nextProps.dealDelete.status === 200){
                this.setState({ dialogOpen: true });
                this.getAllDeals();
            }
          }

          if(nextProps.citiesPayload){
            if(nextProps.citiesPayload.status === 200){
                this.setState({citiesList:nextProps.citiesPayload.responseData})
            }
          }

          if(nextProps.userProfile){
            this.setState({showLoader:false})
            if(nextProps.userProfile.status === 200){
                if(nextProps.userProfile.responseData){
                    if(nextProps.userProfile.responseData.merchantId === null){
                        this.props.history.push('/addNewMerchant');
                    }
                }
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

    getAllDeals(){
        if(this.props.userData.user.responseData.token){
            this.props.getDealsListWithFilter(this.state.name, this.state.status, this.state.location, this.state.fromDate, this.state.toDate, this.props.userData.user.responseData.token)
        }
        else{
            //#TODO : Handle token expire case
        }
    }

    onHandleSearch(){
        this.getAllDeals();
    }

    deleteDealById = (dealId) => {

        if (this.state.permissionDisplayBox) {
            this.handleClose();
            if(this.props.userData.user.responseData.token){
                this.setState({showLoader:true})
                this.props.deleteDeal(this.state.dealId, this.props.userData.user.responseData.token);
            }
            else{
                //#TODO: Handle token expire case here
            }
        }
        else{
            this.setState({ permissionDisplayBox: true, dealId: dealId });
        }
    }

    updateDeal = (dealId) =>{

        if(this.props.userData.user.responseData.token){
            this.props.getDealDetails(dealId, this.props.userData.user.responseData.token)
            this.props.history.push('/updateDeal')
        }
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.setState({ permissionDisplayBox: false });
    };

    addNewDeal(){
        if(this.props.userData.user.responseData.merchantId !== null){
            this.props.history.push({pathname:'/addNewDeal',state: { detail: this.props.userData.user.responseData.merchantId }})
        }else{
            this.props.history.push('/merchantList')
        }
    }

    onHandleReset(){
        this.setState({name:''});
        this.setState({status:''});
        this.setState({location:''});
        this.setState({disableReset:true});
        this.props.reset();

        if(this.props.userData.user.responseData.token){
            this.props.getDealsListWithFilter("", "", "", "", "", this.props.userData.user.responseData.token)
        }
    
    }

    render() {

        const { dealsList, rowsPerPage, page, dialogOpen, permissionDisplayBox } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dealsList.length - page * rowsPerPage);

        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        const permissionActions = [
            <Button key="no" onClick={this.handleClose} color="primary">
                No
            </Button>,
            <Button key="yes" onClick={this.deleteDealById} color="primary" autoFocus>
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
                    message="Deal deleted successfully" 
                    actions={actions} 
                />

                <DialogBox 
                    displayDialogBox={permissionDisplayBox} 
                    message="Are you sure to delete deal?" 
                    actions={permissionActions} 
                />
            </div> 

            <div className="row">
            <div className="col-xs-12">
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="row appTitleLabel">
                        MANAGE DEALS
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
                                    Data.dealStatus.map((item) =>{
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
                                        (this.state.citiesList) ? 
                                            this.state.citiesList.map((item) =>{
                                            return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            })
                                        : null    
                                    }
                                </Field>    
                            </FormControl>  
                        </div>    
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            myType="date"
                            name="fromDate" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            myType="date"
                            name="toDate" 
                            myPlaceHolder="To Date" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-1">
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
                        <div className="col-xs-12 col-sm-6 col-md-1 end-md">
                            <Button 
                            variant="fab"
                            type="button"
                            color="primary"
                            onClick={this.addNewDeal.bind(this)}
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
                                <TableCell>Merchant Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Period</TableCell>
                                <TableCell>Cashback</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            (dealsList !== "") ? (
                            (dealsList.length === 0) ? 
                                (<TableRow>
                                    <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                </TableRow>)
                                : (
                                dealsList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((object, index) => {
                                    return (
                                    <TableRow className="tableRow" key={object.id}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.entityName}</TableCell>
                                        <TableCell>{object.location}</TableCell>
                                        <TableCell>{moment(object.startDate).format('MM/DD/YYYY') + " - " + moment(object.endDate).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell>{object.cashBonus}%</TableCell>
                                        <TableCell>
                                            <div className={object.status === 0 ? "titleRed" : "titleGreen"}>
                                                <FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status === 0 ? "Expired" : "Active"}</FormLabel>
                                            </div>
                                        </TableCell>
                                        <TableCell> 
                                            <div className="row start-md middle-md">
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.updateDeal(object.id)} className="enabledButton"> 
                                                        <img src="../images/ic_edit.svg" alt="" /> 
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.deleteDealById(object.id)} className="enabledButton"> 
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
                                count={dealsList.length}
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
    return bindActionCreators({ getDealsListWithFilter, deleteDeal, getUserProfile, getDealDetails, getCitiesList }, dispatch)
  }
  
  ManageDeals = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      dealsPayload: state.deal.dealList === undefined ? undefined : state.deal.dealList,
      dealDelete: state.deal.deleteDeal === undefined ? undefined : state.deal.deleteDeal,
      userProfile: state.account.userProfile === undefined ? undefined : state.account.userProfile, 
      citiesPayload: state.deal.citiesList === undefined ? undefined : state.deal.citiesList,
    }),
    mapDispatchToProps,
  )(ManageDeals)
  
  export default reduxForm({form: 'FrmManageDeals'})(ManageDeals)