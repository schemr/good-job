import React from 'react';
import classes from './Introduce.scss';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';

const introduce = (props) => (
    <div className={classes.Container}>
        <div>
        잘한일을 써보세요
        어제보다 오늘, 반드시 더 좋아집니다. 잘한일을 쓰는 것만으로도!
        </div>
        <Link to="/auth">
            <Button>시작하기</Button>
        </Link>
    </div>
)

export default introduce;