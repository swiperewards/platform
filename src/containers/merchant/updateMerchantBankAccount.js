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
import FormLabel from '@material-ui/core/FormLabel';

//Validation
import {required, dropDownRequired, between5to20} from '../../utilities/validation'

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';

//Actions
import { updateMerchantDetails } from '../../actions/merchantAction';

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
      }
};

class UpdateBankAccount extends Component {

    state = {
        account: '',
        merchantObject:'',
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
      onSubmit(values) {

        if(this.props.userData.user.responseData.token){
            this.props.updateMerchantDetails(values, "bankAccount" ,this.props.userData.user.responseData.token)
        }
      }

    render() {
        const { pristine, submitting } = this.props
    return (
        <div style={{paddingBottom:'20px'}}>
            <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
            <Paper className="pagePaper">
                <div className="formContent">
                    <div className="appTitleLabel row">
                            <div className="col-xs-10 col-md-10">
                            <FormLabel component="legend">ADD BANK ACCOUNT</FormLabel>
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
                        <div className="col-xs-12 col-sm-6 col-md-3" >
                            Bank Account Type*
                        </div>    
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <FormControl style={styles.formControl}>
                                    <Field
                                        name="bankAccountType"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        validate={dropDownRequired}
                                    >
                                    {
                                        Data.bankAccountType.map((item) =>{
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
                    </div>
                    <div className="row middle-md">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            Bank Routing Number*
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <Field 
                                myType="number" 
                                name="routeNumber" 
                                fullWidth={true} 
                                component={InputField} 
                                validate={[required, between5to20]}/>  
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            Bank Account Number*
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">    
                            <Field myType="number" name="accountNumber" fullWidth={true} component={InputField} validate={[required, between5to20]}/>  
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
    return bindActionCreators({ updateMerchantDetails }, dispatch)
  }

UpdateBankAccount = reduxForm({
    form: 'frmUpdateBankAccount',
})(UpdateBankAccount)

UpdateBankAccount = connect(
    state => ({
        userData: state.account === undefined ? undefined : state.account,
        initialValues: state.merchant.merchantDetails === undefined ? undefined : state.merchant.merchantDetails.responseData
    }),
    mapDispatchToProps,
  )(UpdateBankAccount)


export default UpdateBankAccount