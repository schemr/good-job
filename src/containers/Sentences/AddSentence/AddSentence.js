import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddSentence.scss';
import { addSentence } from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';

class Sentences extends Component {
    state = {
        sentence: {
            content: '',
            date: null,
            displayDate: null
        }
    }
    
    editChangeHandler = (event) => {
        const date = new Date();
        const displayDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        this.setState({
            sentence:{
                content: event.currentTarget.textContent,
                date: date,
                displayDate: displayDate
            }
        })
    }
    editSubmitHandler = () => {
        const sentence = {
            ...this.state.sentence,
            userId: this.props.userId
        };
        this.props.onSaveSentence(sentence, this.props.userId, this.props.token)
    }
    editCancleHandler = () => {
        this.props.history.goBack();
    }
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <h2 className={classes.Date}>{new Date().toLocaleDateString('ko-KR', options)}</h2>
                <div 
                    className={classes.InnerEdit} 
                    contentEditable="true" 
                    placeholder="잘한일을 입력해주세요"
                    onKeyUp={this.editChangeHandler}></div>
                <div className={classes.ButtonSet}>
                    <Button btnType="Success" className={classes.Button} clicked={this.editSubmitHandler}>저장</Button>
                    <Button btnType="Danger" clicked={this.editCancleHandler}>취소</Button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveSentence: (sentence, userId, token) => dispatch(addSentence(sentence, userId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sentences);