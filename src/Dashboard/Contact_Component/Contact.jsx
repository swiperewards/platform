import React from 'react';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import SideBar from '../../Common/SideBar';

import '../../../public/css/style.css';
import '../../../public/css/responsive.css';
import { NavLink } from 'react-router-dom';

class Contact extends React.Component {
    render() {
       return (
		
        <div class="Container-fluid">
            <Header />
              <div class="swipe-content">
              <SideBar/>
            <div class="col-md-9 col-lg-9 col-sm-8 col-xs-12 content-section">
             <div class="contact_section">
				<img src="public/images/map.png"/>
				<div class="detalis_sec">
				<div class="main_dec">
				<div class="left_dec">
				<h5>Contact us</h5>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud ommodo consequat Ut enim</p>
				</div>
				<div class="right_det">
					<h5>Details</h5>
					<ul>
						<li>youremailid@swiperewards.com</li>
						<li>+1 555 555 6521</li>
						<li>1234, Mandup Street, Unit 000,</li>
						<li>Somecity, NC, 12345</li>
					</ul>
				</div>
				</div>
				</div>
			</div>
      <Footer />
            </div>
           
            </div>
      
            </div>
       
     
          


       );
    }
 }
 export default Contact;