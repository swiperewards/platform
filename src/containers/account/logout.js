import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/accountAction';

class Logout extends Component {


    componentWillMount() {
        this.props.logout();
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

