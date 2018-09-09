//react-redux
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

//redux-form
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material-ui
import Paper from '@material-ui/core/Paper';

import {resendVerificationMail, activateUserAccount} from '../../actions/accountAction';
import { appName } from '../../app.config';

let errorMessage

const styles = {
    signUpTxt :{
        color:'#424242',
        textDecorator:'none',
        fontSize:'12px',
        fontWeight:'normal'
    },
    signupLink:{
        textDecoration: 'none', 
        color:'#3895D8'
    },
    accountTxt:{
        marginTop:'10px',
        fontStyle:'italic',
    },
    greenBox:{
        border:'solid rgb(36, 160, 39)',
        borderWidth:'0.5px', 
        background:'rgb(234,255,230)', 
        padding:'10px',
    },
    emailText:{
        color:'rgb(0,120,200)',
    }
};

class ActivationComplete extends Component {

    componentWillMount() {
        if (this.props.match.params.token) {
            this.props.activateUserAccount(this.props.match.params.token);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
            if (nextProps.activateUserResponse){
                if (nextProps.activateUserResponse.status === 200) {
                    errorMessage = undefined
                }
                else{
                    errorMessage =
                        <div 
                            className="errorDiv"
                        >{nextProps.activateUserResponse.message}</div>
                        this.setState({message: nextProps.activateUserResponse.message})
                        this.setState({ dialogOpen: true });
                }
            }
        }
        this.setState({showLoader:false})
    }


    cancelClick(){
        this.props.history.goBack();
    }

    resendMailClick(){
        this.props.resendVerificationMail(this.props.location.state !== undefined ? this.props.location.state.detail : undefined)
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-6 pageContainer">
                    <Paper className="pagePaper">
                        <div className="formContent">

                            <div className="logo">
                                <img src="../images/logo.png" alt="Logo" />
                            </div>
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="titleLabel">
                                    RESET YOUR PASSWORD
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        We have sent a reset password email to {emailText} 
                                        Please click the reset password link to set your new password.
                                    </div>    
                                </div>
                                <div className="row">   
                                    <div className="col-md-9 start-md">
                                        <div style={styles.accountTxt}>
                                            <span>Didn't receive the email yet?,</span>
                                            <button 
                                            type="button"
                                            onClick={this.resendMailClick.bind(this)}
                                            style={{color:'#3895D8', fontStyle:'italic', fontSize:'12px'}}
                                        > 
                                            Resend activation mail
                                        </button>
                                    </div>
                                    </div>  
                                    <div className="col-md-3 end-md bottom-md"> 
                                        <Link className="gradient-text" to='/logout'>Proceed to Login</Link>
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

const mapStateToProps = (state) => {

    return {
            activateUserResponse: state.account.activateUser,
        }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ resendVerificationMail, activateUserAccount }, dispatch)
}

export default reduxForm({
    form: 'FrmActivationComplete'
}
)(connect(mapStateToProps, mapDispatchToProps)(ActivationComplete))
