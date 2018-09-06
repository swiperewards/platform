//react-redux
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

//redux-form
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';

import {resendVerificationMail} from '../../actions/accountAction';
import { appName } from '../../app.config';

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
        textAlign:'center',
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

class AccountActivate extends Component {

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
                                    THANK YOU FOR REGISTERING WITH {appName}.
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={styles.greenBox}>
                                            <img src="../images/greenTick.png" alt="" style={{paddingRight:'10px'}} />
                                            <span>An e-mail with a link to activate your account has been sent to</span> <span style={styles.emailText}>{this.props.location.state !== undefined ? this.props.location.state.detail : undefined}</span>
                                        </div>
                                    </div>    
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        To activate your account with {appName}, click the link contained in the email.
                                        Note that it might take few minutes for email to reach your inbox.
                                    </div>    
                                </div>
                                <div className="row">
                                    <div className="col-md-9 start-md">
                                        <div style={styles.accountTxt}>
                                            <span>If you not got any mail,</span>
                                            <button 
                                            type="button"
                                            onClick={this.resendMailClick.bind(this)}
                                            style={{color:'#3895D8', fontStyle:'italic'}}
                                        > 
                                        Resend activation link
                                        </button>
                                        
                                        </div>
                                    </div>    
                                    <div className="col-md-3 end-md"> 
                                        <button 
                                            type="button"
                                            className="button"
                                            onClick={this.cancelClick.bind(this)}
                                        > 
                                        CLOSE
                                        </button>
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ resendVerificationMail }, dispatch)
}

export default reduxForm({
    form: 'FrmAccountActivate'
}
)(connect(null, mapDispatchToProps)(AccountActivate))
