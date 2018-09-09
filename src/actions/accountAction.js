import { hostURL, validateUserAPI, registerUserAPI, resendMailAPI, activateAccount } from '../app.config';
var axios = require('axios');

//To Validate and authenticate user for login
export function validateUser(values) {

    var setting = {
        method: 'post',
        url: hostURL + validateUserAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
		        "emailId": values.username,
                "password": values.password
            }
	    },
        headers: {
            'content-type': 'application/json'
        }
    }

    var response = axios(setting).then(

        response => {
            response.data.rememberme = values.rememberMe === undefined ? false : values.rememberMe
            return response.data;
        }
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'VALIDATE_USER',
        payload: response
    }
}

export function clearValidateUserResponse() {
    return {
        type: 'VALIDATE_USER',
        payload: undefined
    }
}


//To register merchant for dashboard access
export function registerUser(values) {

    var setting = {
        method: 'post',
        url: hostURL + registerUserAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "fullName": values.fullName,
                "emailId": values.emailId,
                "password": values.password,
                "roleId":3
            }
	    },
        headers: {
            'content-type': 'application/json'
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'REGISTER_USER',
        payload: response
    }
}

export function clearRegisterUserState() {
    return {
        type: 'REGISTER_USER',
        payload: undefined
    }
}

//Function to resend verification mail for user activation
export function resendVerificationMail(emailId) {

    var setting = {
        method: 'post',
        url: hostURL + resendMailAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
		        "emailId": emailId,
            }
	    },
        headers: {
            'content-type': 'application/json'
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'RESEND_EMAIL',
        payload: response
    }
}

export function clearResendMailResponse() {
    return {
        type: 'RESEND_EMAIL',
        payload: undefined
    }
}

//Function to Activate user account
export function activateUserAccount(token) {

    var setting = {
        method: 'post',
        url: hostURL + activateAccount,
        data: {
            "platform": 'Web',
	        "requestData":{
                "activateToken": token
            }
	    },
        headers: {
            'content-type': 'application/json',
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'ACTIVATE_USER',
        payload: response
    }
}


export const AuthError = ()=>{
    return {
        type:'AUTH_ERROR',
        payload:true
    }
}

//To clear local storage and return empty object
export function logout() {
    localStorage.clear();
    return {
        type: 'LOGOUT',
        payload: undefined
    }
}