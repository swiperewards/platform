import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue600, grey900 } from '@material-ui/core/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  Button: {
    primaryColor: blue600,
  },
  stepper: {
    iconColor: 'rgb(38, 165, 238)'
  },
  fontFamily: 'Montserrat, sans-serif'
});


export default themeDefault;