import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import account from './accountReducer';
import common from './commonReducer';
import merchant from './merchantReducer';
import deal from './dealReducer';
import admin from './adminReducer';
import ticket from './ticketReducer'

const appReducer = combineReducers({
    account,
    common,
    merchant,
    deal,
    admin,
    ticket,
    form: formReducer,
});


const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {
        state = undefined
    }
    
    return appReducer(state, action)
}


export default rootReducer;