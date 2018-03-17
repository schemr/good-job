import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import firebase from 'firebase';

const styles = {
    Appbar: {
        flexGrow: 1,
        color: "#FFFFFF"
    },
    Title: {
        textAlign: "center",
        flex: 1,
        fontWeight: "bold"
    },
    Button: {
        padding: 0,
        color: "#FFFFFF",
        fontSize: "15px"
    }
  };

class Header extends Component {
    onPushHandler = () => {
        //e.preventDefault();
        const messaging = firebase.messaging();
        messaging.requestPermission()
        .then(function() {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
        })
        .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });
    }

    render() {
        return (
            <div>
                <AppBar color="primary" className={this.props.classes.Appbar}>
                    <Toolbar>
                        { this.props.isAuth && (
                            <button className={this.props.classes.Button} onClick={this.onPushHandler}>
                                <i className="fa fa-bell"></i>
                            </button>
                        )}
                        <Typography variant="title" color="inherit" className={this.props.classes.Title}>
                            Good Job!
                        </Typography>
                        { this.props.isAuth && (
                            <NavLink to="/logout"><i className="fa fa-sign-out-alt"></i></NavLink>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
};

export default withStyles(styles)(Header);