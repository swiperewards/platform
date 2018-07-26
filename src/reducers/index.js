import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import account from './accountReducer';
import common from './commonReducer';

const appReducer = combineReducers({
    account,
    common,
    form: formReducer,
});


const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {
        state = undefined
    }
    
    return appReducer(state, action)
}


export default rootReducer;