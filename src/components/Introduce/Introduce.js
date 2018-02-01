import React from 'react';
import classes from './Introduce.scss';

const introduce = (props) => (
    <div className={classes.Container}>
        <div>
        잘한일을 써보세요
        어제보다 오늘, 반드시 더 좋아집니다. 잘한일을 쓰는 것만으로도!
        </div>
        <button className={classes.Button}>시작하기</button>
    </div>
)

export default introduce;