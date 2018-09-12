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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

//Validation
import { required, requiredCheckbox, dropDownRequired, ipAddressMatch } from '../../utilities/validation'

//Components
import InputField from '../../components/inputField';
import { renderSelectField } from '../../components/selectControl';
import Loader from '../../components/loader';
import RenderSwitch from '../../components/switchControl';
import RenderCheckbox from '../../components/renderCheckbox';

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
            openTermsPopUp: false,
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

    handleTermsPopUp = name => event => {
        this.setState({ [name]: event.target.checked });
        if(event.target.checked === true){
            this.setState({ openTermsPopUp: true });
        }
    };

    handleClose = () => {
        this.setState({ showLoader: false })
        this.setState({ openMCCPopUp: false });
        this.setState({openTermsPopUp: false});
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
                                Add MCC* 
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
                                    validate={required}
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
                                        IP Address
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <Field myType="text" name="ipAddress" fullWidth={true} component={InputField} validate={ipAddressMatch} />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                        <FormControlLabel
                                                    control={
                                                        <Field 
                                                            name="terms" 
                                                            id="terms" 
                                                            myStyle={styles} 
                                                            component={RenderCheckbox} 
                                                            onChange={this.handleTermsPopUp('terms')}
                                                            validate={requiredCheckbox}
                                                        />
                                                    }
                                                    label="Terms and Conditions"
                                        />   

                                        <Dialog
                                            open={this.state.openTermsPopUp}
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                        <DialogTitle id="alert-dialog-title">{"Terms and conditions"}</DialogTitle>
                                        <DialogContent>                                                    
                                                    <DialogContentText>Privacy Policy<br/>Effective date: September 07, 2018</DialogContentText><br/>

                                                    <DialogContentText>Swipe Inc ("us", "we", or "our") operates the website and the Nouvo mobile application (the "Service").</DialogContentText><br/>

                                                    <DialogContentText>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Swipe Inc is managed through Free Privacy Policy.</DialogContentText><br/>

                                                    <DialogContentText>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</DialogContentText><br/>

                                                    <DialogContentText>Information Collection And Use<br/>We collect several different types of information for various purposes to provide and improve our Service to you.</DialogContentText><br/>

                                                    <DialogContentText>Types of Data Collected<br/>Personal Data<br/>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</DialogContentText><br/>

                                                    <DialogContentText>Email address<br/>First name and last name<br/>Address, State, Province, ZIP/Postal code, City<br/>Cookies and Usage Data<br/>Usage Data<br/>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</DialogContentText><br/>

                                                    <DialogContentText>This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</DialogContentText><br/>

                                                    <DialogContentText>When you access the Service by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</DialogContentText><br/>

                                                    <DialogContentText>Tracking & Cookies Data<br/>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</DialogContentText><br/>

                                                    <DialogContentText>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</DialogContentText><br/>

                                                    <DialogContentText>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</DialogContentText><br/>

                                                    <DialogContentText>Examples of Cookies we use:</DialogContentText><br/>

                                                    <DialogContentText>Session Cookies. We use Session Cookies to operate our Service.<br/>Preference Cookies. We use Preference Cookies to remember your preferences and various settings.<br/>Security Cookies. We use Security Cookies for security purposes.</DialogContentText><br/>

                                                    <DialogContentText>Use of Data<br/>Swipe Inc uses the collected data for various purposes:</DialogContentText><br/>

                                                    <DialogContentText>To provide and maintain the Service<br/>To notify you about changes to our Service<br/>To allow you to participate in interactive features of our Service when you choose to do so<br/>To provide customer care and support<br/>To provide analysis or valuable information so that we can improve the Service<br/>To monitor the usage of the Service<br/>To detect, prevent and address technical issues</DialogContentText><br/>

                                                    <DialogContentText>Transfer Of Data<br/>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</DialogContentText><br/>

                                                    <DialogContentText>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</DialogContentText><br/>

                                                    <DialogContentText>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</DialogContentText><br/>

                                                    <DialogContentText>Swipe Inc will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</DialogContentText><br/>

                                                    <DialogContentText>Disclosure Of Data<br/>Legal Requirements<br/>Swipe Inc may disclose your Personal Data in the good faith belief that such action is necessary to:</DialogContentText><br/>

                                                    <DialogContentText>To comply with a legal obligation<br/>To protect and defend the rights or property of Swipe Inc<br/>To prevent or investigate possible wrongdoing in connection with the Service<br/>To protect the personal safety of users of the Service or the public<br/>To protect against legal liability</DialogContentText><br/>

                                                    <DialogContentText>Security Of Data<br/>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</DialogContentText><br/>

                                                    <DialogContentText>Service Providers<br/>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</DialogContentText><br/>

                                                    <DialogContentText>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</DialogContentText><br/>

                                                    <DialogContentText>Links To Other Sites<br/>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</DialogContentText><br/>

                                                    <DialogContentText>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</DialogContentText><br/>

                                                    <DialogContentText>Children's Privacy<br/>Our Service does not address anyone under the age of 18 ("Children").</DialogContentText><br/>

                                                    <DialogContentText>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</DialogContentText><br/>

                                                    <DialogContentText>Changes To This Privacy Policy<br/>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</DialogContentText><br/>

                                                    <DialogContentText>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</DialogContentText><br/>

                                                    <DialogContentText>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</DialogContentText><br/>

                                                    <DialogContentText>Contact Us<br/>If you have any questions about this Privacy Policy, please contact us:</DialogContentText><br/>

                                                    <DialogContentText>By email: admin@nouvo.com<br/>By phone number: 3234287967<br/>By mail: 1433 N Harper Ave Suite 5, Los Angeles, CA 90046</DialogContentText><br/>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>        
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
