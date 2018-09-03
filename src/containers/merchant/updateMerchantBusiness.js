//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import RenderCheckbox from '../../components/renderCheckbox'
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getMerchantDetailsAPI, updateMerchantDetails, clearMerchantUpdateState } from '../../actions/merchantAction';

//Validation
import {required, exact9, between1to100, dropDownRequired, email, website, phoneMask, taxNumberMask, zipMask, normalizedPhone} from '../../utilities/validation'

//Data
import Data from '../../staticData';

let errorMessage

const intMaxRangeMatch = (value) => parseFloat(value.replace(normalizedPhone,'')) > 2147483647 ? 'Invalid sales amount' : undefined;


const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      }
};

class UpdateBusinessDetails extends Component {

    state = {
        businessType: '',
        stateName:'',
        creditCheckedNo: true,
        creditCheckedYes: false,
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleCheckboxChange = name => event => {
        this.setState({[name]: event.target.checked});

        if (name === "creditCheckedYes"){
            this.setState({creditCheckedNo: !event.target.checked});
        }
        else if (name === "creditCheckedNo"){
            this.setState({creditCheckedYes: !event.target.checked});
        }
      };

      //Enables "Public Company" option if not following cases
      renderSwitch(param) {
        switch(param) {
          case '0':
            return true;
          case '5':
            return true;  
          case '6':
            return true;
          default:
            return false;
        }
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
          if (nextProps.updateBusinessResponse){
            this.setState({showLoader:false})
            nextProps.updateBusinessResponse
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

      onSubmit(values) {
        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.updateMerchantDetails(values, "businessDetails", this.props.userData.user.responseData.token)
        }
      }

    render() {

        const { pristine, submitting } = this.props
        const actions = [
            <Button key="ok" onClick={this.handleCloseAlert} color="primary" autoFocus>
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
                            <FormLabel component="legend">BUSINESS DETAILS</FormLabel>
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

                        <Divider style={{marginBottom:'20px'}}/>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Business Type (e.g. LLC)*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                        <Field
                                            name="businessType"
                                            component={renderSelectField}
                                            fullWidth={true}
                                            label={this.state.businessType}
                                            onChange={this.handleChange}
                                            validate={dropDownRequired}
                                        >
                                        {
                                            Data.businessType.map((item) =>{
                                               return <MenuItem 
                                               style={styles.selectControl}
                                               key={item.id}
                                               value={item.prefix}>
                                               {item.name.toUpperCase()}
                                               </MenuItem>
                                            })
                                        }
                                        {
                                            !this.renderSwitch(this.state.businessType) ?(
                                            <MenuItem>
                                                <FormControlLabel
                                                    control={
                                                        <Field 
                                                            name="isPublicCompany" 
                                                            id="publicCompany" 
                                                            value={this.state.isPublicCompany}
                                                            myStyle={styles} 
                                                            component={RenderCheckbox} />
                                                    }
                                                    label="Public Company"
                                                />
                                            </MenuItem>
                                            ): null
                                        }
                                    </Field>    
                                </FormControl>  
                            </div>  
                        </div>
                        {
                            this.state.businessType !== "0" ?(
                                <div className="row middle-md">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Legal Business Name*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field 
                                            myType="text" 
                                            name="businessName"
                                            fullWidth={true} 
                                            onChange={this.handleChange}
                                            component={InputField} 
                                            validate={[required,between1to100]}
                                        />  
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                DBA - Statement Descriptor
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="dba" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Tax ID Number*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                        myType="text" 
                                        name="taxId" 
                                        fullWidth={true} 
                                        onChange={this.handleChange}
                                        component={InputField} 
                                        masked={true}
                                        myMaskType="text"
                                        maskReg={taxNumberMask}
                                        validate={[required,exact9]}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Customer Service Phone
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field 
                                    myType="text" 
                                    name="servicePhone" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    onChange={this.handleChange}
                                    masked={true}
                                    myMaskType="text"
                                    maskReg={phoneMask}
                                />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Years in Business*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="date" 
                                    name="businessPeriod" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={required}/>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Website*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field 
                                    myType="text" 
                                    name="businessWebsite" 
                                    myPlaceHolder="http://www.example.com"
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={[required, website]}
                                />  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Currently accept credit cards
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Field 
                                            name="isCreditCardNo" 
                                            id="creditCardNo" 
                                            myStyle={styles} 
                                            value={this.state.creditCheckedNo}
                                            onChange={this.handleCheckboxChange('creditCheckedNo')}
                                            component={RenderCheckbox} 
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Field 
                                            name="isCreditCardYes" 
                                            id="creditCardYes" 
                                            myStyle={styles} 
                                            value= {this.state.creditCheckedYes}
                                            onChange={this.handleCheckboxChange('creditCheckedYes')}
                                            component={RenderCheckbox} 
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                            {this.state.creditCheckedYes === true && this.state.creditCheckedNo === false ? (
                                <React.Fragment>
                                <div className="col-xs-12 col-sm-6 col-md-3">
                                        Annual CC Sales*
                                </div>    
                                <div className="col-xs-12 col-sm-6 col-md-3">
                                    <Field 
                                        myType="text" 
                                        name="ccSale" 
                                        fullWidth={true} 
                                        onChange={this.handleChange}
                                        component={InputField} 
                                        validate={[required, intMaxRangeMatch]}
                                        masked={true}
                                        myMaskType="number"
                                    />    
                                </div>
                                </React.Fragment>
                                ) : ( null
                            )}
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Phone*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="businessPhone" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={required}
                                    masked={true}
                                    myMaskType="text"
                                    maskReg={phoneMask}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Fax
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">   
                                <Field 
                                    myType="text" 
                                    name="businessFax" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    masked={true}
                                    myMaskType="text"
                                    maskReg={phoneMask}
                                />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Address*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="businessAddress" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={[required,between1to100]}/>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Address 2
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field 
                                    myType="text" 
                                    name="businessAddress2" 
                                    onChange={this.handleChange}
                                    fullWidth={true} 
                                    component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                City*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="businessCity" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={[required,between1to100]}/>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                State*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <FormControl style={styles.formControl}>
                                        <Field
                                            name="businessStateName"
                                            component={renderSelectField}
                                            fullWidth={true}
                                            label={this.state.businessStateName}
                                            onChange={this.handleChange}
                                            validate={dropDownRequired}
                                        >
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
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Zip*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="businessZip" 
                                    fullWidth={true} 
                                    onChange={this.handleChange}
                                    component={InputField} 
                                    validate={required}
                                    masked={true}
                                    myMaskType="text"
                                    maskReg={zipMask}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Email*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field 
                                myType="text" 
                                name="businessEmail" 
                                fullWidth={true} 
                                onChange={this.handleChange}
                                component={InputField} 
                                validate={[required, email, between1to100]}
                                />  
                            </div>
                        </div>
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

UpdateBusinessDetails = reduxForm({
    form: 'frmUpdateBusinessDetails',
})(UpdateBusinessDetails)

UpdateBusinessDetails = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
       updateBusinessResponse: state.merchant.updateMerchant === undefined ? undefined : state.merchant.updateMerchant.responseData,
       initialValues: state.merchant.merchantDetails === undefined ? undefined : state.merchant.merchantDetails.responseData
    }),
    mapDispatchToProps,
  )(UpdateBusinessDetails)

export default UpdateBusinessDetails;