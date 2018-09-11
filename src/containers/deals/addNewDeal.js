//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';

//Components
import DialogBox from '../../components/alertDialog'
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'

//Actions
import { getMerchantDetailsAPI, updateMerchantDetails } from '../../actions/merchantAction';
import { addNewDeal } from '../../actions/dealAction';

//Validation
import {required, dropDownRequired} from '../../utilities/validation'

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

class AddNewDeal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            message:'',
        }
    }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps) {
          if (nextProps.newDealResponse){
            this.setState({showLoader:false})
            if(nextProps.newDealResponse.status === 200){
                this.setState({message: nextProps.newDealResponse.message})
                this.setState({ dialogOpen: true });
            }
            else{
                errorMessage =
                            <div 
                                className="errorDiv"
                            >{nextProps.newDealResponse.message}</div>
            }
          }
        }
    }

    componentWillMount() {

        if(this.props.userData.user.responseData.token && this.props.merchant){
            this.props.getMerchantDetailsAPI(this.props.merchant, this.props.userData.user.responseData.token)
        }
    } 

      onSubmit(values) {

        if(this.props.userData.user.responseData.token){
            let merchantId = this.props.location.state !== undefined ? this.props.location.state.detail : undefined
            if(merchantId !== undefined){
                this.setState({showLoader:true})
                this.props.addNewDeal(values, merchantId, this.props.userData.user.responseData.token)
            }
        }
      }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.props.history.push('/managedeals');
    };


    cancelClick(){
        this.props.history.goBack();
    }

    render() {
        const {  dialogOpen } = this.state;

        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        return (
            <div style={{paddingBottom:'20px'}}>
                <Loader status={this.state.showLoader} />
                <DialogBox 
                        displayDialogBox={dialogOpen} 
                        message={this.state.message} 
                        actions={actions} 
                />  
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-12">
                            <FormLabel component="legend">ADD DEAL</FormLabel>
                            </div>                            
                        </div>

                        <Divider style={{marginBottom:'20px'}}/>

                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Merchant Id
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                {this.props.location.state !== undefined ? this.props.location.state.detail : undefined}
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Location
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Field
                                        name="location"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        validate={dropDownRequired}
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
                                    </Field>    
                                </FormControl>  
                            </div>  
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                From Date*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="date" 
                                    name="fromDate" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                    />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Cash Bonus (%)*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="cashBonus" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                To Date*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="date" 
                                    name="toDate" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                    />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Status*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <FormControl style={styles.formControl}>
                                        <Field
                                            name="status"
                                            component={renderSelectField}
                                            fullWidth={true}
                                            onChange={this.handleChange}
                                            validate={dropDownRequired}
                                        >
                                        {
                                            Data.searchStatus.map((item) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                    </Field>    
                                </FormControl>  
                            </div>
                        </div> 
                        <div className="row end-xs">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <button 
                                    type="button"
                                    style={{backgroundColor:'#BCBCBC'}}
                                    className="enabledButton button"
                                    onClick={this.cancelClick.bind(this)}
                                    > Cancel
                                </button>

                                <button 
                                    type="submit"
                                    className="button"
                                    > Add
                                </button> 
                            </div>
                        </div>                       
                    </div>            
                </Paper> 
                </form>
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMerchantDetailsAPI, updateMerchantDetails, addNewDeal }, dispatch)
  }

  AddNewDeal = reduxForm({
    form: 'frmAddNewDeal',
})(AddNewDeal)

AddNewDeal = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
       newDealResponse: state.deal === undefined ? undefined : state.deal.addDeal 
    }),
    mapDispatchToProps,
  )(AddNewDeal)

export default AddNewDeal;