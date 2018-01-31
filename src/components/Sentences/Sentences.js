import React from 'react';
import classes from './Sentences.scss'
import Sentence from './Sentence/Sentence';

const datas = [
    {
        id: 1,
        date: new Date(),
        content: '나는 오늘 잘했어요'
    },
    {
        id: 2,
        date: new Date(),
        content: '나는 내일도 잘할꺼에요'
    },
    {
        id: 3,
        date: new Date(),
        content: '나는 항상 잘했어요'
    },
    {
        id: 4,
        date: new Date(),
        content: '나는 항상 잘할꺼에요'
    },
];

const sentences = (props) => (
    <div className={classes.Sentences}>
        {datas.map(data => {
            return <Sentence key={data.id} date={data.date} content={data.content} />
        })}
        
    </div>
);

export default sentences;