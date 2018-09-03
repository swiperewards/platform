//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

//Validation
import {required, dropDownRequired, ipAddressMatch} from '../../utilities/validation'

//Actions
import { getMerchantDetailsAPI, updateMerchantDetails, clearMerchantUpdateState } from '../../actions/merchantAction';

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Data
import Data from '../../staticData'

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
      row: {
        fontSize:'12px',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f2f4f6',
        },
      },
};

class UpdateAccountSetup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardingStatus: '',
            merchanttype: '',
            termsCheckedNo: true,
            termsCheckedYes: false,
            openMCCPopUp: false,
            updatedList:Data.mccCodes, 
            mccCode:'',
          };
      }

      componentWillMount(){
        this.setState({ openAlert: false });
        this.props.clearMerchantUpdateState()
        errorMessage = undefined
        
        if(this.props.userData.user.responseData.token && this.props.merchant){
            this.props.getMerchantDetailsAPI(this.props.merchant, this.props.userData.user.responseData.token)
        }
      }
    
      componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.updateAccountResponse){
            this.setState({showLoader:false})
            nextProps.updateAccountResponse
            .map((response)=>{
                if(response.code === 200 || response.code === 201){
                    errorMessage = errorMessage !== undefined ? errorMessage : undefined
                }
                else{
                    if(response.code === 1084){
                        errorMessage =
                        response.data.map((error, index) =>
                            <div 
                                key={index} 
                                className="errorDiv"
                            >
                            {error.field + ' : ' + error.msg}
                            </div >
                        )
                    }
                    else{
                        errorMessage =
                            <div 
                                className="errorDiv"
                            >
                            {response.description}
                            </div >
                    }
                }
            })

            if(errorMessage === undefined){
                this.handleOpenAlert()
            }
          }
        }
        
      }

      handleOpenAlert = () => {
        this.setState({ openAlert: true });
      };

      handleCloseAlert = () => {
        this.setState({ openAlert: false });
      };

      handleChange = name => event => {
        this.setState({ [name]: event.target.value});
      };

      handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });

        if (name === "termsCheckedYes"){
            this.setState({termsCheckedNo: !event.target.checked})
        }else if (name === "termsCheckedNo"){
            this.setState({termsCheckedYes: !event.target.checked})
        }
      };

      handleMCCPopUp = (event) => {
        event.target.blur()
        this.setState({ openMCCPopUp: true });
        this.setState({ updatedList: Data.mccCodes});
      };
    
      handleClose = () => {
        this.setState({ openMCCPopUp: false });
      };

      selectMCCCode = (code) => {

         this.props.change('mccNumber', code);
          this.setState({mccCode: code});
          this.handleClose();
      }

      onHandleSearch = (searchValue)=>{
        var filteredList

        if(searchValue.target.value === ''){
            filteredList = Data.mccCodes
        }
        else{
            const regex = new RegExp(searchValue.target.value, 'i');
            filteredList = Data.mccCodes.filter((datum) => {
              return (datum.edited_description.search(regex) > -1);
            });
        }
        
        this.setState({ updatedList: filteredList});
      }

      componentDidMount(){
        if(this.refs.boardingStatus){
            this.setState({boardingStatus:this.refs.boardingStatus.value})
          }
      }

      onSubmit(values) {

        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.updateMerchantDetails(values, "businessDetails" ,this.props.userData.user.responseData.token)
        }
      }

    render() {

        const { pristine, submitting } = this.props
        const actions = [
            <Button onClick={this.handleCloseAlert} color="primary" autoFocus>
                OK
            </Button>
        ];

        return (
            <div style={{paddingBottom:'20px'}}>
                <Loader status={this.state.showLoader} />
                <DialogBox 
                    displayDialogBox={this.state.openAlert} 
                    message="Merchant details updated successfully" 
                    actions={actions} 
                />
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-10 col-md-10">
                                <FormLabel component="legend">ACCOUNT SETUP</FormLabel>
                            </div>
                            <div className="col-xs-2 col-md-2">
                            <button 
                                type="submit"
                                disabled={pristine || submitting}
                                className={(pristine || submitting) === true ? "disabledButton button" : "enabledButton button"}
                            >
                                Update
                            </button>
                            </div>
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3" >
                                Boarding Status*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                            <Field
                                                name="boardingStatus"
                                                component={renderSelectField}
                                                fullWidth={true}
                                                onChange={this.handleChange('boardingStatus')}
                                                ref="boardingStatus"
                                                validate={dropDownRequired}
                                            >
                                        {
                                            Data.boardingStatus.map((item) =>{
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
                            <div className="col-xs-12 col-sm-6 col-md-3">
                            {   
                                this.state.boardingStatus === "0" ? 
                                    "Add MCC" : "Add MCC*"
                            }
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    name="mccNumber" 
                                    myType="number"
                                    ref="mccNumber" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={this.state.boardingStatus === "0" ? undefined : required} 
                                    onFocus={this.handleMCCPopUp}
                                /> 
                                <Dialog
                                    open={this.state.openMCCPopUp}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    >
                                    <DialogTitle id="alert-dialog-title">{"MCC CODES"}</DialogTitle>
                                    <DialogContent>
                                        <Field 
                                            myType="text"  
                                            myPlaceHolder="Search Text" 
                                            name="searchBox" 
                                            fullWidth={true} 
                                            component={InputField}
                                            onChange={this.onHandleSearch}
                                        />  
                                        <List>
                                            {
                                                this.state.updatedList.map((item, index) =>{
                                                    return(
                                                    <ListItem key={index} button disableGutters divider onClick={() => this.selectMCCCode(item.mcc)}>
                                                        <ListItemText disableTypography primary={item.mcc + " - " + item.combined_description}/>
                                                    </ListItem>
                                                    )
                                                
                                                })
                                            }
                                        </List>                                    
                                        </DialogContent>
                                </Dialog> 
                            </div>
                        </div>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">        
                                Merchant Type
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">    
                                <FormControl style={styles.formControl}>
                                            <Field
                                                name="merchantType"
                                                component={renderSelectField}
                                                fullWidth={true}
                                                onChange={this.handleChange}
                                            >
                                        {
                                            Data.merchantType.map((item, index) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={index}
                                                    value={item.prefix}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                        </Field>    
                                    </FormControl>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Accept Terms and Conditions
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedNo}
                                        onChange={this.handleCheckboxChange('termsCheckedNo')}
                                        value="termsCheckedNo"
                                        color="primary"
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedYes}
                                        onChange={this.handleCheckboxChange('termsCheckedYes')}
                                        value="termsCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                        </div>
                        {this.state.termsCheckedYes === true && this.state.termsCheckedNo === false ? (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Date of Acceptance
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="date" name="acceptanceDate" fullWidth={true} component={InputField} />  
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        IP Address
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="ipAddress" fullWidth={true} component={InputField} validate={ipAddressMatch}/>  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Time
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="time" name="acceptanceTime" fullWidth={true} component={InputField} />  
                                    </div>
                                </div>
                            </React.Fragment>

                                ) : ( null
                            )}
                    </div>            
                </Paper>  
                </form>     
                <div>
                    {errorMessage}
                </div>             
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMerchantDetailsAPI, updateMerchantDetails, clearMerchantUpdateState }, dispatch)
  }

UpdateAccountSetup = reduxForm({
    form: 'frmUpdateAccountSetup',
})(UpdateAccountSetup)

UpdateAccountSetup = connect(
    state => ({
        userData: state.account === undefined ? undefined : state.account,
        updateAccountResponse: state.merchant.updateMerchant === undefined ? undefined : state.merchant.updateMerchant.responseData,
        initialValues: state.merchant.merchantDetails === undefined ? undefined : state.merchant.merchantDetails.responseData
    }),
    mapDispatchToProps,
  )(UpdateAccountSetup)

export default UpdateAccountSetup;