import { hostURL, addNewDealAPI, getDealsFilterAPI, deleteDealAPI, updateDealAPI } from '../app.config';
import {normalizedPhone} from '../utilities/validation'

var axios = require('axios');

//Function to add new deal to processing system
export function addNewDeal(values, merchantId, token) {

    var setting = {
        method: 'post',
        url: hostURL + addNewDealAPI,
        data: {
            "platform": "web", 
	        "requestData":{
                "merchantId": merchantId, 
		        "startDate": values.fromDate === undefined ? undefined : (values.fromDate).replace(normalizedPhone,''),
		        "endDate": values.toDate === undefined ? undefined : (values.toDate).replace(normalizedPhone,''),
		        "cashBonus": values.cashBonus,
                "location": values.location,
                "status": values.status,
                "shortDescription": "Deal New",
                "longDescription": "New Deal",
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
        type: 'ADD_DEAL',
        payload: response
    }
}

//Function to fetch list of all Deals based on various filter option.
export function getDealsListWithFilter(name, inactive, statePrefix, fromDate, toDate, token) {

    var setting = {
        method: 'post',
        url: hostURL + getDealsFilterAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "merchantName" : name === undefined ? "" : name,
                "status" : inactive === undefined ? "" : inactive,
                "location": statePrefix === undefined ? "" : statePrefix,
                "fromDate" : fromDate === undefined ? "" : fromDate,
                "toDate" : toDate === undefined ? "" : toDate,
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
        type: 'GET_DEALS',
        payload: response
    }
}

//Function to delete deal for selected Id
export function deleteDeal(dealId,token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteDealAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : dealId,
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
        type: 'DELETE_DEAL',
        payload: response
    }
}

//Function to update deal details
export function updateDeal(values,token) {

    var setting = {
        method: 'post',
        url: hostURL + updateDealAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "merchantId" : values.merchantId,
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
        type: 'UPDATE_MERCHANT',
        payload: response
    }
}