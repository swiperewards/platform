import React from 'react';
import { NavLink } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../../public/css/style.css';
import '../../public/css/responsive.css';


class Register extends React.Component {

	constructor(props) {
	  super(props);
	  
	  this.state = {
		username: '',
		usernames: '',
		password: '',
		passwordConfirm: ''
	  };
	  
	  this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		


		
	}
	

	
	handleChange(e) {
	  e.target.classList.add('active');
	  
	  this.setState({
		[e.target.name]: e.target.value
	  });
	  
	  this.showInputError(e.target.name);
	}
	
	handleSubmit(e) {    
	  e.preventDefault();
	  
	  console.log('component state', JSON.stringify(this.state));
	  
	  if (!this.showFormErrors()) {
		console.log('form is invalid: do not submit');
	  } else {
		console.log('form is valid: submit');
	  }
	}
	
	showFormErrors() {
	  const inputs = document.querySelectorAll('input');
	  let isFormValid = true;
	  
	  inputs.forEach(input => {
		input.classList.add('active');
		
		const isInputValid = this.showInputError(input.name);
		
		if (!isInputValid) {
		  isFormValid = false;
		}
	  });
	  
	  return isFormValid;
	}
	
	showInputError(refName) {
	  const validity = this.refs[refName].validity;
	  const label = document.getElementById(`${refName}Label`).textContent;
	  const error = document.getElementById(`${refName}Error`);
	  const isPassword = refName.indexOf('password') !== -1;
	  const isPasswordConfirm = refName === 'passwordConfirm';
	  
	  if (isPasswordConfirm) {
		if (this.refs.password.value !== this.refs.passwordConfirm.value) {
		  this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
		} else {
		  this.refs.passwordConfirm.setCustomValidity('');
		}
	  }
		  
	  if (!validity.valid) {
		if (validity.valueMissing) {
		  error.textContent = `${label} is a required field`; 
		} else if (validity.typeMismatch) {
		  error.textContent = `${label} should be a valid email address`; 
		} else if (isPassword && validity.patternMismatch) {
		  error.textContent = `${label} should be longer than 4 chars`; 
		} else if (isPasswordConfirm && validity.customError) {
		  error.textContent = 'Passwords do not match';
		}
		return false;
	  }
	  
	  error.textContent = '';
	  return true;
	}
  

    render() {
       return (
        
    <div class="form-wrapper clearfix">
		<div class="form-title frm"><NavLink class="logo" to={'/dashboard'}><img src="public/images/logo.png" alt="logo"/></NavLink></div>
		<div class="form-content">
			<form>
				<h5>CREATE YOUR SWIPE ACCOUNT</h5>
				<div class="form-group iconic-form">      
				  <label id="usernameLabel">Username or Email Address</label>
					<input className="form-control"
			  type="email"
			  name="username"
			  ref="username"
			  value={ this.state.username } 
			  onChange={ this.handleChange }
			  required />
			<div className="error" id="usernameError" />
				 
				</div>

				<div class="form-group iconic-form">      
				  <label id="usernamesLabel">Full Name</label>
					<input className="form-control"
			  type="name"
			  name="usernames"
			  ref="usernames"
			  value={ this.state.usernames } 
			  onChange={ this.handleChange }
			  required />
		   	<div className="error" id="usernamesError" />
				</div>

				{/* <div class="form-group iconic-form">      
				 <label>Full Name</label>
				  <input class="form-control" placeholder="" type="text"/>
				</div>  */}

				<div className="form-group">
				<label id="passwordLabel">Password</label>
				<input className="form-control"
					type="password" 
					name="password"
					ref="password"
					value={ this.state.password } 
					onChange={ this.handleChange }
					pattern=".{5,}"
					required />
				<div className="error" id="passwordError" />
				</div>


				<div className="form-group">
				<label id="passwordConfirmLabel">Confirm Password</label>
				<input className="form-control"
					type="password" 
					name="passwordConfirm"
					ref="passwordConfirm"
					value={ this.state.passwordConfirm } 
					onChange={ this.handleChange }
					required />
				<div className="error" id="passwordConfirmError" />
				</div>
	
				<ReCAPTCHA
    ref="recaptcha"
    sitekey="6LckrloUAAAAAAomSdNFamXsrQaYaKm4aHUDyBra"
    onChange={this.handleChange}
  />


				 {/* <div className="captcha_img">
					<img src="public/images/captcha.png"/>
				 </div>	 */}
				 {/* <button type="submit" class="btn btn-style full-width-btn create_btn">CREATE YOUR SWIPE ACCOUNT</button> */}
				 <button className="btn btn-primary  full-width-btn create_btn"
			onClick={ this.handleSubmit }>CREATE YOUR SWIPE ACCOUNT</button>
				
				<div class="sign_cls_new">
				<span class="account-txt">Don’t have an account? </span><a href="#">Sign Up</a>
				</div>
			  </form>
		</div>				
	</div>

       );
    }
 }
 export default Register;