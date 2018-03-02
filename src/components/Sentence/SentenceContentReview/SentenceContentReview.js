import React from 'react';
import classes from './SentenceContentReview.scss';

const sentenceContent = (props) => (
    <div>
        <div className={classes.Content}>
            <p className={classes.Content__title}>이번주의 가장 잘한 일</p> 
            <p className={classes.Content__text}>{props.content}</p>
        </div>
        <div className={classes.List}>
            <p className={classes.List__title}>구체적으로 어떤 일이 있었는가?</p> 
            <p className={classes.List__text}>{props.fact}</p>
        </div>
        <div className={classes.List}>
            <p className={classes.List__title}>왜 그것이 가능했는가? 정말로 잘한 일인가?</p> 
            <p className={classes.List__text}>{props.cause}</p>
        </div>
        <div className={classes.List}>
            <p className={classes.List__title}>지금, 솔직히 어떤 감정인가?</p> 
            <p className={classes.List__text}>{props.emotion}</p>
        </div>
        <div className={classes.List}>
            <p className={classes.List__title}>내일부터 어떤 방법을 실천해볼까?</p> 
            <p className={classes.List__text}>{props.action}</p>
        </div>
    </div>
);

export default sentenceContent;