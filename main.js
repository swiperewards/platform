import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './src/Login_component/Login.jsx';
import ForgotPassword from './src/Forgot_component/ForgotPassword.jsx'
import Register from './src/Register_component/Register.jsx';
import Dashboard from './src/Dashboard/Dashboard_Component/Dashboard.jsx';
import Payment from './src/Dashboard/Payment_Component/Payment.jsx';
import Deals from './src/Dashboard/Deals_Component/Deals.jsx';
import Contact from './src/Dashboard/Contact_Component/Contact.jsx';




ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path='/login' component={Login} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/payment' component={Payment} />
            <Route path='/deals' component={Deals} />
            <Route path='/contact' component={Contact} />

        </Switch>
    </BrowserRouter>
    , document.getElementById('app'));