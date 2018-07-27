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
    loginTxt:{
        fontFamily: 'open_sansbold',
        paddingBottom:'10px',
        fontSize: 17,
        marginTop:'0px',
        textAlign: 'left',
        textTransform:'uppercase'
    },
    forgotTxt :{
        color:'#424242',
        float:'right',
        fontStyle:'italic',
        textDecorator:'underline',
        fontSize:'14px',
        fontWeight:'normal'
    },
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
        float:'right',
        marginTop:'10px'
    }
};

class Login extends Component {

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
                                <div className="titleLabel">LOGIN
                                </div>
                                <div className="formGroup">
                                    <label className="controlLabel">Username or Email Address</label>
                                    <InputField name="username" myLabel="Email" myPlaceHolder="Email" component={InputField} validate={required} />
                                </div>
                                <div className="formGroup">
                                    <label  className="controlLabel">Password</label>
                                    <InputField name="password" myType="password" myLabel="password" myPlaceHolder="Password" component={InputField} validate={required} />
                                </div>
                                <div className="checkbox">
                                    <label className="controlLabel"><input type="checkbox" ref="remember" name="remember"/> Remember me</label>                 
                                    <Link style={styles.forgotTxt} to={'/resetPassword'}> Forgot Password?</Link> 	
                                </div>
                                <div style={{paddingTop:'10px'}}> 
                                    <RaiseButton style={{display:'inline-block' , float:'none'}} variant="contained" color="primary" label="SIGN IN"/>
                                    <div style={styles.accountTxt}>
                                        <span className="controlLabel">Don’t have an account? </span><span style={styles.signUpTxt}><Link to='/register' style={styles.signupLink}>Sign Up</Link>
                                        </span>
                                    </div>
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
    form: 'FrmLogin'
}
)(connect()(Login))
