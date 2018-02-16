import React from 'react';
import classes from './Header.scss';

const header = (props) => (
    <header className={classes.Header}>
        {props.isAuth ? "List" : null}
        <div className={classes.Title}>Good Job!</div>
        {props.isAuth ? <nav className={classes.Nav}>
            <ul>
                <li>Logout</li>
            </ul>
        </nav> : null}
    </header>
);

export default header;