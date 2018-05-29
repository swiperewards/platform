import React from 'react';


import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import SideBar from '../../Common/SideBar';


import '../../../public/css/style.css';
import '../../../public/css/responsive.css';
import { NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';









class Payment extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };

    this.state = {
			showns: true,
    };
    
  }


  nextbtn(elements) {
		this.setState({
            showns: !this.state.showns,
			hiddens: !this.state.hiddens
        
            
		});
		document.getElementById("step2").removeAttribute("disabled");
		document.getElementById("step1").setAttribute("disabled", "disabled");
		
  }  

  prevbtn (elements) {
		this.setState({
            showns: !this.state.showns
			
          
		});
		
		document.getElementById("step2").setAttribute("disabled", "disabled");
		//document.getElementById("step2").setAttribute("disabled", "true");
		document.getElementById("step1").removeAttribute("disabled");
  }  
  
  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }



    render() {

      var showns = {
        display: this.state.showns ? "block" : "none"
      };
      
      var hiddens = {
        display: this.state.showns ? "none" : "block"
      }
       return (
     

<div class="Container-fluid">
            <Header />
              <div class="swipe-content">
              <SideBar/>
            <div class="col-md-9 col-lg-9 col-sm-8 col-xs-12 content-section">
             <div class="dashboard-graph">

             <div class="swipe_payment">
				<h3>Payment Processing Application</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
				<div class="parment-reqiures"><button class="btn btn-register" data-toggle="modal" data-target="#myRegister" onClick={this.handleShow}> REGISTER</button></div>
				
        <Modal
         
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            <h4 class="modal-title">Register</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          

      <div class="stepwizard col-md-offset-3">
    <div class="stepwizard-row setup-panel">
      <div class="stepwizard-step">
        <a href="#step-1" id="step1" type="button" class="btn  btn-register   btn-circle">1</a>
        <p>Step 1</p>
      </div>
      <div class="stepwizard-step">
        <a href="#step-2" id="step2" type="button" class="btn  btn-register  btn-circle" disabled="disabled">2</a>
        <p>Step 2</p>
      </div>
     
    </div>
  </div>
  
  <form role="form" action="" method="post">
    <div class="row setup-content" id="step-1" style={ showns }>
      <div class="col-xs-12 ">
        <div class="col-md-12">
          <h3> Step 1</h3>
          <div class="form-group swipe-from">
            <label>Name</label>
            <input class="form-swiper" type="text" name="" placeholder="Daniel"/>
            </div>
            <div class="form-group swipe-from">
            <label>Address</label>
            <textarea rows="4" class="form-swiper" placeholder="San Francisco, California"></textarea>
            </div>
          <button class="btn nextBtn btn-lg pull-right  btn-register" type="button" onClick={this.nextbtn.bind(this)}>Next</button>
        </div>
      </div>
    </div>
    <div class="row setup-content" id="step-2" style={ hiddens }> 
      <div class="col-xs-12">
        <div class="col-md-12">
          <h3> Step 2</h3>
          <div class="form-group swipe-from">
			<label>City</label>
			<input class="form-swiper" type="text" name="" placeholder="Los Angeles"/>
		  </div>
		  <div class="form-group swipe-from">
			<label>State</label>
			<input class="form-swiper" type="text" name="" placeholder="California"/>
		  </div>
		  <div class="form-group swipe-from">
			<label>Zip Code</label>
			<input class="form-swiper" type="text" name="" placeholder="90019"/>
		  </div>
		  		  <div class="form-group swipe-from">
			<label>Phone</label>
			<input class="form-swiper" type="text" name="" placeholder="(213) 974-3211"/>
		  </div>
		  		  <div class="form-group swipe-from">
			<label>E-Mail</label>
			<input class="form-swiper" type="email" name="" placeholder="daniel@gmail.com"/>
		  </div>
          <button class="btn  btn-register prevBtn btn-lg pull-left" type="button" onClick={this.prevbtn.bind(this)}>Previous</button>
          <button class="btn  btn-success btn-lg pull-right" type="submit">Submit</button>
        </div>
      </div>
    </div>
    
  </form>

          </Modal.Body>
        </Modal>




				</div>
				
				<div class="swiper_disclaimer">
				<h4>Disclaimer</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
				</div>

            </div>
            </div>
            <Footer />
            </div>

            </div>


      

       );
    }
 }
 export default Payment;