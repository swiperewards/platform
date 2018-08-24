import { hostURL, addMerchantAPI, deleteMerchantAPI, getMerchantsFilterAPI, getMerchantDetailAPI } from '../app.config';
import {normalizedPhone} from '../utilities/validation'

var axios = require('axios');

//Function to add new merchant to processing system
export function addNewMerchant(values, token) {

    var setting = {
        method: 'post',
        url: hostURL + addMerchantAPI,
        data: {
	        "requestData":{
		        "new": "0",
                "established": "20101020", 
                "annualCCSales": values.ccSale === undefined ? undefined : (values.ccSale).replace(normalizedPhone,''),
                "mcc": values.mccNumber,
                "dba": values.dba,
                "status": values.boardingStatus,
                "entityType": values.businessType,
                "entityName": values.businessName === undefined ? (values.owners[0].ownerFirstName + ' ' + values.owners[0].ownerLastName) : values.businessName,
                "entityEnvironment":values.merchantType,
                "entityAddress1": values.businessAddress,
                "entityAddress2":values.businessAddress2,
                "entityCity": values.businessCity,
                "entityState": values.businessStateName,
                "entityZip": values.businessZip === undefined ? undefined : (values.businessZip).replace(normalizedPhone,''),
                "entityCountry": "USA",
                "entityPhone": values.businessPhone === undefined ? undefined : (values.businessPhone).replace(normalizedPhone,''),
                "entityCustomerPhone":values.servicePhone === undefined ? undefined : (values.servicePhone).replace(normalizedPhone,''),
                "entityFax": values.businessFax === undefined ? undefined : (values.businessFax).replace(normalizedPhone,''),
                "entityEmail": values.businessEmail,
                "entityEin": values.taxId === undefined ? undefined : (values.taxId).replace(normalizedPhone,''),
                "entityPublic": values.publicCompany,
                "entityWebsite": values.businessWebsite,
                "entityaccounts": [{
                    "primary": "1",
                    "accountMethod": values.bankAccountType,
                    "accountNumber": values.accountNumber,
                    "accountRouting": values.routeNumber
                }],
		
                "entityTcAcceptDate": "198703051215", //values.acceptanceDate+values.acceptanceTime,
                "entityTcAcceptIp":values.ipAddress,

                "members": 
                    values.owners.map((owner)=>(
                    {
                        "title": owner.ownerBusinessTitle,
                        "first": owner.ownerFirstName,
                        "last": owner.ownerLastName,
                        "dob": owner.ownerDob === undefined ? undefined : (owner.ownerDob).replace(normalizedPhone,''),
                        "ownership": (parseFloat(owner.ownership)) * 100,
                        "email":owner.ownerEmail,
                        "ssn":owner.ownerSsn === undefined ? undefined : (owner.ownerSsn).replace(normalizedPhone,''),
                        "address1":owner.ownerAddress,
                        "address2":owner.ownerAddress2,
                        "city":owner.ownerCity,	
                        "state":owner.ownerState,
                        "zip":owner.ownerZip === undefined ? undefined : (owner.ownerZip).replace(normalizedPhone,''),
                        "country":"USA",
                        "timezone":"est",
                        "dl":owner.ownerDrivingLicense,
                        "dlstate":owner.ownerDlState,
                        "primary":"1",
                        "phone":owner.ownerPhone === undefined ? undefined : (owner.ownerPhone).replace(normalizedPhone,''),
                    }
                    ))
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
        type: 'ONBOARD_MERCHANT',
        payload: response
    }
}

export function ClearMerchantState() {
    return {
        type: 'ONBOARD_MERCHANT',
        payload: undefined
    }
}


//Function to delete merchant from splash payment system
export function deleteMerchant(merchantId,token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteMerchantAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "merchantId" : merchantId,
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
        type: 'DELETE_MERCHANT',
        payload: response
    }
}

//Function to fetch list of all merchants from splash payment system
export function getMerchantListWithFilter(name, inactive, statePrefix, token) {

    var setting = {
        method: 'post',
        url: hostURL + getMerchantsFilterAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "nameFilter" : name === undefined ? "" : name,
                "inactiveFilter" : inactive === undefined ? "" : inactive,
                "stateFilter": statePrefix === undefined ? "" : statePrefix
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
        type: 'GET_MERCHANTS',
        payload: response
    }
}

//Function to get merchant details from splash payment system
export function getMerchantDetailsAPI(merchantId,token) {

    var setting = {
        method: 'post',
        url: hostURL + getMerchantDetailAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "merchantId" : merchantId,
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
        type: 'GET_MERCHANT_DETAILS',
        payload: response
    }
}