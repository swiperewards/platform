//react redux
import React, { Component } from 'react';
import { Field } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Validation
import { dropDownRequired, ipAddressMatch } from '../../utilities/validation'

//Components
import InputField from '../../components/inputField';
import { renderSelectField } from '../../components/selectControl';
import Loader from '../../components/loader';
import RenderSwitch from '../../components/switchControl';

//Data
import Data from '../../staticData'

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft: '0px',
    },
    selectControl: {
        fontSize: '12px',
    },
    row: {
        fontSize: '12px',
        '&:nth-of-type(odd)': {
            backgroundColor: '#f2f4f6',
        },
    },
};

class AccountSetup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardingStatus: '',
            merchanttype: '',
            termsCheckedNo: true,
            termsCheckedYes: false,
            openMCCPopUp: false,
            updatedList: Data.mccCodes,
            mccNumber: '',
        };

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleMCCPopUp = (event) => {
        this.setState({ showLoader: true })
        event.target.blur()
        this.setState({ openMCCPopUp: true });
        this.setState({ updatedList: Data.mccCodes });
    };

    handleClose = () => {
        this.setState({ showLoader: false })
        this.setState({ openMCCPopUp: false });
    };

    selectMCCCode = (code, myProps) => {
        myProps.change('mccNumber', code);

        this.setState({ mccNumber: code })
        this.handleClose();
    }

    onHandleSearch = (searchValue) => {
        var filteredList

        if (searchValue.target.value === '') {
            filteredList = Data.mccCodes
        }
        else {
            const regex = new RegExp(searchValue.target.value, 'i');
            filteredList = Data.mccCodes.filter((datum) => {
                return (datum.edited_description.search(regex) > -1);
            });
        }

        this.setState({ updatedList: filteredList });
    }

    componentDidMount() {
        if (this.refs.boardingStatus) {
            this.setState({ boardingStatus: this.refs.boardingStatus.value })
        }

        if (this.refs.termsCheckedYes) {
            this.setState({ termsCheckedYes: this.refs.termsCheckedYes.value })
        }
    }

    render() {

        const { myProps } = this.props;

        return (
            <div style={{ paddingBottom: '20px' }}>
                <Loader status={this.state.showLoader} />
                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel">
                            <FormLabel component="legend">ACCOUNT SETUP</FormLabel>
                        </div>
                        <Divider />
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3" >
                                Boarding Status*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Field
                                        name="boardingStatus"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        onChange={this.handleChange('boardingStatus')}
                                        label={this.state.boardingStatus}
                                        ref="boardingStatus"
                                        validate={dropDownRequired}
                                    >
                                        {
                                            Data.boardingStatus.map((item) => {
                                                return <MenuItem
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            })
                                        }
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                {
                                    this.state.boardingStatus === "0" ?
                                        "Add MCC" : "Add MCC*"
                                }
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field
                                    myType="number"
                                    name="mccNumber"
                                    id="mccNumber"
                                    ref="mccNumber"
                                    fullWidth={true}
                                    onFocus={this.handleMCCPopUp}
                                    component={InputField}
                                />
                                <Dialog
                                    open={this.state.openMCCPopUp}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"MCC CODES"}</DialogTitle>
                                    <DialogContent>
                                        <Field
                                            myType="text"
                                            myPlaceHolder="Search Text"
                                            name="searchBox"
                                            fullWidth={true}
                                            component={InputField}
                                            onChange={this.onHandleSearch}
                                        />
                                        <List>
                                            {
                                                this.state.updatedList.map((item, index) => {
                                                    return (
                                                        <ListItem key={index} button disableGutters divider onClick={() => this.selectMCCCode(item.mcc, myProps)}>
                                                            <ListItemText disableTypography primary={item.mcc + " - " + item.combined_description} />
                                                        </ListItem>
                                                    )

                                                })
                                            }
                                        </List>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">
                                Merchant Type
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 start-md">
                                <FormControl style={styles.formControl}>
                                    <Field
                                        name="merchantType"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            Data.merchantType.map((item, index) => {
                                                return <MenuItem
                                                    style={styles.selectControl}
                                                    key={index}
                                                    value={item.prefix}>
                                                    {item.name}
                                                </MenuItem>
                                            })
                                        }
                                    </Field>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Accept Terms and Conditions
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field
                                    name="termsCheckedYes"
                                    ref="termsCheckedYes"
                                    id="termsCheckedYes"
                                    component={RenderSwitch}
                                    onChange={this.handleCheckboxChange('termsCheckedYes')}
                                />
                            </div>
                        </div>
                        {this.state.termsCheckedYes === true ? (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Date of Acceptance
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="date" name="acceptanceDate" fullWidth={true} component={InputField} />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        IP Address
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="ipAddress" fullWidth={true} component={InputField} validate={ipAddressMatch} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        Time
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="time" name="acceptanceTime" fullWidth={true} component={InputField} />
                                    </div>
                                </div>
                            </React.Fragment>

                        ) : (null
                            )}
                    </div>
                </Paper>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         initialValues: state.merchant.merchantDetails === undefined ? undefined : state.merchant.merchantDetails.responseData
//     }
// }

export default connect(null, null)(AccountSetup);
