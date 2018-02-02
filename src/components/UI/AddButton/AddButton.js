import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AddButton.scss';

const addButton = () => (
    <div className={classes.addButton}>
        <Link to="/new">+</Link>
    </div>
);

export default addButton;