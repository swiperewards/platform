//react-redux
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

//redux-form
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';


//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../components/inputField'
import RaiseButton from '../components/raiseButton'

//Actions
import {registerUser} from '../actions/accountAction'

const required = value => value && value.trim() !== "" ? undefined : `Required`

class Register extends Component {

    onSubmit(values) {
        this.setState({showLoader:true})
        this.props.registerUser(values);
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
                                    <InputField name="emailId" myLabel="Email" myPlaceHolder="" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Full Name</label>
                                    <InputField name="fullName" myLabel="Full Name" myPlaceHolder="" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Password</label>
                                    <InputField name="password" myType="password" myLabel="password" myPlaceHolder="" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Confirm Password</label>
                                    <InputField name="confirmPassword" myType="password" myLabel="password" myPlaceHolder="" fullWidth={true} component={InputField} validate={required} />
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
    form: 'FrmRegister'
}
)(connect(null, mapDispatchToProps)(Register))
