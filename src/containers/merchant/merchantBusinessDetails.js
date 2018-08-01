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

class BusinessDetails extends Component {

    state = {
        businesstype: '',
        creditCheckedNo: true,
        creditCheckedYes: false,
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
                            BUSINESS DETAILS
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-md-3" >
                                Business Type (e.g. LLC)
                            </div>    
                            <div className="col-md-8">
                                <FormControl style={styles.formControl}>
                                    <InputLabel htmlFor="type-controlled-open-select"></InputLabel>
                                    <Select
                                        value={this.state.businesstype}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'businesstype',
                                            id: 'type-controlled-open-select',
                                        }}
                                    >
                                        <MenuItem value='sole'>SOLE</MenuItem>
                                        <MenuItem value='corp'>CORP</MenuItem>
                                        <MenuItem value='llc'>LLC</MenuItem>
                                        <MenuItem value='partner'>PARTNER</MenuItem>
                                        <MenuItem value='nonprofit'>NONPROFIT</MenuItem>
                                        <MenuItem value='gov'>GOV</MenuItem>

                                    </Select>    
                                </FormControl>  
                            </div>  
                        </div>
                        {
                            this.state.businesstype !== "sole" ?(
                                <div className="row middle-md">
                                    <div className="col-sm-3 col-md-3">
                                        Legal Business Name
                                    </div>
                                    <div className="col-sm-9 col-md-9">
                                        <Field name="businessName" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                DBA - Statement Descriptor
                            </div>
                            <div className="col-sm-9 col-md-9">
                                <Field name="dba" myLabel="" myPlaceHolder=""  fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Tax ID Number
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="taxId" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Customer Service Phone
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="servicePhone" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Years in Business
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="businessPeriod" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Website
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="website" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Currently accept credit cards
                            </div>
                            <div className="col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.creditCheckedNo}
                                        onChange={this.handleCheckboxChange('creditCheckedNo')}
                                        value="creditCheckedNo"
                                        color="primary"
                                        />
                                    }
                                    label="No"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.creditCheckedYes}
                                        onChange={this.handleCheckboxChange('creditCheckedYes')}
                                        value="creditCheckedYes"
                                        color="primary"
                                        />
                                    }
                                    label="Yes"
                                />
                            </div>
                            {this.state.creditCheckedYes === true && this.state.creditCheckedNo === false ? (
                                <React.Fragment>
                                <div className="col-sm-3 col-md-3">
                                        Annual CC Sales
                                </div>    
                                <div className="col-sm-3 col-md-3">
                                    <Field name="phone" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                </div>
                                </React.Fragment>
                                ) : ( null
                            )}
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Phone
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="phone" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Fax
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="fax" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Address
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="address" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Address 2
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="address2" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                City
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="city" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                State
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="state" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-sm-3 col-md-3">
                                Zip
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <Field name="zip" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
                            </div>
                            <div className="col-sm-3 col-md-3">
                                Email
                            </div>
                            <div className="col-sm-3 col-md-3">    
                                <Field name="email" myLabel="" myPlaceHolder="" fullWidth={false} component={InputField} />  
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

export default BusinessDetails