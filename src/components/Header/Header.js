import React from 'react';
import classes from './Header.scss';

const header = () => (
    <header className={classes.Header}>
        <div className={classes.Title}>Good Job!</div>
        {/* <nav className={classes.Nav}>
            <ul>
                <li>Logout</li>
            </ul>
        </nav> */}
    </header>
);

export default header;