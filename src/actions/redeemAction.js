import { hostURL, getRedeemModeListAPI, createRedeemModeAPI, deleteRedeemModeAPI, updateRedeemModeAPI, getRedeemModeDetailsAPI } from '../app.config';

var axios = require('axios');

//Function to get redeem mode list
export function getRedeemModeList(token) {

    var setting = {
        method: 'post',
        url: hostURL + getRedeemModeListAPI,
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
        type: 'GET_REDEEM_MODES',
        payload: response
    }
}

//Function to create new redeem mode list
export function createNewRedeemMode(values, token) {

    var ArrOptions=[];
    values.options.forEach(element => {
        ArrOptions.push(element.optionName)
    })

    var setting = {
        method: 'post',
        url: hostURL + createRedeemModeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "mode": values.modeName,
                "options": ArrOptions
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
        type: 'CREATE_REDEEM_MODE',
        payload: response
    }
}

export function clearCreateRedeemModeResponse() {
    return {
        type: 'CREATE_REDEEM_MODE',
        payload: undefined
    }
}

//Function to delete redeem mode by mode id
export function deleteRedeemMode(modeId, token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteRedeemModeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id": modeId
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
        type: 'DELETE_REDEEM_MODE',
        payload: response
    }
}

export function clearDeleteRedeemModeResponse() {
    return {
        type: 'DELETE_REDEEM_MODE',
        payload: undefined
    }
}

//Function to update redeem mode details
export function updateRedeemMode(values, token) {

    var ArrOptions=[];
    values.options.forEach(element => {
        ArrOptions.push(element.optionName)
    })

    var setting = {
        method: 'post',
        url: hostURL + updateRedeemModeAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id":values.modeId,
                "mode": values.modeName,
                "options": ArrOptions,
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
        type: 'UPDATE_REDEEM_MODE',
        payload: response
    }
}

export function clearUpdateRedeemDetailsResponse() {
    return {
        type: 'UPDATE_REDEEM_MODE',
        payload: undefined
    }
}

//Function to get redeem mode details
export function getRedeemModeDetails(modeId, token) {

    var setting = {
        method: 'post',
        url: hostURL + getRedeemModeDetailsAPI,
        data: {
            "platform": "web",
            "requestData":{
                "id" : modeId,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => 
        {
            var responseDetails = response.data.responseData
            var output ={
                "message": response.data.message,
                "status":response.data.status,
                "responseData":{
                    "modeId": responseDetails.modeId,
                    "modeName": responseDetails.mode,
                    "status": (responseDetails.status).toString(),
                    "options": 
                    responseDetails.modeOptions.map((option)=>(
                    {
                        "optionName":option.name,
                    }
                    ))
                }
            }
            return output;
        })

        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'GET_REDEEM_MODE_DETAILS',
        payload: response
    }
}

export function clearGetRedeemModeDetailResponse() {
    return {
        type: 'GET_REDEEM_MODE_DETAILS',
        payload: undefined
    }
}