import React from 'react';
import classes from './SentenceDate.scss';

const sentenceDate = (props) => (
    <div className={classes.Date}>
        {props.date}
    </div>

);

export default sentenceDate;