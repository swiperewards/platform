import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/css/style.css';
import '../../public/css/responsive.css';


class ForgotPassword extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
		  usernames: ''
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
			<form method="get" action=""> 
				<h5>Forgot Password</h5>
				<div class="form-group iconic-form">      
				  <label id="usernamesLabel">Enter Your Register Email</label>
				  <input className="form-control"
			  type="email"
			  name="usernames"
			  ref="usernames"
			  value={ this.state.usernames } 
			  onChange={ this.handleChange }
			  required />
			  	<div className="error" id="usernamesError" />
				</div>
				
				<div class="new-account-link">
				<div class="forget_m">
			
				<button className="btn btn-primary  full-width-btn"
			onClick={ this.handleSubmit }>Sent Mail</button>
				</div>
				<div class="sign_cls f_r">
				<span class="account-txt">Don’t have an account? </span><span class="form-footer-link"> <NavLink to={'/register'}> Register Now</NavLink></span></div>
				</div>
			  </form>
		</div>				
	</div>
       );
    }
 }
 export default ForgotPassword;