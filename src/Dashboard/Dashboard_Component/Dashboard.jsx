import React from 'react';
import '../../../public/css/style.css';
import '../../../public/css/responsive.css';
import { NavLink } from 'react-router-dom';

import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import SideBar from '../../Common/SideBar';


class Dashboard extends React.Component {
    render() {
       return (
        <div class="Container-fluid">
             <Header />
              <div class="swipe-content">
              <SideBar/>
            <div class="col-md-9 col-lg-9 col-sm-8 col-xs-12 content-section">
             <div class="dashboard-graph">

                <div class="row">
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph1.png" alt="graph" />
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph2.png" alt="graph" />
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph3.png" alt="graph" />
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph4.png" alt="graph" />
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph5.png" alt="graph" />
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                        <div class="myGraph">
                            <img src="public/images/graph6.png" alt="graph" />
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
 export default Dashboard;