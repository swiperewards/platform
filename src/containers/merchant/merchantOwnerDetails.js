//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';

//Components
import InputField from '../../components/inputField';

//Data
import Data from '../../staticData';

let errorMessage

const styles = {
    root: {
      width: '100%',
    },
    heading: {
        fontSize: '14px',
        fontWeight: 'bold',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
    },
    selectControl:{
        fontSize: '12px',
    }
  };

class OwnerDetails extends Component {

    state = {
        account: '',
        name: '',
        stateName: '',
        dlStateName: '',
        shareholders: [{name:''}],
        expanded: null,
      };

      handleShareholderNameChange = (idx) => (evt) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, name: evt.target.value };
        });
    
        this.setState({ shareholders: newShareholders });
      }
    
      handleSubmit = (evt) => {
        const { name, shareholders } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
      }
    
      handleAddShareholder = () => {
        this.setState({
          shareholders: this.state.shareholders.concat([{ name: '' }])
        });
      }
    
      handleRemoveShareholder = (idx) => () => {
        this.setState({
          shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });
      }

      handlePanelChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {

        const { expanded } = this.state;

        return (
            <div style={{paddingBottom:'20px'}}>
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="row">

                            <div className="appTitleLabel col-md-2">
                                <FormLabel component="legend">OWNERS DETAILS</FormLabel>
                            </div>
                            <div className="appDescriptionLabel col-md-10">
                                Please submit all owners with at least 25% ownership in the company. Public companies, submit an executive officer
                            </div> 
                        </div>
                        <Divider style={{marginBottom:'20px'}} />

                        {this.state.shareholders.map((shareholder, idx) => (
                            <React.Fragment>
                            <div style={styles.root}>
                            <ExpansionPanel key={idx} expanded={expanded === 'panel'+idx+1} onChange={this.handlePanelChange('panel'+idx+1)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography style={styles.heading}>{idx === 0 ? "Primary Owner" : "Additional Owner"}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Paper style={{width:'100%', padding:'15px'}}>

                                        <div className="row middle-md">
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                First Name*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <Field myType="text" name="firstname" fullWidth={true} component={InputField} />  
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                Last Name*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                                <Field myType="text" name="lastname" fullWidth={true} component={InputField} />  
                                            </div>
                                        </div>
                                        <div className="row middle-md">
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                DOB(mm-dd-yyyy)*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <Field myType="date" name="dob" fullWidth={true} component={InputField} />  
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                SSN*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                                <Field myType="number" name="ssn" fullWidth={true} component={InputField} />  
                                            </div>
                                        </div>
                                        <div className="row middle-md">
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                            Business Title*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <Field myType="text" name="businesstitle" fullWidth={true} component={InputField} />  
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                OwnerShip %*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                                <Field myType="number" name="ownership" fullWidth={true} component={InputField} />  
                                            </div>
                                        </div>
                                        <div className="row middle-md">
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                Driver License
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <Field myType="text" name="license" fullWidth={true} component={InputField} />  
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                DL State
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                                <FormControl style={styles.formControl}>
                                                    <Select
                                                        style={styles.selectControl}
                                                        value={this.state.dlStateName}
                                                        onChange={this.handleChange}
                                                        inputProps={{
                                                            name: 'dlStateName',
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
                                                <button type="button" onClick={this.handleAddShareholder} className="small">COPY FROM BUSINESS</button>           
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
                                                <Field name="text" fullWidth={true} component={InputField} />  
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
                                        </div>
                                        <div className="row middle-md">
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                Email*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <Field myType="email" name="email" fullWidth={true} component={InputField} />  
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                Phone*
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                                <Field name="number" fullWidth={true} component={InputField} />  
                                            </div>
                                        </div>
                                    </Paper>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            </div>
                            
                            </React.Fragment>
                        ))}
                    </div> 
                    
                    <button type="button" onClick={this.handleAddShareholder} className="small">+ Add additional owner</button>           
                </Paper>                    
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}

export default OwnerDetails