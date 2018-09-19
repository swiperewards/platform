import { hostURL, getUserFilterAPI, deleteUserAPI, getUserDetailsAPI, updateUserAPI} from '../app.config';
import {normalizedPhone} from '../utilities/validation'

var axios = require('axios');

//Function to get user list by filter options
export function getUsersByFilter(name, status, userType, token) {

    var setting = {
        method: 'post',
        url: hostURL + getUserFilterAPI,
        data: {
            "platform": "web", 
	        "requestData":{
                "name": name, 
                "status": status,
                "type" : userType,
                "pageNumber": "0",
                "pageSize": "0",
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
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
        type: 'GET_USERS',
        payload: response
    }
}


//Function to delete user for selected user Id
export function deleteUser(userId,token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteUserAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : userId,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
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
        type: 'DELETE_USER',
        payload: response
    }
}

export function clearUserDeleteResponse() {
    return {
        type: 'DELETE_USER',
        payload: undefined
    }
}

//Function to get user details by user id
export function getUserDetails(userId, token) {

    var setting = {
        method: 'post',
        url: hostURL + getUserDetailsAPI,
        data: {
            "platform": "web", 
	        "requestData":{
                "id": userId, 
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(

        response => {
            response.data.responseData.status = response.data.responseData.status === 1 ? "1" : "0"
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
        type: 'GET_USER_DETAILS',
        payload: response
    }
}

export function clearUserDetails() {
    return {
        type: 'GET_USER_DETAILS',
        payload: undefined
    }
}

//Function to update user details
export function updateUserDetails(values, isEmailUpdated, token) {

    var setting = {
        method: 'post',
        url: hostURL + updateUserAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "userId":values.userId,
                "fullName": values.fullName,
                "contactNumber":(values.contactNumber === undefined || values.contactNumber === null) ? undefined : (values.contactNumber).replace(normalizedPhone,''),
                "emailId": values.emailId,
                "status": values.status,
                "zipcode" : (values.pincode === undefined || values.pincode === null) ? undefined : (values.pincode).replace(normalizedPhone,''),
		        "city" :  values.city,
		        "password" : (values.newPassword !== undefined) ? values.newPassword : values.password,
		        "isEmailUpdated" : isEmailUpdated === true ? "1" :"0",
		        "isPasswordUpdated" : values.passwordUpdate === true ? "1" : "0",
                "roleId" : values.roleId,
                "profilePic" : "",
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
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
        type: 'UPDATE_USER',
        payload: response
    }
}

export function clearUserUpdateResponse() {
    return {
        type: 'UPDATE_USER',
        payload: undefined
    }
}