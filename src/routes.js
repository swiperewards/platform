import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'

// CONTAINERS
import Login from './containers/login'
import App from './App'

class Routes extends Component {


    render() {
        return (

            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />

                        <App></App>
                    </Switch>
                </div>
            </HashRouter>

        )
    }
}

export default Routes;