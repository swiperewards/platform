//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';

//Components
import InputField from '../../components/inputField';

//Data
import Data from '../../staticData';

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

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={phoneMask}
        placeholderChar={'\u2000'}
        showMask={false}
        guide={false}
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

class BusinessDetails extends Component {

    state = {
        businesstype: '',
        stateName:'',
        creditCheckedNo: true,
        creditCheckedYes: false,
        textmask: '',
        servicePhoneMask: '',
        contactPhoneMask:'',
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleTextChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      handleCheckboxChange = name => event => {
        this.setState({[name]: event.target.checked});

        if (name === "creditCheckedYes"){
            this.setState({creditCheckedNo: !event.target.checked});
        }
        else{
            this.setState({creditCheckedYes: !event.target.checked});
        }
      };

    render() {
        const { textmask, servicePhoneMask, contactPhoneMask } = this.state;

        return (
            <div style={{paddingBottom:'20px'}}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel">
                            <FormLabel component="legend">BUSINESS DETAILS</FormLabel>
                        </div>
                        <Divider style={{marginBottom:'20px'}}/>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Business Type (e.g. LLC)*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Select
                                        style={styles.selectControl}
                                        value={this.state.businesstype}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'businesstype',
                                        }}
                                    >
                                        {
                                            Data.businessType.map((item) =>{
                                               return <MenuItem 
                                               style={styles.selectControl}
                                               key={item.id}
                                               value={item.prefix}>
                                               {item.name.toUpperCase()}
                                               </MenuItem>
                                            })
                                        }
                                    </Select>    
                                </FormControl>  
                            </div>  
                        </div>
                        {
                            this.state.businesstype !== "0" ?(
                                <div className="row middle-md">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Legal Business Name*
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="businessName" fullWidth={true} component={InputField} />  
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                DBA - Statement Descriptor
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="text" name="dba" fullWidth={true} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Tax ID Number*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Input
                                    className="inputControl"
                                    name="taxId" 
                                    mask={phoneMask}
                                    value={textmask}
                                    onChange={this.handleTextChange('textmask')}
                                    inputComponent={TextMaskCustom}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Customer Service Phone
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Input
                                    className="inputControl"
                                    name="servicePhone" 
                                    value={servicePhoneMask}
                                    onChange={this.handleTextChange('servicePhoneMask')}
                                    inputComponent={TextMaskCustom}
                                />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Years in Business*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="text" name="businessPeriod" fullWidth={true} component={InputField} />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Website*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field myType="text" name="website" fullWidth={true} component={InputField} />  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Currently accept credit cards
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
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
                                <div className="col-xs-12 col-sm-6 col-md-3">
                                        Annual CC Sales*
                                </div>    
                                <div className="col-xs-12 col-sm-6 col-md-3">
                                    <Field myType="number" name="phone" fullWidth={true} component={InputField} />  
                                </div>
                                </React.Fragment>
                                ) : ( null
                            )}
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Phone*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Input
                                    className="inputControl"
                                    name="taxId" 
                                    value={contactPhoneMask}
                                    onChange={this.handleTextChange('contactPhoneMask')}
                                    inputComponent={TextMaskCustom}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Fax
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field myType="number" name="fax" fullWidth={true} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Address*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="text" name="address" fullWidth={true} component={InputField} />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Address 2
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field myType="text" name="address2" fullWidth={true} component={InputField} />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                City*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="text" name="city" fullWidth={true} component={InputField} />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                State*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <FormControl style={styles.formControl}>
                                    <Select
                                        style={styles.selectControl}
                                        value={this.state.stateName}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'stateName',
                                        }}
                                    >
                                        {
                                            Data.states.map((item) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.prefix}>
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
                                Zip*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field myType="number" name="zip" fullWidth={true} component={InputField} />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Email*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <Field myType="text" name="email" fullWidth={true} component={InputField} />  
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