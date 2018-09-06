import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

//List Components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { logout } from '../actions/accountAction';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    color: '#000',
    fontSize:'14px',
    padding:'0px',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: { 
    height:'64px',
    backgroundColor:'#FFFFFF',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#252b34',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    marginTop:'70px',
    padding : '5px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
    width:'50%'
  },
  logo:{
     margin: 'auto',
     display: 'block',
     width: '40%',
     paddingTop: '15px',
     overflow: 'auto',
  },
  avatarDiv: {
    float:'left',
    width:'55px',
    height:'55px',
    margin:'0px',
    padding:'0px',
  },
  avatarIcon: {
    width:'50px',
    height:'50px',
  }, 
  avatarSpan: {
    color: '#ffffff',
    fontWeight:'bold',
  },  
  ListItem: {
    '&:hover':{
      backgroundColor: '#516072',
    },
    '&:focus': {
      backgroundColor: '#516072',
    },
  },
});

class ResponsiveDrawer extends React.Component {

  state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;
    const children = this.props.children;
    const toolbarStyle = {
        width:'100%',
        padding:'0px',
        backgroundColor: '#5cbbff'
    }
    const { auth, anchorEl, mobileOpen } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} >
            <div>    
                <NavLink to={'/dashboard'}>
                    <img src="../images/vc_nouvo.svg" alt="logo" className={classes.logo} />
                </NavLink>
            </div>    
        </div>
        <Divider />
        <List className={classes.list}>
          {
            <div style={{ color: '#FFFFFF', fontSize:'12px', paddingLeft: '0px' }}> 
            {this.props.userData.user.responseData.menuList
            .sort(((a,b) => a.displayOrder > b.displayOrder))
            .map((value, index) => (
              <Link to={value.link} key={index} style={{textDecoration:'none', color:'#fff'}}>
                <ListItem button disableGutters className={classes.ListItem}>
                  <img src={"../images/" + value.iconName + ".svg"} height="20px" alt="" style={{paddingLeft:'15px'}} />
                  <ListItemText disableTypography primary={value.text} />
                </ListItem>
              </Link>
            ))}
            </div>
          }
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar style={toolbarStyle}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle.bind(this)}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>

            <div style={{width:'100%'}}>
                <div style={{float:'right', position:'relative', margin:'0px'}}>
                    <div className={classes.avatarDiv}>
                        <Avatar src={this.props.userData.user.responseData.profilePicUrl}
                        className={classes.avatarIcon} />
                    </div>
                    {auth && (
                    <div style={{float:'right',verticalAlign:'middle'}}>
                        <span className={classes.avatarSpan}>{this.props.userData.user.responseData.fullName}</span> 
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        >
                        <ArrowDropDown />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                        <MenuItem>
                          <NavLink to="editUserProfile" style={{textDecoration:'none', color:'#000', fontSize:'10pt'}}>
                            Profile
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="logout" style={{textDecoration:'none', color:'#000', fontSize:'10pt'}}>
                            Logout
                            </NavLink>
                        </MenuItem>
                        </Menu>
                    </div>
                    )}
                </div>
            </div>
          </Toolbar>
        </AppBar>
         <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={this.handleDrawerToggle.bind(this)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({logout});
}

ResponsiveDrawer = connect(
    state => ({
      userData: state.account === undefined ? undefined : state.account
    }),
    mapDispatchToProps  //bind logout action creator
)(ResponsiveDrawer)

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
