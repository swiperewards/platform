//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

//material-ui
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Containers
import BusinessDetails from '../../containers/merchant/merchantBusinessDetails';
import OwnerDetails from '../../containers/merchant/merchantOwnerDetails';
import AccountSetup from '../../containers/merchant/merchantAccountSetup';
import BankAccount from '../../containers/merchant/merchantBankAccount';

let errorMessage

const styles = theme => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    bootstrapRoot: {
    borderRadius: 1,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '14px',
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#53c1ff',
    borderColor: '#53c1ff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  });

  function getSteps() {
    return ['About the Business', 'About the Owners', 'Account Setup', 'Add Bank Account'];
  }
  
  //Function to navigate to respective step based on active index
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<BusinessDetails />);
      case 1:
        return (<OwnerDetails />);
      case 2:
        return (<AccountSetup />);
      case 3:
        return (<BankAccount />);
      default:
        return 'Uknown stepIndex';
    }
  }

  
class AddMerchant extends Component {

    state = {
        status: '',
        location:'',
        activeStep: 0
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
          activeStep: activeStep + 1,
        });
      };
    
      handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
          activeStep: activeStep - 1,
        });
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };

      onSubmit(values) {

      }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="appTitleLabel">
                                    ADD MERCHANT
                                </div>

                                <div className={classes.root}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map(label => {
                                        return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                        );
                                    })}
                                    </Stepper>
                                    <div>
                                    {this.state.activeStep === steps.length ? (
                                        <div>
                                        <Typography className={classes.instructions}>All steps completed</Typography>
                                        <Button onClick={this.handleReset}>Reset</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            {
                                                getStepContent(activeStep)
                                            }
                                        <div>
                                            <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}
                                            >
                                            Back
                                            </Button>
                                            <Button variant="contained" color='primary' onClick={this.handleNext} className={classNames(classes.margin, classes.bootstrapRoot)}>
                                                {activeStep === steps.length - 1 ? 'ADD NEW MERCHANT' : 'Next'}
                                            </Button>
                                        </div>
                                        </div>
                                    )}
                                    </div>
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

AddMerchant.propTypes = {
    classes : PropTypes.object,
}

export default reduxForm({form: 'FrmAddMerchant',})(withStyles(styles)(AddMerchant))


// export default reduxForm({
//     form: 'FrmAddMerchant',})
// (
//     connect(null, null)(AddMerchant)
// )