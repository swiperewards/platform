
//Regex expressions for form control validations
const required = value => value && value.trim() !== "" ? undefined : `Required`

const dropDownRequired = value => (value == null ? 'Please Select Value' : undefined)

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
       
const ipAddressMatch = value => value && !/(\d+)(?<!10)\.(\d+)(?<!192\.168)(?<!172\.(1[6-9]|2\d|3[0-1]))\.(\d+)\.(\d+)$/i.test(value) ? 
'Invalid IP Address' : undefined;        

const website = value => 
    value && !/http(s)?:\/\/.?www\.?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/i.test(value) ?
        'Website is required' : undefined;
        
const minimum8 = value => value && !/^.{8,}$/.test(value) ? 'Password must be minimum 8 character' : undefined

const between1to100 = value => value && !/^.{1,100}$/.test(value) ? 'This field only accepts characters strings between 1 and 100 characters long' : undefined

const between0toIntMax = value => value && !/^\d{0,2147483647}$/i.test(value) ? 'Annual CC Sale should not be more than 2147483647' : undefined

const exact9 = value => value && !/^.{10,10}$/.test(value) ? 'Field should be 9 chatacters long' : undefined

const percentage = value => value && !/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i.test(value) ?
'Invalid percent value' : undefined

//Expression array for Input control masking
const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const taxNumberMask = [/[1-9]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const zipMask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const ssnMask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const drivingLicenseMask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];


const normalizedPhone = /\D/g;

export {
    required, 
    dropDownRequired, 
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
    between0toIntMax,
}