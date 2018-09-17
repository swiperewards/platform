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
import FormLabel from '@material-ui/core/FormLabel';

//Components
import InputField from '../../components/inputField';
import TablePaginationActions from '../../components/tableGrid';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'

//Actions
import { getMerchantListWithFilter } from '../../actions/merchantAction';

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

class MerchantsList extends Component {

    state = {
        name:'',
        status: '',
        location:'',
        merchantList:'',
        page: 0,
        rowsPerPage: 5,
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
            this.props.getMerchantListWithFilter(this.state.name, "0", this.state.location, this.props.userData.user.responseData.token)
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

    handleClick = (event, id) => {
        this.props.history.push({pathname:'/addNewDeal',state: { detail: id }})

    }

    render() {

        const { merchantList, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, merchantList.length - page * rowsPerPage);

        return (
          <div className="row">
            <div className="col-xs-12">
            <Loader status={this.state.showLoader} />

            <div className="row">
            <div className="col-xs-12">
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-2">
                            <FormLabel component="legend">ADD DEAL</FormLabel>
                            </div>  
                            <div className="col-xs-12 col-md-10">
                                <div className="appDescriptionLabel">
                                    Select a merchant from list to proceed add new Deal.
                                </div>
                            </div>                           
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
                        <div className="col-xs-12 col-sm-6 col-md-6">
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
                                <TableCell>Email Address</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Status</TableCell>
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
                                    <TableRow className="tableRow" key={object.id} hover onClick={event => this.handleClick(event, object.id)}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.first_v + " " + object.last_v}</TableCell>
                                        <TableCell>{object.city_v}</TableCell>
                                        <TableCell>{object.email_v}</TableCell>
                                        <TableCell><NumberFormat value={object.phone_v} displayType={'text'} format="+1 (###) ###-####" /></TableCell>
                                        <TableCell>
                                            <div className={object.inactive_v === 1 ? "titleRed" : "titleGreen"}><FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status}</FormLabel></div>
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
    return bindActionCreators({ getMerchantListWithFilter }, dispatch)
  }
  
  MerchantsList = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      merchantPayload: state.merchant.merchantList === undefined ? undefined : state.merchant.merchantList,
    }),
    mapDispatchToProps,
  )(MerchantsList)
  
  export default reduxForm({form: 'FrmMerchantsList'})(MerchantsList)