//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';

//Components
import InputField from '../../components/inputField';

//Actions
import { getMerchantDetailsAPI, updateMerchantDetails } from '../../actions/merchantAction';

//Validation
import {required} from '../../utilities/validation'

let errorMessage

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

class AddNewTicket extends Component {

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
      
    componentWillMount() {

        if(this.props.userData.user.responseData.token && this.props.merchant){
            this.props.getMerchantDetailsAPI(this.props.merchant, this.props.userData.user.responseData.token)
        }
    }

    componentWillReceiveProps(nextProps) {
    
    }  

    handleInitialize(entityDetails) {
        if(entityDetails !== undefined){
            this.props.initialize(entityDetails);
        }
      }

      onSubmit(values) {

        console.log(values);
      }

      cancelClick(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{paddingBottom:'20px'}}>
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-12">
                            <FormLabel component="legend">ADD TICKET TYPE</FormLabel>
                            </div>                            
                        </div>

                        <Divider style={{marginBottom:'20px'}}/>

                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-3 col-md-3">
                                    Ticket Name*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="ticketName" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                />  
                            </div>
                        </div>
                        <div className="row end-xs">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <button 
                                    type="button"
                                    style={{backgroundColor:'#BCBCBC'}}
                                    disabled={this.state.disableReset}
                                    className={this.state.disableReset ? "disabledButton button" : "enabledButton button"}
                                    onClick={this.cancelClick.bind(this)}
                                   > Cancel
                                </button>

                                <button 
                                    type="submit"
                                    className="button"
                                    > Add
                                </button> 
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
    return bindActionCreators({ getMerchantDetailsAPI, updateMerchantDetails }, dispatch)
  }

  AddNewTicket = reduxForm({
    form: 'frmAddNewTicket',
    enableReinitialize: true,
    validate
})(AddNewTicket)

AddNewTicket = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
    }),
    mapDispatchToProps,
  )(AddNewTicket)

export default AddNewTicket;