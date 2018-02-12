import React from 'react';
import classes from './Sentence.scss';
import SentenceDate from './SentenceDate/SentenceDate';
import SentenceContent from './SentenceContent/SentenceContent';

const sentence = (props) => (
    <div className={classes.Sentence}>
        <SentenceDate date={props.date} />
        
        <div className={classes.Sentence__content}>
            {
                props.content.map(s=>{
                    return <SentenceContent key={s.id} content={s.content} />;
                })
            }
        </div>
    </div>
);

export default sentence;