//react-redux
import React, { Component } from 'react';

//redux-form
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';


//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../components/inputField'
import RaiseButton from '../components/raiseButton'

const required = value => value && value.trim() !== "" ? undefined : `Required`

class Register extends Component {

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
                                    <InputField name="username" myLabel="Email" myPlaceHolder="Email" component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Full Name</label>
                                    <InputField name="username" myLabel="Email" myPlaceHolder="Email" component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Password</label>
                                    <InputField name="password" myType="password" myLabel="password" myPlaceHolder="Password" component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Confirm Password</label>
                                    <InputField name="password" myType="password" myLabel="password" myPlaceHolder="Password" component={InputField} validate={required} />
                                </div>
                                <div className="g-recaptcha" data-sitekey="6Ld6-mMUAAAAAGcrILvNoAyV8EwAWKYi38aunc8F"></div>
                                <div style={{paddingTop:'10px', textAlign:'center'}}> 
                                    <RaiseButton variant="contained" color="primary" isFullWidth={true} label="CREATE YOUR SWIPE ACCOUNT"/>
                                </div>        
                            </form>
                        </div>            
                        
                    </Paper>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'FrmRegister'
}
)(connect()(Register))
