import { hostURL, addMerchantAPI } from '../app.config';
var axios = require('axios');

//Function to add new merchant to processing system
export function addNewMerchant(values) {

    var setting = {
        method: 'post',
        url: hostURL + addMerchantAPI,
        data: {
	        "requestData":{
		        "new": "0",
                "established": "20101020", 
                "annualCCSales": "1000000", //Annual CC Sales *
                "mcc": "8111",//Add MCC *
                "dba":"", //DBA - Statement Descriptor #taken
                "status": "1",//Boarding Status*
                "entityLogin": "t1_log_5b59a54baf609892736b7db", //hardcode
                "entityType": "2", //Business Type (e.g. LLC)*
                "entityName": "Some company new", //Legal Business Name *
                "entityEnvironment":"", //Merchant Type #taken
                "entityAddress1": "123 North 12 St", //Address*
                "entityAddress2":"",//Address 2 #taken
                "entityCity": "Miami", //City*
                "entityState": "FL", //State*
                "entityZip": "33024", //Zip*
                "entityCountry": "USA", //#
                "entityPhone": "1234567891", //Phone*
                "entityCustomerPhone":"", //Customer Service Phone customerPhone #taken
                "entityFax":"", //Fax #taken
                "entityEmail": "support@example.com", //Email*
                "entityEin": "123456789", //Tax ID Number *
                "entityPublic": "1", //Business Type (e.g. LLC)*
                "entityWebsite": "http://www.example.com", //Website*
                "entityaccounts": [{
                    "primary": "1", //#
                    "accountMethod": "8",//Bank Account Type*
                    "accountNumber": "023456789012345",//Bank Account Number*
                    "accountRouting": "063013924"//Bank Routing Number*
                }],
		
                "entityTcAcceptDate":"", // tcAcceptDate Date of Acceptance #taken
                "entityTcAcceptIp":"", //tcAcceptIp IP Address #taken
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : ''
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
        type: 'VALIDATE_USER',
        payload: response
    }
}