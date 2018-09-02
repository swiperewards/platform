import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from "react-number-format";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 1,
    backgroundColor: theme.palette.common.white,
    border: '0px solid #ced4da',
    fontSize: 14,
    color:'#000',
    padding: '10px 12px',
    height: '17px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

var maskValue;

function maskInputFields(pattern) {
  return (props) => {
    return (
      <MaskedInput
        {...props}
        mask={pattern}
        placeholderChar={'\u2000'}
        showMask={false}
        guide={false}
      />
    )
  };
}

//Mask textfield control based on maskValue passed
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  console.log("Mask Reg"+props.mymask);
    return (
      <MaskedInput
      {...other}
      ref={inputRef}
      mask={maskValue === undefined ? [''] : maskValue}
      placeholderChar={'\u2000'}
      showMask={false}
      guide={false}
    />
    )
  };

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      thousandSeparator
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CustomizedInputs(props) {
  const { classes } = props;
  maskValue = props.maskReg;
  return (

      <TextField {...props.input}
        error={props.meta.touched ? props.meta.invalid : false}
        helperText={props.meta.touched ? props.meta.error : ''}
        placeholder={props.myPlaceHolder}
        id={props.id}
        ref={props.ref}
        type={props.myType}
        fullWidth = {props.fullWidth}
        width = {props.minWidth}
        InputProps={{
          disableUnderline: false,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          },
          inputComponent:(props.masked ? (props.myMaskType === 'text'? maskInputFields(props.maskReg) : NumberFormatCustom) : null),
          mymask: props.maskReg,
        }}
      />
  );
}

export default withStyles(styles)(CustomizedInputs);