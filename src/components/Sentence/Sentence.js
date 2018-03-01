import React from 'react';
import classes from './Sentence.scss';
import SentenceDate from './SentenceDate/SentenceDate';
import SentenceContent from './SentenceContent/SentenceContent';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const sentence = (props) => (
    <div className={classes.Sentence}>
        <SentenceDate date={new Date(props.date.replace(/-/g, "/")).toLocaleDateString('ko-KR', options)} />
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