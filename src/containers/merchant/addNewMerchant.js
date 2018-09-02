//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import DialogBox from '../../components/alertDialog'


//Containers
import BusinessDetails from '../../containers/merchant/merchantBusinessDetails';
import OwnerDetails from '../../containers/merchant/merchantOwnerDetails';
import AccountSetup from '../../containers/merchant/merchantAccountSetup';
import BankAccount from '../../containers/merchant/merchantBankAccount';

//Components
import Loader from '../../components/loader'

//Actions
import { addNewMerchant, ClearMerchantState } from '../../actions/merchantAction';

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

  let errorMessage

class AddMerchant extends Component {

    state = {
        status: '',
        location:'',
        activeStep: 0,
        open: false,
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
        const steps = getSteps();
        const { activeStep } = this.state;
        if (activeStep < steps.length-1){
          this.setState({
            activeStep: activeStep + 1,
          });
        }
        else{
          this.setState({showLoader:true})
          this.props.addNewMerchant(values, this.props.userData.user.responseData.token)
        }
      }

      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/managemerchants');
      };

    componentWillMount()
    {
        //to clear old payment state
        this.props.ClearMerchantState();
        this.setState({open: false});
        errorMessage="";
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps) {
        if (nextProps.merchantPayload){
          if(nextProps.merchantPayload.data){
            if(nextProps.merchantPayload.data.status === 200){
                errorMessage = <div></div>
                this.handleClickOpen()
            }
            else{
              if(nextProps.merchantPayload.data.status === 1082){
                errorMessage =
                nextProps.merchantPayload.data.responseData.map((error, index) =>
                    <div key={index} style={{
                        padding: '5px 20px',
                        margin: '5px',
                        marginBottom: '10px',
                        fontSize: 13,
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderRadius: '5px',
                        color: '#86181d',
                        backgroundColor: '#ffdce0',
                        borderColor: 'rgba(27, 31, 35, 0.15)',
                        textAlign: 'center'
                    }}>
                      {error.field + ' : ' + error.msg}
                    </div >
                  )
                }
                else{
                  //TODO: Handle error condition
                }
            }
          }
        }
      }
      this.setState({showLoader:false})
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const actions = [
          <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
          </Button>
        ];
        return (
            <div>
                <Loader status={this.state.showLoader} />
                <div>
                  <DialogBox 
                      displayDialogBox={this.state.open} 
                      message="Congratulations! You've successfully created a new merchant account." 
                      actions={actions} 
                  />
                </div> 
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                            <form size='large' className="form-horizontal" autoComplete="off" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="appTitleLabel">
                                  <FormLabel component="legend">ADD MERCHANT</FormLabel>
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
                                       {
                                          getStepContent(activeStep)
                                        }
                                    {this.state.activeStep === steps.length-1 ? (
                                        <div>
                                            <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}>
                                                Back
                                            </Button>
                                            <Button 
                                              type="submit"  
                                              variant="contained" 
                                              color='primary' 
                                              className={classNames(classes.margin, classes.bootstrapRoot)}
                                              onClick={this.props.handleSubmit((event) => this.onSubmit(event))}
                                              >
                                                 ADD NEW MERCHANT
                                            </Button>
                                        </div>
                                    ) : (                                            
                                        <div>
                                            <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}>
                                                Back
                                            </Button>
                                            <Button type="submit" variant="contained" color='primary' className={classNames(classes.margin, classes.bootstrapRoot)}>
                                                 Next
                                            </Button>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addNewMerchant, ClearMerchantState }, dispatch)
}

AddMerchant = connect(
  state => ({
    userData: state.account === undefined ? undefined : state.account,
    merchantPayload: state.merchant === undefined ? undefined : state.merchant
  }),
  mapDispatchToProps,
)(AddMerchant)

export default reduxForm({form: 'FrmAddMerchant'})(withStyles(styles)(AddMerchant))