//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

//Components
import InputField from '../../components/inputField';
import RaiseButton from '../../components/raiseButton';
import TableGridView from '../../components/tableGrid';

let errorMessage

const styles = {
    formControl: {
        minWidth: 120,
        marginLeft:'25px',
      },
};

class ManageAdmins extends Component {

    state = {
        status: '',
        location:''
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    onSubmitAddAdmin() {
        console.log("Add New Admin");
    }

    onFilterClick(){
        console.log("On Filter Click");
    }

    render() {

        return (
            <div>
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="appTitleLabel">MANAGE ADMIN
                                </div>
                                <div style={{position:'relative', margin:'0px', width:'100%'}}>
                                    <div style={{float:'left'}}>
                                        <Field name="username" myLabel="Name" myPlaceHolder="Name" fullWidth={false} component={InputField} />
                                        <FormControl style={styles.formControl}>
                                            <InputLabel htmlFor="status-controlled-open-select">Status</InputLabel>
                                            <Select
                                                value={this.state.status}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'status',
                                                    id: 'status-controlled-open-select',
                                                }}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='Active'>Active</MenuItem>
                                                <MenuItem value='Deactivate'>Deactivate</MenuItem>
                                            </Select>    
                                        </FormControl>
                                       <RaiseButton type="button" handleAction={this.onFilterClick()} variant="contained" color="primary" label="Filter"/>
                                     </div>               
                                </div> 
                                <div style={{float:'right', padding:'5px'}}>
                                        <RaiseButton type="button" actionLink="/addNewAdmin" variant="contained" color='primary' label="+Add Admin"/>
                                </div> 
                            </form>
                        </div>            
                    </Paper>
                        <TableGridView />
                    <div>
                        {errorMessage}
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'FrmManageAdmin'
}
)(
    connect(null, null)(ManageAdmins)
)