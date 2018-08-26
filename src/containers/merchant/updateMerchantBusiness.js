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

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import RenderCheckbox from '../../components/renderCheckbox'

//Actions
import { getMerchantDetailsAPI } from '../../actions/merchantAction';

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

function validate(formProps) {  
    const errors = {};
  
    if (!formProps.businessType) {
      errors.firstName = 'Select business Type';
    }
  
    if (!formProps.businessName) {
      errors.lastName = 'Please enter a Business name';
    }
  
    return errors;
  }

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

    componentDidMount() {

        if(this.props.userData.user.responseData.token && this.props.merchant){
            this.props.getMerchantDetailsAPI(this.props.merchant, this.props.userData.user.responseData.token)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
          if (nextProps.merchantDetails){
            if(nextProps.merchantDetails.status === 200){
                this.handleInitialize(nextProps.merchantDetails.responseData);
                
            }
          }
        }
    }  

    handleInitialize(entityDetails) {
        if(entityDetails !== undefined){
            const initData = {
            "businessType": entityDetails.type_v,
            "isPublicCompany": entityDetails.public_v,
            "businessName": entityDetails.name_v,
            "dba": entityDetails.dba_v,
            "taxId": entityDetails.ein_v,
            "servicePhone": entityDetails.customerPhone_v,
            "businessPeriod": entityDetails.established_v,  
            "businessWebsite": entityDetails.website_v,
            "isCreditCardNo": entityDetails.annualCCSales_v !== ""? false: true,
            "isCreditCardYes": entityDetails.annualCCSales_v !== ""? true: false,
            "ccSale":entityDetails.annualCCSales_v,    
            "businessPhone": entityDetails.phone_v,   
            "businessFax": entityDetails.fax_v,
            "businessAddress":entityDetails.address1_v,
            "businessAddress2":entityDetails.address2_v,
            "businessCity":entityDetails.city_v,
            "businessZip":entityDetails.zip_v,
            "businessEmail":entityDetails.email_v,
            "businessStateName":entityDetails.state_v,
            };
        
            this.props.initialize(initData);
        }
      }

      handleFormSubmit(formProps) {
        this.props.submitFormAction(formProps);
      }

    render() {

        const { handleSubmit } = this.props;  

        return (
            <div style={{paddingBottom:'20px'}}>
                <form autoComplete="off" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-6">
                            <FormLabel component="legend">BUSINESS DETAILS</FormLabel>
                            </div>
                            <div className="col-xs-6">
                                <button action="submit">Save changes</button>
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
                                    myValue={this.state.dba}
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
                                        myValue={this.state.taxId}
                                        onChange={this.handleChange}
                                        component={InputField} 
                                        validate={[required,exact9]}
                                        masked={true}
                                        myMaskType="text"
                                        maskReg={taxNumberMask}
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
                                    myValue={this.state.servicePhone}
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
                                    myValue={this.state.businessPeriod}
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
                                    myValue={this.state.businessWebsite}
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
                                        myValue={this.state.ccSale}
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
                                    myValue={this.state.businessPhone}
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
                                    myValue={this.state.businessFax}
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
                                    myValue={this.state.businessAddress}
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
                                    myValue={this.state.businessAddress2}
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
                                    myValue={this.state.businessCity}
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
                                    myValue={this.state.businessZip}
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
                                myValue={this.state.businessEmail}
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
    return bindActionCreators({ getMerchantDetailsAPI }, dispatch)
  }

UpdateBusinessDetails = reduxForm({
    form: 'frmUpdateBusinessDetails',
    enableReinitialize: true,
    validate
})(UpdateBusinessDetails)

UpdateBusinessDetails = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
       merchantDetails: state.merchant.merchantDetails === undefined ? undefined : state.merchant.merchantDetails
    }),
    mapDispatchToProps,
  )(UpdateBusinessDetails)

export default UpdateBusinessDetails;