import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/accountAction';

class Logout extends Component {


    componentWillMount() {
        this.props.logout();

        //If dont have folder structure like https://www.iagon.com/#/login
        //window.history.pushState("", "", "/");

        // if we have folder structure like https://www.iagon.com/platform/#/login
        window.history.pushState("", "", window.location.pathname);

        this.props.history.push('/login');
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch)
}


export default connect(null, mapDispatchToProps)(Logout)

