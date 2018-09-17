import { hostURL, getQueryTypeAPI, generateTicketAPI } from '../app.config';

var axios = require('axios');

//Function to get various query types
export function getQueryType(token) {

    var setting = {
        method: 'post',
        url: hostURL + getQueryTypeAPI,
        data: {
            "platform": "web",
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
        type: 'GET_QUERY_TYPE',
        payload: response
    }
}

//Function to generate ticket
export function generateTicket(values, token) {

    var setting = {
        method: 'post',
        url: hostURL + generateTicketAPI,
        data: {
            "platform": "web",
            "requestData":{
                "ticketTypeId":values.ticketType,
                "feedback": values.message,
                "userCategory": "Merchant"
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
        type: 'GENERATE_TICKET',
        payload: response
    }
}

export function clearGenerateTicketResponse() {
    return {
        type: 'GENERATE_TICKET',
        payload: undefined
    }
}