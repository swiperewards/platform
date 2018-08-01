//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'

//material-ui
import Paper from '@material-ui/core/Paper';

//Components
import InputField from '../../components/inputField';

let errorMessage

class OwnerDetails extends Component {

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
                                <div className="appTitleLabel">
                                    OWNER DETAILS
                                </div>
                                <div style={{display:'block'}}>
                                    <div style={{float:'left'}}>
                                        Business Type Name
                                        <Field name="username" myLabel="Name" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                    </div>
                                    <div style={{float:'right'}}>
                                        Legal Business Name
                                        <Field name="email" myLabel="email" myPlaceHolder="" fullWidth={false} component={InputField} />  
                                    </div>
                                </div>
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

export default OwnerDetails