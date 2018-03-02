import React from 'react';
import classes from './Sentence.scss';
import SentenceDate from './SentenceDate/SentenceDate';
import SentenceContentNormal from './SentenceContentNormal/SentenceContentNormal';
import SentenceContentReview from './SentenceContentReview/SentenceContentReview';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const sentence = (props) => (
    <div className={classes.Sentence}>
        <SentenceDate date={new Date(props.date.replace(/-/g, "/")).toLocaleDateString('ko-KR', options)} />
        <div className={classes.Sentence__content}>
            {
                props.content.map(sentence => {
                    let content = (<SentenceContentNormal key={sentence.id} content={sentence.content} />)
                    if(sentence.type === 'review'){
                        content = (<SentenceContentReview key={sentence.id} content={sentence.content} fact={sentence.fact} cause={sentence.cause} emotion={sentence.emotion} action={sentence.action} />)
                    }
                    return content
                })
                
            }
        </div>
    </div>
);

export default sentence;