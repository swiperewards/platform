import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'

// authorization wrapper
import { userIsAuthenticated } from './components/authorization'

// CONTAINERS
import Login from './containers/login'
import ForgetPassword from './containers/forgotPassword'
import Register from './containers/register'
import Logout from './containers/logout'

import ManageAdmins from './containers/admin/manageAdmins'
import ManageMerchants from './containers/merchant/manageMerchants'
import ManageUsers from './containers/user/manageUsers'
import AddAdmin from './containers/admin/addNewAdmin'
import AddMerchant from './containers/merchant/addNewMerchant'
import UpdateMerchant from './containers/merchant/updateMerchantDetails'
import MerchantsList from './containers/merchant/merchantList'

import ManageDeals from './containers/deals/manageDeals'
import AddNewDeal from './containers/deals/addNewDeal'

import SuperAdminDashboard from './containers/superAdmin/superAdminDashboard'
import AdminDashboard from './containers/admin/adminDashboard'

import UserProfile from './containers/editUserProfile'

import App from './App'

class Routes extends Component {


    render() {
        return (

            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/resetPassword" component={ForgetPassword} />
                        <Route exact path="/resetPassword/:token" component={ForgetPassword} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />

                        <App>
                            <Route exact path="/admindashboard" component={userIsAuthenticated(AdminDashboard)} />
                            <Route exact path="/superAdminDashboard" component={SuperAdminDashboard} />
                            <Route exact path="/managemerchants" component={ManageMerchants} />
                            <Route exact path="/managedeals" component={ManageDeals} />
                            <Route exact path="/manageadmins" component={ManageAdmins} />
                            <Route exact path="/manageusers" component={ManageUsers} />
                            <Route exact path="/addNewAdmin" component={AddAdmin} />
                            <Route exact path="/addNewMerchant" component={AddMerchant} />
                            <Route exact path="/updateMerchant" component={UpdateMerchant}/>
                            <Route exact path="/addNewDeal" component={AddNewDeal}/>
                            <Route exact path="/editUserProfile" component={UserProfile}/>
                            <Route exact path="/merchantList" component={MerchantsList}/>
                        </App>
                    </Switch>
                </div>
            </HashRouter>

        )
    }
}

export default Routes;