import React, { Component } from 'react';
import classes from './Sentences.scss';

class Sentences extends Component {
    state = {
        sentence: {
            content: '',
            date: null
        }
    }
    textareaHandler = (event) => {
        this.setState({
            sentence:{
                content: event.target.value,
                date: new Date()
            }
        })
    }
    textareaSubmitHandler = (event) => {
        console.log(this.state)
        const body = JSON.stringify(this.state.sentence);
        fetch('https://good-job-ff4ca.firebaseio.com/sentences.json', {
            method:"POST",
            body: body,
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        event.preventDefault();
    }
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <form onSubmit={this.textareaSubmitHandler} className={classes.Sentences}>
                <h2 className={classes.Date}>{new Date().toLocaleDateString('ko-KR', options)}</h2>
                <textarea className={classes.TextArea} placeholder="잘한일을 입력해주세요" value={this.state.sentence.content}
                onChange={this.textareaHandler}></textarea>
                <button type="submit" className={classes.Button}>저장</button>
            </form>
        )
    }
};

export default Sentences;