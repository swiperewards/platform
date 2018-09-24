import { 
    hostURL, 
    getQueryTypeAPI, 
    generateTicketAPI, 
    getTicketTypesAPI, 
    deleteTicketTypeAPI, 
    addTicketTypeAPI, 
    updateTicketTypeAPI, 
    getTicketTypeDetailsAPI, 
    getCustomerQueriesListAPI,
    getCustomerQueryDetailsAPI,
    updateCustomerQueryAPI,
    resolveCustomerQueryAPI,
} from '../app.config';

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

//Function to get Ticket type Details
export function getTicketTypeDetails(ticketId, token) {

    var setting = {
        method: 'post',
        url: hostURL + getTicketTypeDetailsAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id" : ticketId,
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
        type: 'GET_TICKET_TYPE_DETAILS',
        payload: response
    }
}

export function clearGetTicketTypeResponse() {
    return {
        type: 'GET_TICKET_TYPE_DETAILS',
        payload: undefined
    }
}

//Function to delete Ticket type
export function deleteTicketType(ticketId, token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteTicketTypeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id": ticketId
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
        type: 'DELETE_TICKETTYPE',
        payload: response
    }
}

export function clearDeleteTicketTypeResponse() {
    return {
        type: 'DELETE_TICKETTYPE',
        payload: undefined
    }
}

//Function to create new ticket type
export function createTicketType(values, token) {

    var setting = {
        method: 'post',
        url: hostURL + addTicketTypeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "ticketTypeName":values.ticketName,
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
        type: 'ADD_TICKETTYPE',
        payload: response
    }
}

export function clearNewTicketTypeResponse() {
    return {
        type: 'ADD_TICKETTYPE',
        payload: undefined
    }
}

//Function to update ticket type
export function updateTicketType(values, token) {

    var setting = {
        method: 'post',
        url: hostURL + updateTicketTypeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id":values.id,
                "ticketTypeName":values.ticketTypeName,
                "status":values.status,
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
        type: 'UPDATE_TICKETTYPE',
        payload: response
    }
}

/*********************************************************************************************/

//Function to get all the customer queries
export function getCustomerQueryList(name, status, userType, ticketType, token) {

    var setting = {
        method: 'post',
        url: hostURL + getCustomerQueriesListAPI,
        data: {
            "platform": "web",
            "requestData":{
                "name": name,
                "status": status,
                "userType": userType,
                "ticketType": ticketType,
                "pageNumber": 0,
                "pageSize": 0
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
        type: 'GET_CUSTOMER_QUERY_LIST',
        payload: response
    }
}

//Function to get customer query details
export function getCustomerQueryDetails(ticketId, token) {

    var setting = {
        method: 'post',
        url: hostURL + getCustomerQueryDetailsAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id": ticketId,
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
        type: 'GET_CUSTOMER_QUERY_DETAILS',
        payload: response
    }
}

export function clearCustomerQueryDetailsResponse() {
    return {
        type: 'GET_CUSTOMER_QUERY_DETAILS',
        payload: undefined
    }
}

//Function to mange customer query details
export function manageCustomerQueryDetails(ticketId, values, token) {

    var setting = {
        method: 'post',
        url: hostURL + updateCustomerQueryAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id": ticketId.toString(),
                "ticketTypeId" : (values.ticketTypeId).toString(),
                "replyDescription" : values.feedback,
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
        type: 'MANAGE_CUSTOMER_QUERY_DETAILS',
        payload: response
    }
}

export function clearManageCustomerQueryResponse() {
    return {
        type: 'MANAGE_CUSTOMER_QUERY_DETAILS',
        payload: undefined
    }
}

//Function to resolve customer query details
export function resolveCustomerQueryDetails(ticketId, values, token) {

    var setting = {
        method: 'post',
        url: hostURL + resolveCustomerQueryAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id": ticketId,
                "ticketTypeId" : values.ticketTypeId,
                "resolveDescription" : values.feedback,
                "replyMessage" : values.reply,
                "status" : values.ticketStatus
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
        type: 'RESOLVE_CUSTOMER_QUERY',
        payload: response
    }
}

export function clearResolveCustomerQueryResponse() {
    return {
        type: 'RESOLVE_CUSTOMER_QUERY',
        payload: undefined
    }
}