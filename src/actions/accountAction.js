import { hostURL } from '../app.config';
var axios = require('axios');

//To Validate and authenticate user for login
export function validateUser(values) {

    var setting = {
        method: 'post',
        url: hostURL,
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
        response => response.data
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