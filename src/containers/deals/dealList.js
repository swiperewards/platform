//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'

//material-ui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

//Components
import TablePaginationActions from '../../components/tableGrid';
import DialogBox from '../../components/alertDialog'
import Loader from '../../components/loader'

//Actions
import { getUserProfile } from '../../actions/accountAction';
import { getDealsListWithFilter, deleteDeal, getDealDetails, getCitiesList } from '../../actions/dealAction';

class DealList extends Component {

    state = {
        dealsList:'',
        citiesList:'',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        disableReset: true,
        permissionDisplayBox: false,
    };

    componentWillMount()
    {
        this.props.onRef(this)
        this.getAllDeals();

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

    componentWillUnmount() {
        this.props.onRef(undefined)
     }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
          if (nextProps.dealsPayload){
            this.setState({showLoader:false})
            if(nextProps.dealsPayload.status === 200){
                this.setState({dealsList: nextProps.dealsPayload.responseData})
            }
          }
          
          if(nextProps.dealDelete){
            this.setState({showLoader:false})
            if(nextProps.dealDelete.status === 200){
                this.setState({ dialogOpen: true });
                this.getAllDeals();
            }
          }

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
                        this.props.history.push('/addNewMerchant');
                    }
                }
            }
          }
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    getAllDeals(){
        if(this.props.userData.user.responseData.token){
            this.props.getDealsListWithFilter(this.props.name, this.props.status, this.props.location, this.props.fromDate, this.props.toDate, this.props.userData.user.responseData.token)
        }
        else{
            //#TODO : Handle token expire case
        }
    }

    searchHandler(){
        this.getAllDeals();
    }

    deleteDealById = (dealId) => {

        if (this.state.permissionDisplayBox) {
            this.handleClose();
            if(this.props.userData.user.responseData.token){
                this.setState({showLoader:true})
                this.props.deleteDeal(this.state.dealId, this.props.userData.user.responseData.token);
            }
            else{
                //#TODO: Handle token expire case here
            }
        }
        else{
            this.setState({ permissionDisplayBox: true, dealId: dealId });
        }
    }

    updateDeal = (dealId) =>{

        if(this.props.userData.user.responseData.token){
            this.props.getDealDetails(dealId, this.props.userData.user.responseData.token)
            this.props.history.push('/updateDeal')
        }
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.setState({ permissionDisplayBox: false });

        if(this.props.action !== undefined){
            this.props.action()
            this.getAllDeals();
        }
    };

    addNewDeal(){
        if(this.props.userData.user.responseData.merchantId !== null){
            this.props.history.push({pathname:'/addNewDeal',state: { detail: this.props.userData.user.responseData.merchantId }})
        }else{
            this.props.history.push('/merchantList')
        }
    }

    resetHandler(){

        if(this.props.userData.user.responseData.token){
            this.props.getDealsListWithFilter("", "", "", "", "", this.props.userData.user.responseData.token)
        }
    
    }

    render() {

        const { dealsList, rowsPerPage, page, dialogOpen, permissionDisplayBox } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dealsList.length - page * rowsPerPage);

        const actions = [
            <Button key="ok" onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                OK
            </Button>
        ];

        const permissionActions = [
            <Button key="no" onClick={this.handleClose.bind(this)} color="primary">
                No
            </Button>,
            <Button key="yes" onClick={this.deleteDealById} color="primary" autoFocus>
                Yes
            </Button>,
        ];

        return (
          <div className="row">
            <div className="col-xs-12">
            <Loader status={this.state.showLoader} />

            <div>
                <DialogBox 
                    displayDialogBox={dialogOpen} 
                    message="Deal deleted successfully" 
                    actions={actions} 
                />

                <DialogBox 
                    displayDialogBox={permissionDisplayBox} 
                    message="Are you sure to delete deal?" 
                    actions={permissionActions} 
                />
            </div> 

            <div className="row">
            <div className="col-xs-12">
                    <Paper className="pagePaper">
                    <div className="tableWrapperMaterial">
                    <Table className="tableMaterial">
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>#</TableCell>
                                <TableCell>Merchant Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Period</TableCell>
                                <TableCell>Cashback</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            (dealsList !== "") ? (
                            (dealsList.length === 0) ? 
                                (<TableRow>
                                    <TableCell><div style={{ fontSize: 12, textAlign: 'center' }}>Loading...</div></TableCell>
                                </TableRow>)
                                : (
                                dealsList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((object, index) => {
                                    return (
                                    <TableRow className="tableRow" key={object.id}>
                                        <TableCell numeric>{object.serial_number}</TableCell>
                                        <TableCell>{object.entityName}</TableCell>
                                        <TableCell>{object.location}</TableCell>
                                        <TableCell>{moment(object.startDate).format('MM/DD/YYYY') + " - " + moment(object.endDate).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell>${object.cashBonus}</TableCell>
                                        <TableCell>
                                            <div className={object.status === 0 ? "titleRed" : "titleGreen"}>
                                                <FormLabel component="label" style={{color:'white', fontSize:'12px'}}>{object.status === 0 ? "Expired" : "Active"}</FormLabel>
                                            </div>
                                        </TableCell>
                                        <TableCell> 
                                            <div className="row start-md middle-md">
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.updateDeal(object.id)} className="enabledButton"> 
                                                        <img src="../images/ic_edit.svg" alt="" /> 
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                    <button type="button" onClick={() => this.deleteDealById(object.id)} className="enabledButton"> 
                                                        <img src="../images/ic_delete.svg" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </TableCell>    
                                    </TableRow>
                                    );
                                })
                                )
                                ):(null)
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                colSpan={3}
                                count={dealsList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </div>
                </Paper>
              </div>
            </div>   
        </div> 
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDealsListWithFilter, deleteDeal, getUserProfile, getDealDetails, getCitiesList }, dispatch)
  }
  
  DealList = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account,
      dealsPayload: state.deal.dealList === undefined ? undefined : state.deal.dealList,
      dealDelete: state.deal.deleteDeal === undefined ? undefined : state.deal.deleteDeal,
      userProfile: state.account.userProfile === undefined ? undefined : state.account.userProfile, 
      citiesPayload: state.deal.citiesList === undefined ? undefined : state.deal.citiesList,
    }),
    mapDispatchToProps,
  )(DealList)
  
  export default reduxForm({form: 'FrmDealList'})(DealList)