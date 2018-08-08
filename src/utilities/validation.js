
//Regex expressions for form control validations
const required = value => value && value.trim() !== "" ? undefined : `Required`

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

const website = value => 
    value && !/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i.test(value) ?
        'Website is required' : undefined;

const minimum8 = value => value && !/^.{8,}$/.test(value) ? 'Password must be minimum 8 character' : undefined

const percentage = value => value && !/^((100)|(\d{0,2}))$/i.test(value) ?
'required' : undefined

//Expression array for Input control masking
const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const taxNumberMask = [/[1-9]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const zipMask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const ssnMask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const drivingLicenseMask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];


export {
    required, email, website, minimum8, phoneMask, taxNumberMask, zipMask, ssnMask, percentage, drivingLicenseMask
}