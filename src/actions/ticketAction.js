import { hostURL, getQueryTypeAPI, generateTicketAPI, getTicketTypesAPI, deleteTicetTypeAPI } from '../app.config';

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

//Function to get Ticket type list
export function getTicketTypes(token) {

    var setting = {
        method: 'post',
        url: hostURL + getTicketTypesAPI,
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
        type: 'GET_TICKET_TYPE_LIST',
        payload: response
    }
}

// //Function to delete Ticket type
// export function getTicketTypes(token) {

//     var setting = {
//         method: 'post',
//         url: hostURL + getTicketTypesAPI,
//         data: {
//             "platform": "web",
// 	    },
//         headers: {
//             'content-type': 'application/json',
//             'auth' : token
//         }
//     }

//     var response = axios(setting).then(
//         response => response.data
//     )
//         .catch(response => response = {
//             success: 500,
//             message: "Your submission could not be completed. Please Try Again!",
//             data: ""
//         }
//         );

//     return {
//         type: 'GET_TICKET_TYPE_LIST',
//         payload: response
//     }
// }