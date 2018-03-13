import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
    Appbar: {
        flexGrow: 1,
        color: "#FFFFFF"
    },
    Title: {
        textAlign: "center",
        flex: 1,
        fontWeight: "bold"
    }
  };
  

const header = (props) => (
    <div>
        <AppBar color="primary" className={props.classes.Appbar}>
            <Toolbar>
                { props.isAuth && (
                    <NavLink to="/sentences"><i className="fa fa-list-ul"></i></NavLink>
                )}
                <Typography variant="title" color="inherit" className={props.classes.Title}>
                    Good Job!
                </Typography>
                { props.isAuth && (
                    <NavLink to="/logout"><i className="fa fa-sign-out-alt"></i></NavLink>
                )}
            </Toolbar>
        </AppBar>
    </div>
);

export default withStyles(styles)(header);