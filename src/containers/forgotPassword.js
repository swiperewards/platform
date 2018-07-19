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
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '10%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    paper: {
        background:'#fff',
        padding: '20px 25px',
        margin: '5px',
        overflow: 'auto',
        borderRadius:'1px',
        boxShadow:'0 0 6px #ccc'
    },
    logo:{
        float:'left', 
        textAlign: 'center', 
        width: '100%'
    },
    label:{
        color:'#231f20',
        fontWeight:'normal',
        fontSize:'14px'
    },
    formContent:{
        float:'left',
        paddingTop:'0px', 
        width:'100%'
    },
    formGroup:{
        marginBottom:'10px'
    },
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
        marginTop:'10px',
        textAlign:'center'
    }
};

class ForgotPassword extends Component {

    render() {

        return (
            <div>
                <div style={styles.loginContainer}>
                    <Paper style={styles.paper}>
                        <div style={styles.logo}>
                            <img src="../images/logo1.png" alt="Logo" />
                        </div>
                        <div style={styles.formContent}>
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="gradient-text" style={styles.loginTxt}>Forgot Password
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Enter Your Register Email</label>
                                    <InputField name="username" myLabel="Email" myPlaceHolder="Email" component={InputField} validate={required} />
                                </div>
                                <div style={{paddingTop:'10px', textAlign:'center'}}> 
                                    <RaiseButton style={{display:'inline-block' , float:'none'}} variant="contained" color="primary" label="SENT MAIL"/>
                                </div>        
                                <div style={styles.accountTxt}>
                                        <span style={styles.label}>Don’t have an account?</span><span style={styles.signUpTxt}><Link to='/signup' style={styles.signupLink}> Register Now</Link>
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
