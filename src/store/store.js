import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import logger from 'redux-logger';


export default function configureStore(initialState){
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger)
    );
    return store;
}