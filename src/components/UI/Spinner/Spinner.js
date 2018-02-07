import React from 'react';
import classes from './Spinner.scss';

const spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.bounce1}></div>
        <div className={classes.bounce2}></div>
        <div className={classes.bounce3}></div>
    </div>
);

export default spinner; 