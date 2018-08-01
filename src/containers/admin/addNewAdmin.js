//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../../components/inputField';
import RaiseButton from '../../components/raiseButton';

let errorMessage

class AddAdmin extends Component {

    state = {
        status: '',
        location:''
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {

        return (
            <div>
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="appTitleLabel">
                                    ADD ADMIN
                                </div>
                                <div style={{display:'block'}}>
                                    <div style={{float:'left'}}>
                                        Admin Name
                                        <Field name="username" myLabel="Name" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                    </div>
                                    <div style={{float:'right'}}>
                                        Email Address
                                        <Field name="email" myLabel="email" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                    </div>
                                </div>
                                <div style={{display:'block'}}>
                                    <RaiseButton type="button" variant="contained" color="primary" label="Cancel"/>
                                    <RaiseButton type="button" actionLink="/manageusers" variant="contained" color='primary' label="Add"/>
                                </div>
                            </form>
                        </div>            
                    </Paper>                    
                    <div>
                        {errorMessage}
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'FrmAddAdmin'
}
)(
    connect(null, null)(AddAdmin)
)