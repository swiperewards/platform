//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';

//Components
import BusinessList from '../../containers/business/businessList'

//Actions
import { getMerchantListWithFilter, deleteMerchant } from '../../actions/merchantAction';

class PaymentProcessing extends Component {

    state = {
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        permissionDisplayBox: false,
        disableReset: true,
        merchantId:'',
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.setState({ permissionDisplayBox: false });
    };

    addNewMerchant(){
        this.props.history.push('/addNewMerchant')
    }

    render() {

        return (
          <div>
            <div className="row">
                <div className="col-xs-12">
                    <Paper className="pagePaper">
                        <div className="row middle-md">
                            <div className="col-md-12">
                                <div className="appTitleLabel">
                                    Payment Processing Application
                                </div>
                            </div>
                        </div>        
                        <div className="row middle-md">
                            <div className="col-md-12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>    
                        </div>
                        <div className="row center-md">
                            <div className="col-md-12">
                                <button 
                                    type="submit"
                                    className="button"
                                    onClick={this.addNewMerchant.bind(this)}
                                    > REGISTER
                                </button> 
                            </div>
                        </div>
                    </Paper> 
                </div>
            </div>        

            <div className="row">
                <div className="col-xs-12">
                    <Paper className="pagePaper">
                        <div className="row middle-md">
                            <div className="col-md-12">
                                <div style={{color:"red"}}>
                                    Disclaimer
                                </div>
                            </div>    
                        </div>        
                        <div className="row middle-md">
                            <div className="col-md-12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>    
                        </div>
                    </Paper> 
                </div>
            </div>

            <BusinessList 
                userId={this.props.userData.user.responseData.userId} 
                name={this.state.name}
                status={this.state.status}
                location={this.state.location} 
                history={this.props.history}
                onRef={ref => (this.child = ref)} 
            />
           </div> 
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMerchantListWithFilter, deleteMerchant }, dispatch)
  }
  
  PaymentProcessing = connect(
    state => ({
      userData: state.accountValidate === undefined ? undefined : state.accountValidate,
      merchantPayload: state.merchant.merchantList === undefined ? undefined : state.merchant.merchantList,
      merchantDelete: state.merchant.deleteMerchant === undefined ? undefined : state.merchant.deleteMerchant
    }),
    mapDispatchToProps,
  )(PaymentProcessing)
  
  export default reduxForm({form: 'FrmPaymentProcessing'})(PaymentProcessing)