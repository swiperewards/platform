import { hostURL, addNewAdminAPI, getAdminFilterAPI, getAdminDetailsAPI, deleteAdminAPI, updateAdminAPI } from '../app.config';
import {normalizedPhone} from '../utilities/validation'

var axios = require('axios');

//Function to add new admin to system
export function addNewAdmin(values, profilePic, token) {

    var setting = {
        method: 'post',
        url: hostURL + addNewAdminAPI,
        data: {
            "platform": "web", 
	        "requestData":{
                "fullName": values.adminName, 
		        "contactNumber": (values.phone === undefined || values.phone === '' || values.phone === null) ? undefined : (values.phone).replace(normalizedPhone,''),
		        "emailId": values.email,
		        "status": values.status,
                "profilePic": profilePic,
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
        type: 'ADD_ADMIN',
        payload: response
    }
}

//Function to fetch list of all admins based on various filter option.
export function getAdminListWithFilter(name, inactive, token) {

    var setting = {
        method: 'post',
        url: hostURL + getAdminFilterAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "name" : name === undefined ? "" : name,
                "status" : inactive === undefined ? "" : inactive,
                "pageNumber" : "0",
		        "pageSize" : "0"
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
        type: 'GET_ADMINS',
        payload: response
    }
}

//Function to delete Admin for selected Id
export function deleteAdmin(adminId,token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteAdminAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : adminId,
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
        type: 'DELETE_ADMIN',
        payload: response
    }
}

//Function to get admin details
export function getAdminDetails(adminId,token) {

    var setting = {
        method: 'post',
        url: hostURL + getAdminDetailsAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : adminId,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => {
            response.data.responseData.status = response.data.responseData.status === undefined ? false : (response.data.responseData.status).toString()
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
        type: 'GET_ADMIN_DETAILS',
        payload: response
    }
}


//Function to update admin details
export function updateAdminDetails(values, profilePic, token) {

    var setting = {
        method: 'post',
        url: hostURL + updateAdminAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "userId":values.userId,
                "fullName": values.fullName,
                "contactNumber":(values.contactNumber === undefined || values.contactNumber === '' || values.contactNumber === null) ? undefined : (values.contactNumber).replace(normalizedPhone,''),
                "emailId": values.emailId,
		        "status": values.status,
                "profilePic": profilePic,
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
        type: 'UPDATE_ADMIN',
        payload: response
    }
}