//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';

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
                            <FormLabel component="legend">ADD BANK ACCOUNT</FormLabel>
                        </div>
                        <Divider style={{marginBottom:'20px'}}/>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3" >
                                Bank Account Type*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Select
                                        style={styles.selectControl}
                                        value={this.state.account}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'account',
                                        }}
                                    >
                                        {
                                            Data.bankAccountType.map((item) =>{
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
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Bank Routing Number*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="text" name="routeNumber" fullWidth={true} component={InputField} />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Bank Account Number*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field myType="text" name="accountNumber" fullWidth={true} component={InputField} />  
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