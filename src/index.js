import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import defaultTheme from './scss/theme-default'
import '../src/scss/styles.css'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={defaultTheme}>    
            <Routes />
        </MuiThemeProvider>
    </Provider>, 
document.getElementById('root'));

registerServiceWorker();