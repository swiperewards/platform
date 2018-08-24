//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Validation
import {required, minimum8, dropDownRequired, ipAddressMatch} from '../../utilities/validation'

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';

//Data
import Data from '../../staticData'

let errorMessage

const passwordsMatch = (value, allValues) => 
  value !== allValues.merchantPassword ? 'Passwords don\'t match' : undefined;

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
      row: {
        fontSize:'12px',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f2f4f6',
        },
      },
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
        updatedList:Data.mccCodes, 
        mccCode:'',
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

      handleMCCPopUp = (event) => {
        event.target.blur()
        this.setState({ openMCCPopUp: true });
        this.setState({ updatedList: Data.mccCodes});
      };
    
      handleClose = () => {
        this.setState({ openMCCPopUp: false });
      };

      selectMCCCode = (code) => {
          this.setState({mccCode: code});
          this.handleClose();
      }

      onHandleSearch = (searchValue)=>{
        var filteredList

        if(searchValue.target.value === ''){
            filteredList = Data.mccCodes
        }
        else{
            const regex = new RegExp(searchValue.target.value, 'i');
            filteredList = Data.mccCodes.filter((datum) => {
              return (datum.edited_description.search(regex) > -1);
            });
        }
        
        this.setState({ updatedList: filteredList});
      }

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
                                            <Field
                                                name="boardingStatus"
                                                component={renderSelectField}
                                                fullWidth={true}
                                                onChange={this.handleChange}
                                                validate={dropDownRequired}
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
                                    </Field>    
                                </FormControl>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                    Add MCC*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    name="mccNumber" 
                                    myType="number" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={this.state.mccCode !== '' ? undefined : required} 
                                    myValue={this.state.mccCode}
                                    onFocus={this.handleMCCPopUp}
                                /> 
                                <Dialog
                                    open={this.state.openMCCPopUp}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    >
                                    <DialogTitle id="alert-dialog-title">{"MCC CODES"}</DialogTitle>
                                    <DialogContent>
                                        <Field 
                                            myType="text"  
                                            myPlaceHolder="Search Text" 
                                            name="searchBox" 
                                            fullWidth={true} 
                                            component={InputField}
                                            onChange={this.onHandleSearch}
                                        />  
                                        <List>
                                            {
                                                this.state.updatedList.map((item, index) =>{
                                                    return(
                                                    <ListItem key={index} button disableGutters divider onClick={() => this.selectMCCCode(item.mcc)}>
                                                        <ListItemText disableTypography primary={item.mcc + " - " + item.combined_description}/>
                                                    </ListItem>
                                                    )
                                                
                                                })
                                            }
                                        </List>                                    
                                        </DialogContent>
                                </Dialog> 
                            </div>
                        </div>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">        
                                Merchant Type
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">    
                                <FormControl style={styles.formControl}>
                                            <Field
                                                name="merchantType"
                                                component={renderSelectField}
                                                fullWidth={true}
                                                onChange={this.handleChange}
                                            >
                                        {
                                            Data.merchantType.map((item, index) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={index}
                                                    value={item.id}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                        </Field>    
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
                        </div>
                        {this.state.termsCheckedYes === true && this.state.termsCheckedNo === false ? (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Date of Acceptance
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="date" name="acceptanceDate" fullWidth={true} component={InputField} />  
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        IP Address
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="ipAddress" fullWidth={true} component={InputField} validate={ipAddressMatch}/>  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Time
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="time" name="acceptanceTime" fullWidth={true} component={InputField} />  
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
                                        <Field myType="password" name="merchantPassword" fullWidth={true} component={InputField} validate={[required, minimum8]}/>  
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Confirm Password*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="password" name="confirmPassword" fullWidth={true} component={InputField} validate={[required, passwordsMatch]}/>  
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

export default AccountSetup;