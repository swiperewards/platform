//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'
import OverLayMessage from '../../components/overlayMessage';
import DealList from '../../containers/deals/dealList';

//Actions
import { getUserProfile } from '../../actions/accountAction';
import { getDealsListWithFilter, deleteDeal, getDealDetails, getCitiesList } from '../../actions/dealAction';

//Data
import Data from '../../staticData';

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
};

class ManageDeals extends Component {

    state = {
        name:'',
        status: '',
        location:'',
        fromDate:'',
        toDate:'',
        citiesList:'',
        disableReset: true,
    };

    componentWillMount()
    {
        if(this.props.userData.user.responseData.token){
            this.props.getCitiesList(this.props.userData.user.responseData.token)
        }

        if(this.props.userData.user.responseData.role === 'merchant'){
            const profileMerchantId = this.props.userProfile === undefined ? null : this.props.userProfile.responseData.merchantId
            if(this.props.userData.user.responseData.token && profileMerchantId === null){
                this.setState({showLoader:true})
                this.props.getUserProfile(this.props.userData.user.responseData.token);
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
    
          if(nextProps.citiesPayload){
            if(nextProps.citiesPayload.status === 200){
                this.setState({citiesList:nextProps.citiesPayload.responseData})
            }
          }

          if(nextProps.userProfile){
            this.setState({showLoader:false})
            if(nextProps.userProfile.status === 200){
                if(nextProps.userProfile.responseData){
                    if(nextProps.userProfile.responseData.merchantId === null){
                        this.setState({showOverlay:true});
                    }
                }
            }
          }
        }
    }

    //Method to handle change event for dropdown
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        if(this.state.name !=="" || this.state.status !=="" || this.state.location !=="" || this.state.fromDate !== "" || this.state.toDate !== ""){
            this.setState({disableReset: true});
        }
        else{
            this.setState({disableReset:false});
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    onHandleSearch(){
        this.child.searchHandler();
    }

    addNewDeal(){
        if(this.props.userData.user.responseData.merchantId !== null){
            this.props.history.push({pathname:'/addNewDeal',state: { detail: this.props.userData.user.responseData.merchantId }})
        }else{
            this.props.history.push('/merchantList')
        }
    }

    onHandleReset(){
        this.setState({name:''});
        this.setState({status:''});
        this.setState({location:''});
        this.setState({disableReset:true});
        this.props.reset();
        this.child.resetHandler();
    }

    render() {

        return (
          <div className="row">
            <div className="col-xs-12">
            <Loader status={this.state.showLoader} />
            <OverLayMessage 
                status={this.state.showOverlay} 
                history={this.props.history}
            />

            <div className="row">
            <div className="col-xs-12">
            <Paper className="pagePaper">
                <form size='large' className="form-horizontal">
                    <div className="row appTitleLabel">
                        MANAGE DEALS
                    </div>
                    <div className="row middle-md">
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            type="text"
                            name="name" 
                            myPlaceHolder="Name" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Field
                                    name="status"
                                    component={renderSelectField}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>
                                        Status
                                    </MenuItem>
                                    {
                                    Data.dealStatus.map((item) =>{
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
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <FormControl style={styles.formControl}>
                                <Field
                                    name="location"
                                    component={renderSelectField}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>
                                        Location
                                    </MenuItem>
                                    {
                                        (this.state.citiesList) ? 
                                            this.state.citiesList.map((item) =>{
                                            return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            })
                                        : null    
                                    }
                                </Field>    
                            </FormControl>  
                        </div>    
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            myType="date"
                            name="fromDate" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <Field 
                            myType="date"
                            name="toDate" 
                            myPlaceHolder="To Date" 
                            fullWidth={true} 
                            component={InputField} 
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-1">
                            <button 
                                type="button"
                                onClick={this.onHandleReset.bind(this)}
                                style={{backgroundColor:'#BCBCBC'}}
                                disabled={this.state.disableReset}
                                className={this.state.disableReset ? "disabledButton button" : "enabledButton button"}
                                > Reset
                            </button>
                            <button 
                                type="button"
                                onClick={this.onHandleSearch.bind(this)}
                                className="button"
                                > Filter
                            </button> 
                        </div>        
                        <div className="col-xs-12 col-sm-6 col-md-1 end-md">
                            <Button 
                            variant="fab"
                            type="button"
                            color="primary"
                            onClick={this.addNewDeal.bind(this)}
                            style={{backgroundColor:'#27A24F'}}
                            > <AddIcon /></Button> 
                        </div>
                    </div>
                </form>
            </Paper> 
            </div>
            </div>

             <DealList 
                name={this.state.name}
                status={this.state.status}
                location={this.state.location} 
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                history={this.props.history}
                onRef={ref => (this.child = ref)} 
            />
        </div> 
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDealsListWithFilter, deleteDeal, getUserProfile, getDealDetails, getCitiesList }, dispatch)
  }
  
  ManageDeals = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      dealsPayload: state.deal.dealList === undefined ? undefined : state.deal.dealList,
      dealDelete: state.deal.deleteDeal === undefined ? undefined : state.deal.deleteDeal,
      userProfile: state.account.userProfile === undefined ? undefined : state.account.userProfile, 
      citiesPayload: state.deal.citiesList === undefined ? undefined : state.deal.citiesList,
    }),
    mapDispatchToProps,
  )(ManageDeals)
  
  export default reduxForm({form: 'FrmManageDeals'})(ManageDeals)