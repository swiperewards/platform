
//Regex expressions for form control validations
const required = value => value && value.trim() !== "" ? undefined : `Required`
const requiredCheckbox = value => value ? undefined : `Required`
const dropDownRequired = value => (value === undefined ? 'Please Select Value' : undefined)
const dateRequired = value => (value === undefined || value ==='' ? 'Please Select Date' : undefined)

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
       
const ipAddressMatch = value => value && !/^(([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+))$/.test(value) ? 
'Invalid IP Address' : undefined;

const website = value => 
    value && !/http(s)?:\/\/.?www\.?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/i.test(value) ?
        'Website is required' : undefined;
        
const minimum8 = value => value && !/^.{8,}$/.test(value) ? 'Password must be minimum 8 character' : undefined

const between1to100 = value => value && !/^.{1,100}$/.test(value) ? 'This field only accepts characters strings between 1 and 100 characters long' : undefined

const between5to20 = value => value && !/^.{5,20}$/.test(value) ? 'This field only accepts characters strings between 5 and 20 characters long' : undefined

const exact9 = value => value && !/^.{9,9}$/.test(value.replace(normalizedPhone,'')) ? 'Field should be 9 chatacters long' : undefined

const percentage = value => value && !/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i.test(value) ?
'Invalid percent value' : undefined

const drivingLicense = value => value && !/^[a-zA-Z0-9]{0,15}$/.test(value) ? 'Invalid driving license' : undefined

const between5to9 = value => value && !/^.{5,9}$/.test(value) ? 'This field only accepts characters strings between 5 and 9 characters long' : undefined
const between5to16 = value => value && !/^.{5,16}$/.test(value) ? 'This field only accepts characters strings between 5 and 16 characters long' : undefined


//Expression array for Input control masking
const phoneMask = "(###) ###-####"; 
const taxNumberMask = "##-#######"; 
const zipMask = "#####-####"; 
const ssnMask = "###-##-####"; 
const drivingLicenseMask = "###############"; 


const normalizedPhone = /\D/g;

export {
    required, 
    dropDownRequired, 
    requiredCheckbox,
    email, 
    website, 
    minimum8, 
    phoneMask, 
    taxNumberMask, 
    zipMask, 
    ssnMask, 
    percentage, 
    drivingLicenseMask, 
    normalizedPhone, 
    exact9, 
    ipAddressMatch,
    between1to100,
    between5to20,
    drivingLicense,
    between5to16,
    between5to9,
    dateRequired,
}