import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 170,
  },
  inputOptions:{
    fontSize: '12px',
  },
});

class SelectOption extends React.Component {
  state = {
    open: false,
  } 

  handleChange(field, value) {
    this.setState({ [field]: Number(value) });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            className={classes.inputOptions}
            onChange={this.handleChange}
            value={this.props.stateValue}
          >
            {
                this.props.menuItems.map((item) =>{
                    return <MenuItem 
                    className={classes.inputOptions}
                    value={item.prefix}>
                    {item.name.toUpperCase()}
                    </MenuItem>
                })
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectOption.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectOption);