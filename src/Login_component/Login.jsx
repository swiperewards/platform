import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/css/style.css';
import '../../public/css/responsive.css';


// class Login extends React.Component {
//     render() {
//        return (
//         <div class="form-wrapper clearfix">
// 		<div class="form-title frm"><NavLink class="logo" to={'/dashboard'}><img src="public/images/logo.png" alt="logo"/></NavLink></div>
// 		<div class="form-content">
// 			<form>
// 				<h5>LOGIN</h5>
// 				<div class="form-group iconic-form">      
// 				  <label>Username or Email Address</label>
// 				  <input class="form-control" id="email" placeholder="name@swiperewards.io" type="email"/>
// 				</div>
// 				<div class="form-group iconic-form">      
// 				 <label>Password</label>
// 				  <input class="form-control" id="pwd" placeholder="Password" type="password"/>
// 				</div>  
// 				 <div class="checkbox">
// 				  <label><input type="checkbox" name="remember"/> Remember me</label>
//                   <NavLink class="forgot-txt" to={'/forgotpassword'}> Forgot Password?</NavLink>
// 				</div>
				
				
// 				<div class="new-account-link">
// 				<button type="submit" class="btn btn-style full-width-btn">Sign in</button>
// 				<div class="sign_cls">
// 				<span class="account-txt">Don’t have an account? </span><span class="form-footer-link"> <NavLink to={'/register'}> Sign Up</NavLink></span></div>
// 				</div>
// 			  </form>
// 		</div>				
// 	</div>
//        );
//     }
//  }
//  export default Login;

class Login extends React.Component {
	
	constructor(props) {
	  super(props);
	  
	  this.state = {
		username: '',
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
		<form novalidate method="get" action="">
		<h5>LOGIN</h5>

		
		  <div className="form-group">
			<label id="usernameLabel">Email Address</label>
			<input className="form-control"
			  type="email"
			  name="username"
			  ref="username"
			  value={ this.state.username } 
			  onChange={ this.handleChange }
			  required />
			<div className="error" id="usernameError" />
		  </div>
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

		  <div class="checkbox">
			  <label><input type="checkbox" name="remember"/> Remember me</label>                 
			   <NavLink class="forgot-txt" to={'/forgotpassword'}> Forgot Password?</NavLink> 	
		</div>
		  
		 

<div class="new-account-link">
			
			<button className="btn btn-primary  full-width-btn"
			onClick={ this.handleSubmit }>Sign in</button>
			
			<div class="sign_cls">				
			<span class="account-txt">Don’t have an account? </span><span class="form-footer-link"> <NavLink to={'/register'}> Sign Up</NavLink></span></div>
			</div>
		</form>
		</div>
		</div>
	  );
	}
  }

  export default Login;
  
