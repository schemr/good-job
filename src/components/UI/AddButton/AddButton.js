import React from 'react';
import classes from './AddButton.scss';

const addButton = (props) => (
    <div className={classes.addButton}>
        <button onClick={props.addedButton}><i className="fa fa-2x fa-plus"></i></button>
    </div>
);

export default addButton;