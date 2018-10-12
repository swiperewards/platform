//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

//Components
import DialogBox from '../../components/alertDialog'
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'
import TextAreaControl from '../../components/textAreaControl';

//Actions
import { getQueryType, generateTicket, clearGenerateTicketResponse } from '../../actions/ticketAction';

//Validation
import { dropDownRequired, required} from '../../utilities/validation'

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      }
};

class ContactUs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            message:'',
            queryTypeList:'',
        }
    }

    componentWillMount(){
        errorMessage = "";

        if(this.props.userData.user.responseData.token){
            this.props.getQueryType(this.props.userData.user.responseData.token);
        }
    }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps) {
          if (nextProps.queryTypeResponse){
            if(nextProps.queryTypeResponse.status === 200){
                this.setState({showLoader:false})
                this.setState({queryTypeList: nextProps.queryTypeResponse.responseData})
            }
          }

          if (nextProps.generateTicketResponse){
            if(nextProps.generateTicketResponse.status === 200){
                this.setState({message: nextProps.generateTicketResponse.message})
                this.setState({ dialogOpen: true });
                this.setState({showLoader:false})
            }
            else{
                errorMessage =
                    <div 
                        className="errorDiv"
                    >{nextProps.generateTicketResponse.message}</div>
                    this.setState({showLoader:false})
            }

            this.props.clearGenerateTicketResponse()
          }

          if(nextProps.userData){
            if(nextProps.userData.user){
                this.setState({showLoader:false})
                nextProps.change('fullName', nextProps.userData.user.responseData.fullName);
                nextProps.change('email', nextProps.userData.user.responseData.emailId);
            }
          }
        }
    }

      onSubmit(values) {

        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.generateTicket(values, this.props.userData.user.responseData.token)
        }
      }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };


    cancelClick(){
        this.props.history.goBack();
    }

    render() {
        const {  dialogOpen } = this.state;

        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        return (
            <div style={{paddingBottom:'20px'}}>
                <Loader status={this.state.showLoader} />
                <DialogBox 
                        displayDialogBox={dialogOpen} 
                        message={this.state.message} 
                        actions={actions} 
                />  
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper" style={{backgroundImage: `url(${"/images/map.png"})`, backgroundSize: "100%"}}>
                    <Paper className="pagePaper" style={{margin:"10% 15%"}}>
                          <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12 titleLabel">
                                            Contact us
                                        </div> 
                                    </div>   
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>
                                                Our mission is simple -
                                                <br/>we aim to empower the small business with unrivaled analytics, retention, and processing.
                                                <span className="highlight">
                                                <br/>
                                                <i>And we do it all for free.</i>
                                                </span>
                                            </span>
                                        </div> 
                                    </div>  
                                    <div className="row">
                                        <div className="col-md-12 titleLabel">
                                            Details
                                        </div> 
                                    </div> 
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>
                                                youremailid@nouvo.com
                                                <br/>+1 555 5555 6521
                                                <br/>1234, Mandup Street, Unit 000,
                                                <br/>Somecity, NC, 12345

                                            </span>
                                        </div> 
                                    </div>  
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12 titleLabel">
                                            Send a Message
                                        </div>
                                    </div>    
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="controlLabel">Name</label>
                                            <Field 
                                                name="fullName" 
                                                fullWidth={true} 
                                                component={InputField} 
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="controlLabel">Email</label>
                                            <Field 
                                                name="email" 
                                                fullWidth={true} 
                                                component={InputField} 
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                             <label className="controlLabel">Query Type</label>

                                            <FormControl style={styles.formControl}>
                                                <Field
                                                    name="ticketType"
                                                    component={renderSelectField}
                                                    fullWidth={true}
                                                    onChange={this.handleChange}
                                                    validate={dropDownRequired}
                                                >
                                                {
                                                     (this.state.queryTypeList) ? 
                                                        this.state.queryTypeList.map((item) =>{
                                                            return <MenuItem 
                                                                    style={styles.selectControl}
                                                                    key={item.id}
                                                                    value={item.id}>
                                                                    {item.ticketTypeName}
                                                            </MenuItem>
                                                            })
                                                        :
                                                        null
                                                }
                                                </Field>    
                                            </FormControl>  
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="controlLabel">Message</label>
                                            <Field 
                                                name="message" 
                                                fullWidth={true} 
                                                component={TextAreaControl} 
                                                validate={required}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button 
                                                type="submit"
                                                className="button"
                                                > Send Message
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                          </div>          
                    </Paper>
                </Paper> 
                </form>
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getQueryType, generateTicket, clearGenerateTicketResponse }, dispatch)
  }

  ContactUs = reduxForm({
    form: 'frmContactUs',
})(ContactUs)

ContactUs = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
       queryTypeResponse: state.ticket === undefined ? undefined : state.ticket.queryType,
       generateTicketResponse : state.ticket.generateTicket === undefined ? undefined : state.ticket.generateTicket, 
    }),
    mapDispatchToProps,
  )(ContactUs)

export default ContactUs;