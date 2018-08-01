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

//Components
import InputField from '../../components/inputField';

let errorMessage

const styles = {
    formControl: {
        minWidth: 180,
        marginLeft:'0px',
      },
};

class AccountSetup extends Component {

    state = {
        boardStatus: '',
        merchanttype: '',
        termsCheckedNo: true,
        termsCheckedYes: false,
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render() {

        return (
            <div style={{paddingBottom:'20px'}}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel">
                            ACCOUNT SETUP
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-md-3" >
                                Boarding Status
                            </div>    
                            <div className="col-md-3">
                                <FormControl style={styles.formControl}>
                                    <InputLabel htmlFor="status-controlled-open-select"></InputLabel>
                                    <Select
                                        value={this.state.boardStatus}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'boardStatus',
                                            id: 'status-controlled-open-select',
                                        }}
                                    >
                                        <MenuItem value='notReady'>Not Ready</MenuItem>
                                        <MenuItem value='boardImmediately'>Board Immediately</MenuItem>
                                    </Select>    
                                </FormControl>  
                            </div>
                            <div className="col-md-3">
                                    Add MCC
                            </div>
                            <div className="col-md-3">
                                <Field name="mccNumber" myLabel="mccNumber" myPlaceHolder="" minWidth="150px" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row end-md">
                            <div className="col-sm-3 col-md-3 start-md">        
                                Merchant Type
                            </div>
                            <div className="col-sm-3 col-md-3 start-md">    
                                <FormControl style={styles.formControl}>
                                        <InputLabel htmlFor="merchanttype-controlled-open-select"></InputLabel>
                                        <Select
                                            value={this.state.merchanttype}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'merchanttype',
                                                id: 'merchanttype-controlled-open-select',
                                            }}
                                        >
                                            <MenuItem value='none'>None</MenuItem>
                                            <MenuItem value='grocery'>Grocery/Food Market</MenuItem>
                                            <MenuItem value='mail'>Mail/Telephone Order</MenuItem>
                                            <MenuItem value='retail'>Retail</MenuItem>
                                            <MenuItem value='fuel'>Fuel</MenuItem>
                                            <MenuItem value='servicestation'>Service Stations</MenuItem>
                                            <MenuItem value='restaurants'>Restaurants & Food</MenuItem>
                                            <MenuItem value='ecommerce'>E-Commerce</MenuItem>
                                        </Select>    
                                    </FormControl>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Accept Terms and Conditions
                            </div>
                            <div className="col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedNo ? true : false}
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
                                        checked={this.state.termsCheckedYes ? true : false}
                                        onChange={this.handleCheckboxChange('termsCheckedYes')}
                                        value="termsCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Add New Merchant to Group
                            </div>
                            <div className="col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedNo ? true : false}
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
                                        checked={this.state.termsCheckedYes ? true : false}
                                        onChange={this.handleCheckboxChange('termsCheckedYes')}
                                        value="termsCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Create Login for Merchant
                            </div>
                            <div className="col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.termsCheckedNo ? true : false}
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
                                        checked={this.state.termsCheckedYes ? true : false}
                                        onChange={this.handleCheckboxChange('termsCheckedYes')}
                                        value="termsCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                        </div>
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