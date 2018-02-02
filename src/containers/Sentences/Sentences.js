import React, { Component } from 'react';
import classes from './Sentences.scss';

class Sentences extends Component {
    render() {
        return (
            <div className={classes.Sentences}>
                <textarea className={classes.TextArea} placeholder="잘한일을 입력해주세요"></textarea>
                <button type="submit" className={classes.Button}>저장</button>
            </div>
        )
    }
};

export default Sentences;