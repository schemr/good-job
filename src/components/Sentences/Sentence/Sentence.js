import React from 'react';
import classes from './Sentence.scss';

const sentence = (props) => (
    <div className={classes.Sentence}>
        <div className={classes.Sentence__date}>
            {props.date}
        </div>
        <div className={classes.Sentence__content}>
            <div>
                {props.content}
            </div>
        </div>
    </div>
);

export default sentence;