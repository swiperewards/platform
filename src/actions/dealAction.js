import { hostURL, addNewDealAPI} from '../app.config';
import {normalizedPhone} from '../utilities/validation'

var axios = require('axios');

//Function to add new deal to processing system
export function addNewDeal(values, token) {

    var setting = {
        method: 'post',
        url: hostURL + addNewDealAPI,
        data: {
	        "requestData":{
		        "startDate": values.fromDate === undefined ? undefined : (values.fromDate).replace(normalizedPhone,''),
		        "endDate": values.toDate === undefined ? undefined : (values.toDate).replace(normalizedPhone,''),
		        "cashBonus": values.cashBonus,
		        "location": values.location
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