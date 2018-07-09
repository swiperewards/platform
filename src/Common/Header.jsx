import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/css/style.css';
import '../../public/css/responsive.css';

import {SideBar} from '../Common/SideBar';





class Header extends React.Component {
   
	constructor() {
		super();
		this.state = {
			shown: true,
		};
	}	


    toggle(element) {
		this.setState({
            shown: !this.state.shown
        
            
		});
	}
    // handleShow() {
    //     debugger
    //     if(document.getElementById("swipe").style.display == 'none')
    //     {
    //     document.getElementById("swipe").style.display = "block";
    //     }
    //     else{
    //     document.getElementById("swipe").style.display = "none";
    //     }

    //   }

  


    render() {
        var shown = {
			display: this.state.shown ? "block" : "none"
		};
		
		var hidden = {
			display: this.state.shown ? "none" : "block"
		}
       return (
        
       
	<header>
        <div class="header">
            <div class="logo">
			<div class="form-title"><NavLink class="logo" to={'/dashboard'}><img src="public/images/logo.png" alt="logo"/></NavLink></div>
            </div>
            <div id="swipe-adminProfile">
                <div class="dropdown">
                    <div class="admin-profile"><img src="public/images/profile.png" alt="profile" /></div>
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Benjamen
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Settings</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Logout</a></li>
                    </ul>
                </div>
                <div class="menu-icon" id="response-menu">
                    <button type="button" class="navbar-toggle" onClick={this.toggle.bind(this)}>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

             

             
                    <div class="col-md-3 col-lg-3 col-sm-4 col-xs-12 swipe-aside" id="swipe" style={ hidden }>
            <div class="left-menu">
                <ul>
                    <li class="active"><NavLink to={'/dashboard'}><i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</NavLink></li>
                    <li><NavLink to={'/payment'}><i class="fa fa-credit-card" aria-hidden="true"></i>PAYMENT PROCESSING</NavLink></li>
                    <li><NavLink to={'/deals'}><i class="fa fa-tachometer" aria-hidden="true"></i>Deals</NavLink></li>
                    <li><NavLink to={'/contact'}><i class="fa fa-users" aria-hidden="true"></i>Contact us</NavLink></li>
                    <li><NavLink to={'/login'}><i class="fa fa-sign-out" aria-hidden="true"></i>SIGN OUT</NavLink></li>
                </ul>
            </div>
        </div>
                   
                 
                </div>
            </div>
		
        </div>
 
		</header>



       );
    }
 }
 export default Header;