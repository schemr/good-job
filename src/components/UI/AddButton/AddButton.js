import React from 'react';
import classes from './AddButton.scss';

const addButton = (props) => (
    <div className={classes.addButton}>
        <button onClick={props.addedButton}>+</button>
    </div>
);

export default addButton;