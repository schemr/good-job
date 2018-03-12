import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.scss';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography'

const header = (props) => (
    <div>
        <AppBar position="static" color="primary" className={classes.Header}>
            <Toolbar>
                { props.isAuth && (
                    <NavLink to="/sentences"><i className="fa fa-list-ul"></i></NavLink>
                )}
                <Typography variant="title" color="inherit" className={classes.Title}>
                    Good Job!
                </Typography>
                { props.isAuth && (
                    <nav className={classes.Nav}>
                        <ul>
                            <li><NavLink to="/logout"><i className="fa fa-sign-out-alt"></i></NavLink></li>
                        </ul>
                    </nav>
                )}
            </Toolbar>
        </AppBar>
        {/* {props.isAuth ? <NavLink to="/sentences"><i className="fa fa-list-ul"></i></NavLink> : null}
        <div className={classes.Title}>Good Job!</div>
        {props.isAuth ? <nav className={classes.Nav}>
            <ul>
                <li><NavLink to="/logout"><i className="fa fa-sign-out-alt"></i></NavLink></li>
            </ul>
        </nav> : null} */}
    </div>
);

export default header;