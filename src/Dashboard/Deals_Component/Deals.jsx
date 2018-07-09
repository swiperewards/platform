import React from 'react';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import SideBar from '../../Common/SideBar';

import '../../../public/css/style.css';
import '../../../public/css/responsive.css';
import '../../../public/css/font-awesome.min.css'
import '../../../public/css/bootstrap-datepicker3.css';
import '../../../public/js/bootstrap-datepicker.min.js';
import { NavLink } from 'react-router-dom';

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

const data = [
  
  {
    id: 1,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="table-dealshead"><span>From</span><span>To</span><div class="dealsinner"><p>12/05/2018</p> <label>-</label> <p>16/05/2018</p></div></div>,
    status:<div class="deal-active"><span>Active</span></div>,
    action:<i class='fa fa-pencil' aria-hidden='true'></i>,
    
  }, 

  {
    id: 2,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active exp-swper"><span>Expired</span></div>,
    action:'',
    
  }, 

  {
    id: 3,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active"><span>Active</span></div>,
    action:<i class='fa fa-pencil' aria-hidden='true'></i>,
    
  }, 

  {
    id: 4,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active"><span>Active</span></div>,
    action:<i class='fa fa-pencil' aria-hidden='true'></i>,
    
  }, 

  {
    id: 5,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active exp-swper"><span>Expired</span></div>,
    action:'',
    
  }, 


  {
    id: 6,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active"><span>Active</span></div>,
    action:<i class='fa fa-pencil' aria-hidden='true'></i>,
    
  }, 

  {
    id: 7,
    location: "San Francisco, California ",
    cashbonus: "5%",
    promotiondate:<div class="dealsinner"><span>12/05/2018</span> <label>-</label> <span>16/05/2018</span></div>,
    status:<div class="deal-active"><span>Active</span></div>,
    action:<i class='fa fa-pencil' aria-hidden='true'></i>,
    
  }, 


];


class Deals extends React.Component {


  
    render() {
       return (
		
        <div class="Container-fluid">
            <Header />
              <div class="swipe-content">
              <SideBar/>
            <div class="col-md-9 col-lg-9 col-sm-8 col-xs-12 content-section">
            <div class="swipe_deals">
              <div class="maintain_dealsforms">
                <h4>Deals</h4>
                <div class="swipeDeals_form">
                <form action="" method="get">
                <div class="form-group swipe-from">
                <label>Store Location</label>
                <input class="form-swiper" type="text" name="" placeholder="San Francisco, California" />
                </div>
                <div class="form-group swipe-from">
                <label>Set % of Cashback</label>
                <select class="form-swiper">
                <option>5%</option>
                <option>15%</option>
                <option>25%</option>
                </select>
                </div>
                <div class="form-group swipe-date-from">
                <label>Set the Date</label>
                <div class="date-method"><input class="form-swiper datetimepicker" type="text" name="" placeholder="02/05/2018" /><i class="fa fa-calendar" aria-hidden="true"></i></div>
                <div class="date-method"><input class="form-swiper datetimepicker" type="text" name="" placeholder="16/05/2018" /><i class="fa fa-calendar" aria-hidden="true"></i></div>
                </div>
                <div class="form-btn-result">
                <input type="submit" value="CONFIRM" class="btn-swipe-primary"/>
                <input type="reset" value="REST" class="btn-swipe-default"/>
                </div>
                </form>
                </div>
              </div>



              <div class="swiper-tableDeals table-responsive">
              <table border="0" cellpadding="0" cellspacing="0" class="table">
              <thead>
                <tr>
                <th>#</th>
                <th>Location</th>
                <th>Cash Bonus Available</th>
                <th>Promotion Date</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
              </thead>
               <tbody>
               {data.map(n => {
                 return (
               <tr>
                 <td>{n.id}</td>
                 <td>{n.location}</td>
                 <td>{n.cashbonus}</td>
                 <td>{n.promotiondate}</td>
                 <td>{n.status}</td>
                 <td>{n.action}</td>
               </tr>
                 );
                })}
              </tbody>
              </table>
              </div>


              






              </div>

            </div>
            <Footer />
            </div>
      
            </div>
       
     
          


       );
    }
 }
 export default Deals;