import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'

// CONTAINERS
import Login from './containers/login'
import ForgetPassword from './containers/forgotPassword'

import App from './App'

class Routes extends Component {


    render() {
        return (

            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/resetPassword" component={ForgetPassword} />
                        <Route exact path="/resetPassword/:token" component={ForgetPassword} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />

                        <App>
                            
                        </App>
                    </Switch>
                </div>
            </HashRouter>

        )
    }
}

export default Routes;