import React from 'react';
import classes from './Sentence.scss';
import SentenceDate from './SentenceDate/SentenceDate';
import SentenceContent from './SentenceContent/SentenceContent';

const sentence = (props) => (
    <div className={classes.Sentence}>
        <SentenceDate date={props.date} />
        
        <div className={classes.Sentence__content}>
            {
                props.content.map(a => {
                    return <SentenceContent key={a.id} content={a.content} />
                })
                
            }
        </div>
    </div>
);

export default sentence;