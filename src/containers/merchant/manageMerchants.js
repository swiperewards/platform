//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

//Components
import InputField from '../../components/inputField';
import RaiseButton from '../../components/raiseButton';

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
};

class ManageMerchants extends Component {

    state = {
        status: '',
        location:''
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {

        return (
          
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                    <div className="appTitleLabel">
                        MANAGE MERCHANT
                    </div>
                    <div className="row middle-md">
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field name="username" myPlaceholder="Name" fullWidth={true} component={InputField} />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Select
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'status',
                                    }}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Active'>Active</MenuItem>
                                    <MenuItem value='Deactivate'>Deactivate</MenuItem>
                                </Select>    
                            </FormControl>  
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Select
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'location',
                                    }}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Los Angeles'>Los Angeles</MenuItem>
                                    <MenuItem value='Washington'>Washington</MenuItem>
                                    <MenuItem value='Springfield'>Springfield</MenuItem>
                                    <MenuItem value='Franklin'>Franklin</MenuItem>
                                    <MenuItem value='Greenville'>Greenville</MenuItem>
                                    <MenuItem value='Bristol'>Bristol</MenuItem>
                                    <MenuItem value='Clinton'>Clinton</MenuItem>
                                    <MenuItem value='Fairview'>Fairview</MenuItem>
                                    <MenuItem value='Salem'>Salem</MenuItem>
                                    <MenuItem value='Madison'>Madison</MenuItem>
                                    <MenuItem value='Georgetown'>Georgetown</MenuItem>

                                </Select>    
                            </FormControl>
                        </div>    
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <RaiseButton type="submit" variant="contained" color="primary" label="Filter"/>  
                        </div>   
                        <div className="col-xs-12 col-sm-6 col-md-4 end-md">
                            <RaiseButton type="button" actionLink="/addNewMerchant" variant="contained" color='primary' label="+Add Merchant"/>
                        </div>
                    </div>
                </form>
            </Paper>       
        );
    }
}

export default reduxForm({
    form: 'FrmManageMerchant'
}
)(
    connect(null, null)(ManageMerchants)
)