//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';

//Validation
import {required, minimum8} from '../../utilities/validation'

//Components
import InputField from '../../components/inputField';

//Data
import Data from '../../staticData'

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      }
};

class AccountSetup extends Component {

    state = {
        boardStatus: '',
        merchanttype: '',
        termsCheckedNo: true,
        termsCheckedYes: false,
        groupCheckedNo: true,
        groupCheckedYes: false,
        loginCheckedNo: true,
        loginCheckedYes: false,
        openMCCPopUp: false,
 
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });

        if (name === "termsCheckedYes"){
            this.setState({termsCheckedNo: !event.target.checked})
        }else if (name === "termsCheckedNo"){
            this.setState({termsCheckedYes: !event.target.checked})
        }else if (name === "groupCheckedYes"){
            this.setState({groupCheckedNo: !event.target.checked})
        }else if (name === "groupCheckedNo"){
            this.setState({groupCheckedYes: !event.target.checked})
        }else if (name === "loginCheckedYes"){
            this.setState({loginCheckedNo: !event.target.checked})
        }else if (name === "loginCheckedNo"){
            this.setState({loginCheckedYes: !event.target.checked})
        }
      };

      handleMCCPopUp = () => {
        this.setState({ openMCCPopUp: true });
      };
    
      handleClose = () => {
        this.setState({ openMCCPopUp: false });
      };

    render() {

        return (
            <div style={{paddingBottom:'20px'}}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel">
                            <FormLabel component="legend">ACCOUNT SETUP</FormLabel>
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3" >
                                Boarding Status*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <InputLabel htmlFor="status-controlled-open-select"></InputLabel>
                                    <Select
                                        style={styles.selectControl}
                                        value={this.state.boardStatus}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'boardStatus',
                                            id: 'status-controlled-open-select',
                                        }}
                                    >
                                        {
                                            Data.boardingStatus.map((item) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                    </Select>    
                                </FormControl>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                    Add MCC*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field name="mccNumber" myType="number" myLabel="mccNumber" myPlaceHolder="" fullWidth={true} component={InputField} validate={required}/> 
                                <Dialog
                                    open={this.state.openMCCPopUp}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    >
                                    <DialogTitle id="alert-dialog-title">{"MCC Codes"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                        Let Google help apps determine location. This means sending anonymous location data to
                                        Google, even when no apps are running.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                        Disagree
                                        </Button>
                                        <Button onClick={this.handleClose} color="primary" autoFocus>
                                        Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog> 
                            </div>
                        </div>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">        
                                Merchant Type
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">    
                                <FormControl style={styles.formControl}>
                                        <Select
                                            style={styles.selectControl}
                                            value={this.state.merchanttype}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'merchanttype',
                                            }}
                                        >
                                        {
                                            Data.merchantType.map((item) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                        </Select>    
                                    </FormControl>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Accept Terms and Conditions
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedNo}
                                        onChange={this.handleCheckboxChange('termsCheckedNo')}
                                        value="termsCheckedNo"
                                        color="primary"
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedYes}
                                        onChange={this.handleCheckboxChange('termsCheckedYes')}
                                        value="termsCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                            {this.state.termsCheckedYes === true && this.state.termsCheckedNo === false ? (
                                <React.Fragment>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Version accepted
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field name="version" fullWidth={true} component={InputField} />  
                                    </div>
                                </React.Fragment>
                                ) : ( null
                            )}
                        </div>
                        {this.state.termsCheckedYes === true && this.state.termsCheckedNo === false ? (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Date of Acceptance
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="date" name="date" fullWidth={true} component={InputField} />  
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        IP Address
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="ipaddress" fullWidth={true} component={InputField} />  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Time
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="time" name="time" fullWidth={true} component={InputField} />  
                                    </div>
                                </div>
                            </React.Fragment>

                                ) : ( null
                            )}
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Add New Merchant to Group
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.groupCheckedNo ? true : false}
                                        onChange={this.handleCheckboxChange('groupCheckedNo')}
                                        value="groupCheckedNo"
                                        color="primary"
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.groupCheckedYes ? true : false}
                                        onChange={this.handleCheckboxChange('groupCheckedYes')}
                                        value="groupCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                            {this.state.groupCheckedYes === true && this.state.groupCheckedNo === false ? (
                                <div className="col-xs-12 col-sm-6 col-md-6">
                                    <Field name="addgroup" myPlaceHolder="ADD TO GROUPS" fullWidth={true} component={InputField} />  
                                </div>
                                ) : ( null
                            )}
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Create Login for Merchant
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.loginCheckedNo ? true : false}
                                        onChange={this.handleCheckboxChange('loginCheckedNo')}
                                        value="loginCheckedNo"
                                        color="primary"
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.loginCheckedYes ? true : false}
                                        onChange={this.handleCheckboxChange('loginCheckedYes')}
                                        value="loginCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>

                            {this.state.loginCheckedYes === true && this.state.loginCheckedNo === false ? (
                                <React.Fragment>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Merchant Username*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field  myType="text" name="merchantUsername" fullWidth={true} component={InputField} validate={required}/>  
                                    </div>
                                </React.Fragment>
                                ) : ( null
                            )}
                        </div>
                        {this.state.loginCheckedYes === true && this.state.loginCheckedNo === false ? (
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Password*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="password" name="password" fullWidth={true} component={InputField} validate={[required, minimum8]}/>  
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Confirm Password*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="password" name="confirmpassword" fullWidth={true} component={InputField} validate={required}/>  
                                    </div>
                                </div>
                                ) : ( null
                            )}
                    </div>            
                </Paper>                    
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}

export default AccountSetup