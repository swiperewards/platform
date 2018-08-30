//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Components
import InputField from '../components/inputField';
import RenderCheckbox from '../components/renderCheckbox';

//Action

//Validation
import {required, minimum8} from '../utilities/validation'

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
      bigAvatar: {
        width: 60,
        height: 60,
      }
};

const passwordsMatch = (value, allValues) => 
  value !== allValues.password ? 'Passwords don\'t match' : undefined;

class UserProfile extends Component {

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

      //Enables "Public Company" option if not following cases
      renderSwitch(param) {
        switch(param) {
          case '0':
            return true;
          case '5':
            return true;  
          case '6':
            return true;
          default:
            return false;
        }
      }

    componentWillMount() {

    }

      onSubmit(values) {

        console.log(values);
      }

    render() {
        return (
            <div style={{paddingBottom:'20px'}}>
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-12">
                            <FormLabel component="legend">EDIT PROFILE</FormLabel>
                            </div>                            
                        </div>

                        <Divider style={{marginBottom:'20px'}}/>
                        <div className="row center-xs">
                            <div className="col-xs-1">
                                <Avatar src={this.props.userData.user.responseData.profilePicUrl} style={styles.bigAvatar} />
                            </div>
                        </div>
                        <Divider style={{marginBottom:'20px'}}/>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Name
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="userName" 
                                    fullWidth={true} 
                                    component={InputField} 
                                /> 
                            </div>  
                        </div>   
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Email ID
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="userEmail" 
                                    fullWidth={true} 
                                    component={InputField} 
                                />  
                            </div>
                        </div>
                        <div className="row end-xs start-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Field 
                                            name="updatePassword" 
                                            id="updatePassword" 
                                            myStyle={styles} 
                                            component={RenderCheckbox} 
                                        />
                                    }
                                    label="Updated Password"
                                />
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                New Password
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    name="password" 
                                    myType="password" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={[required, minimum8]} 
                                />
                            </div>
                        </div>
                        <div className="row middle-md">                            
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Confirm Password
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    name="confirmPassword" 
                                    myType="password" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={[required, passwordsMatch]} 
                                />
                            </div>
                        </div>
                        <div className="row start-xs">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <button 
                                    type="submit"
                                    className="button"
                                    > Update
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


UserProfile = reduxForm({
    form: 'frmUserProfile',
    enableReinitialize: true,
})(UserProfile)

UserProfile = connect(
    state => ({
        userData: state.account === undefined ? undefined : state.account,
    }),
  )(UserProfile)

export default UserProfile;