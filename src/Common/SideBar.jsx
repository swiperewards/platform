import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/css/style.css';
import '../../public/css/responsive.css';


class SideBar extends React.Component {

    
    render() {
       return (
		
        <div class="col-md-3 col-lg-3 col-sm-4 col-xs-12 swipe-aside" id="swipe">
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

       );
    }
 }
 export default SideBar;