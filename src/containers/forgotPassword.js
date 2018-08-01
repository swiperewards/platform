//react-redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//redux-form
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';


//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../components/inputField'
import RaiseButton from '../components/raiseButton'

const required = value => value && value.trim() !== "" ? undefined : `Required`


const styles = {
    signUpTxt :{
        color:'#424242',
        textDecorator:'none',
        fontSize:'14px',
        fontWeight:'normal'
    },
    signupLink:{
        textDecoration: 'none', 
        color:'#3895D8'
    },
    accountTxt:{
        marginTop:'10px',
        textAlign:'center'
    }
};

class ForgotPassword extends Component {

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
                                <div className="titleLabel">Forgot Password
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Enter Your Register Email</label>
                                    <InputField name="username" myLabel="Email" myPlaceHolder="" fullWidth={true} component={InputField} validate={required} />
                                </div>
                                <div style={{paddingTop:'10px', textAlign:'center'}}> 
                                    <RaiseButton style={{display:'inline-block' , float:'none'}} variant="contained" color="primary" label="SENT MAIL"/>
                                </div>        
                                <div style={styles.accountTxt}>
                                        <span className="controlLabel">Don’t have an account?</span><span style={styles.signUpTxt}><Link to='/register' style={styles.signupLink}> Register Now</Link>
                                        </span>
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
    form: 'FrmForgotPassword'
}
)(connect()(ForgotPassword))
