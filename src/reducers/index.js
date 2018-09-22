import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import account from './accountReducer';
import common from './commonReducer';
import merchant from './merchantReducer';
import deal from './dealReducer';
import admin from './adminReducer';
import ticket from './ticketReducer';
import userAccount from './userReducer';
import redeem from './redeemReducer';

const appReducer = combineReducers({
    account,
    common,
    merchant,
    deal,
    admin,
    ticket,
    userAccount,
    redeem,
    form: formReducer,
});


const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {
        state = undefined
    }
    
    return appReducer(state, action)
}


export default rootReducer;