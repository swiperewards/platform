import { hostURL, addMerchantAPI, deleteMerchantAPI, getMerchantsFilterAPI, getMerchantDetailAPI, updateMerchantDetailAPI } from '../app.config';
import {normalizedPhone} from '../utilities/validation'
import moment from 'moment'

var axios = require('axios');

//Function to add new merchant to processing system
export function addNewMerchant(values, token) {

    var acceptanceDate = (values.acceptanceDate === undefined ? "00000000" : (values.acceptanceDate).replace(normalizedPhone,''))
    var acceptanceTime = (values.acceptanceTime === undefined ? "0000" : (values.acceptanceTime).replace(normalizedPhone,''))
    var acceptanceDateTime = acceptanceDate + acceptanceTime

    var setting = {
        method: 'post',
        url: hostURL + addMerchantAPI,
        data: {
	        "requestData":{
		        "new": values.isCreditCardYes ? "0" : "1",
                "established": values.businessPeriod === undefined ? undefined : (values.businessPeriod).replace(normalizedPhone,''),
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
		
                "entityTcAcceptDate": acceptanceDateTime,
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

export function clearMerchantUpdateState() {
    return {
        type: 'UPDATE_MERCHANTDETAILS',
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
        response => 
        {
            var responseDetails = response.data.responseData
            var output ={
                "message": response.data.message,
                "status":response.data.status,
                "responseData":{
                    "businessType": responseDetails.type_v,
                    "isPublicCompany": responseDetails.public_v,
                    "businessName": responseDetails.name_v,
                    "dba": responseDetails.dba_v,
                    "taxId": responseDetails.ein_v,
                    "servicePhone": responseDetails.customerPhone_v,
                    "businessPeriod": moment(responseDetails.established_v).format('YYYY-MM-DD') ,  
                    "businessWebsite": responseDetails.website_v,
                    "isCreditCardNo": responseDetails.annualCCSales_v !== ""? false: true,
                    "isCreditCardYes": responseDetails.annualCCSales_v !== ""? true: false,
                    "ccSale":responseDetails.annualCCSales_v,    
                    "businessPhone": responseDetails.phone_v,   
                    "businessFax": responseDetails.fax_v,
                    "businessAddress":responseDetails.address1_v,
                    "businessAddress2":responseDetails.address2_v,
                    "businessCity":responseDetails.city_v,
                    "businessZip":responseDetails.zip_v,
                    "businessEmail":responseDetails.email_v,
                    "businessStateName":responseDetails.state_v,
                    "boardingStatus":responseDetails.status_v,
                    "mccNumber":responseDetails.mcc_v,
                    "merchantType":responseDetails.environment_v,
                    "acceptanceDate":moment((responseDetails.tcAcceptDate_v).substring(0,8)).format('YYYY-MM-DD') ,
                    "ipAddress":responseDetails.tcAcceptIp_v,
                    "acceptanceTime":moment((responseDetails.tcAcceptDate_v).substring(9,12)).format('HH:MM'),
                    "bankAccountType":responseDetails.accounts.account_v.method.toString(),
                    "routeNumber":responseDetails.accounts.account_v.routing,
                    "accountNumber":responseDetails.accounts.account_v.number,
                    "entityId": responseDetails.entityId_v,
                    "accountId": responseDetails.accounts.id,
                    "merchantId":responseDetails.id,
                    "members": 
                    responseDetails.members.map((owner)=>(
                    {
                        "memberId":owner.id,
                        "merchantId":owner.merchant_v,
                        "ownerBusinessTitle": owner.title_v,
                        "ownerFirstName": owner.first_v,
                        "ownerLastName": owner.last_v,
                        "ownerDob": owner.dob_v === undefined ? undefined : moment((owner.dob_v).replace(normalizedPhone,'')).format('YYYY-MM-DD'),
                        "ownership": (owner.ownership_v/100).toString(),
                        "ownerEmail":owner.email_v,
                        "ownerSsn":owner.ssn_v === undefined ? undefined : (owner.ssn_v).replace(normalizedPhone,''),
                        "ownerAddress":owner.address1_v,
                        "ownerAddress2":owner.address2_v,
                        "ownerCity":owner.city_v,	
                        "ownerState":owner.state_v,
                        "ownerZip":owner.zip_v === undefined ? undefined : (owner.zip_v).replace(normalizedPhone,''),
                        "ownerDrivingLicense":owner.dl_v,
                        "ownerDlState":owner.dlstate_v,
                        "primary":owner.primary_v,
                        "ownerPhone":owner.phone_v === undefined ? undefined : (owner.phone_v).replace(normalizedPhone,''),
                    }
                    ))
                }
            }

            return output;
        }
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

//Function to update merchant details to processing system
export function updateMerchantDetails(values, screenType, token) {

    var acceptanceDate = (values.acceptanceDate === undefined ? "00000000" : (values.acceptanceDate).replace(normalizedPhone,''))
    var acceptanceTime = (values.acceptanceTime === undefined ? "0000" : (values.acceptanceTime).replace(normalizedPhone,''))
    var acceptanceDateTime = acceptanceDate + acceptanceTime

    var setting = {
        method: 'post',
        url: hostURL + updateMerchantDetailAPI,
        data: {
	        "requestData":{
		        "accountData": {
                    "accountId": values.accountId,
                    "account": {
                        "method": values.bankAccountType,
                        "number": values.accountNumber,
                        "routing": values.routeNumber
                    },
                    "isRecordUpdated":screenType === "bankAccount" ? "1" : "0"
                },
                "memberData":
                    values.owners !== undefined 
                    ?
                        (
                            values.owners.map((owner)=>(
                                {
                                    "merchant":owner.merchantId,
                                    "memberId":owner.memberId,
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
                                    "phone":owner.ownerPhone === undefined ? undefined : (owner.ownerPhone).replace(normalizedPhone,''),
                                    "isRecordUpdated":screenType === "memberDetails" ? "1" : "0",
                                    "isNewRecord":  "0"
                                }
                            )
                        )
                    )
                    :
                    (
                        [{
                            "isRecordUpdated":screenType === "memberDetails" ? "1" : "0",
                            "isNewRecord":  "0"
                        }]
                    ),
                "merchantData": {
                    "merchantId":values.merchantId,
                    "new": values.isCreditCardYes ? "0" : "1",
                    "established": values.businessPeriod === undefined ? undefined : (values.businessPeriod).replace(normalizedPhone,''), 
                    "annualCCSales": values.isCreditCardYes ? "0" : (values.ccSale === undefined ? undefined : (values.ccSale).replace(normalizedPhone,'')),
                    "dba":values.dba,
                    "mcc":values.mccNumber,
                    "environment":values.merchantType,
                    "status":values.boardingStatus,
                    "isRecordUpdated": screenType === "businessDetails" ? "1" : "0"
                },
                "entityData": {
                    "entityId": values.entityId,
                    "type": values.businessType,
                    "name": values.businessName === undefined ? (values.owners[0].ownerFirstName + ' ' + values.owners[0].ownerLastName) : values.businessName,
                    "address1": values.businessAddress,
                    "address2": values.businessAddress2,
                    "city": values.businessCity,
                    "state": values.businessStateName,
                    "zip": values.businessZip === undefined ? undefined : (values.businessZip).replace(normalizedPhone,''),
                    "phone": values.businessPhone === undefined ? undefined : (values.businessPhone).replace(normalizedPhone,''),
                    "fax":  values.businessFax === undefined ? undefined : (values.businessFax).replace(normalizedPhone,''),
                    "email": values.businessEmail,
                    "website": values.businessWebsite,
                    "ein": values.taxId === undefined ? undefined : (values.taxId).replace(normalizedPhone,''),
                    "public": values.publicCompany,
                    "customerPhone": values.servicePhone === undefined ? undefined : (values.servicePhone).replace(normalizedPhone,''),
                    "tcAcceptDate": acceptanceDateTime,
                    "tcAcceptIp": values.ipAddress,
                    "boardingStatus":values.boardingStatus,
                    "merchantType":values.merchantType,
                    "isRecordUpdated":screenType === "businessDetails" ? "1" : "0",
                }
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
        type: 'UPDATE_MERCHANTDETAILS',
        payload: response
    }
}