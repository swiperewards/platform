import React, { Component } from 'react';
import { connect } from 'react-redux';

import './scss/styles.css';

import LeftBar from './components/leftBar'
import Login from './containers/login';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      loadStatus: true
    };
  }

  componentWillMount() {
    this.setState({ loadStatus: true })
  }

  render() {
    
    const styles = {
      container: {
        margin: '80px 20px 20px 15px',
      },
    };


    //#region Check whether logged in user is admin or other according that load side bar
    if (this.props.userData) {
      //const admin = this.props.userData.role === "superadmin" ? true : false;    
      
      return(
            <div>
              <LeftBar />

              <div style={styles.container}>
                  {this.props.children}
              </div>
            </div>
      );
    }
    else{
      return (        
            <Login/>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userData: state.account === undefined ? undefined : state.account
  }
}

export default connect(mapStateToProps, null)(App);
