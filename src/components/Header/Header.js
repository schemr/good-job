import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.scss';

const header = (props) => (
    <header className={classes.Header}>
        {props.isAuth ? <NavLink to="/sentences"><i className="fa fa-list-ul"></i></NavLink> : null}
        <div className={classes.Title}>Good Job!</div>
        {props.isAuth ? <nav className={classes.Nav}>
            <ul>
                <li><NavLink to="/logout"><i className="fa fa-sign-out-alt"></i></NavLink></li>
            </ul>
        </nav> : null}
    </header>
);

export default header;