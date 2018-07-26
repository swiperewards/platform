import React, { Component } from 'react';
import { connect } from 'react-redux';

import './scss/styles.css';

import LeftBar from './components/leftBar'
import Login from './containers/login';

import {LARGE} from '@material-ui/core/utils/ownerWindow'

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      navDrawerOpen: window.innerWidth >= 1025 ? true : false,
      loadStatus: true
    };
  }

  componentWillMount() {
    this.setState({ loadStatus: true })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loadStatus: false })

    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {

    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  updateDimensions() {
    if (window.innerWidth <= 1025) {
      this.setState({
        navDrawerOpen: false
      });
    } else {
      this.setState({
        navDrawerOpen: true
      });
    }
  }

  handleBodyClick() {
    if (window.innerWidth <= 1025) {
      this.setState({
        navDrawerOpen: false
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    
    let { navDrawerOpen } = this.state;
    
    if (this.props.userData) {      
      return(
            <div>
              <LeftBar navDrawerOpen={window.innerWidth > 1025 ? true : navDrawerOpen}
              handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
              children={this.props.children}
              />
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
