//react-redux
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

//redux-form
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';


//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../components/inputField'
import RaiseButton from '../components/raiseButton'

//Validation
import {required, email, minimum8} from '../utilities/validation'

//Actions
import {registerUser} from '../actions/accountAction'



const validate = values => {
    const errors = {}

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Confirm password must be the same as password"
    }

    return errors;
}

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadStatus: false,
            invalidRecaptcha: true,
            showError: false
        }
    }

    onSubmit(values) {
        if (this.state.invalidRecaptcha) {
            this.setState({ showError: true });
        } else {
            this.props.registerUser(values);
            this.setState({ showError: false });
        }
    }

    render() {

        return (
            <div>
                <div className="pageContainer">
                    <Paper className="pagePaper">
                        <div className="logo">
                            <img src="../images/logo1.png" alt="Logo" />
                        </div>
                        <div className="formContent">
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="titleLabel">CREATE YOUR SWIPE ACCOUNT
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Email Address</label>
                                    <Field name="emailId" fullWidth={true} component={InputField} validate={[required, email]} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Full Name</label>
                                    <Field name="fullName" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Password</label>
                                    <Field name="password" myType="password" fullWidth={true} component={InputField} validate={[required, minimum8]} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Confirm Password</label>
                                    <Field name="confirmPassword" myType="password" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div className="g-recaptcha" data-sitekey="6Ld6-mMUAAAAAGcrILvNoAyV8EwAWKYi38aunc8F"></div>
                                <div style={{paddingTop:'10px', textAlign:'center'}}> 
                                    <RaiseButton type="submit" variant="contained" color="primary" isFullWidth={true} label="CREATE YOUR SWIPE ACCOUNT"/>
                                </div>        
                            </form>
                        </div>            
                        
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ registerUser }, dispatch)
}

export default reduxForm({
    form: 'FrmRegister',
    validate
}
)(connect(null, mapDispatchToProps)(Register))
