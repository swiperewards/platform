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

//Components
import InputField from '../../components/inputField';

let errorMessage

const styles = {
    formControl: {
        minWidth: 180,
        marginLeft:'0px',
      },
};

class BankAccount extends Component {

    state = {
        account: '',
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {

        return (
            <div style={{paddingBottom:'20px'}}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel">
                            ADD BANK ACCOUNT
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-md-3" >
                                Bank Account Type
                            </div>    
                            <div className="col-md-8">
                                <FormControl style={styles.formControl}>
                                    <InputLabel htmlFor="account-controlled-open-select"></InputLabel>
                                    <Select
                                        value={this.state.account}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'account',
                                            id: 'account-controlled-open-select',
                                        }}
                                    >
                                        <MenuItem value='Checking'>Checking</MenuItem>
                                        <MenuItem value='Savings'>Savings</MenuItem>
                                        <MenuItem value='Corporate Checking'>Corporate Checking</MenuItem>
                                        <MenuItem value='Corporate Savings'>Corporate Savings</MenuItem>
                                    </Select>    
                                </FormControl>  
                            </div>  
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Bank Routing Number
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="routeNumber" myLabel="routingNumber" myPlaceHolder="" minWidth="150px" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Bank Account Number
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="accountNumber" myLabel="accountNumber" myPlaceHolder="" minWidth="150px" fullWidth={false} component={InputField} />  
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

export default BankAccount