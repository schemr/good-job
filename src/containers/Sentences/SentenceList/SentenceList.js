import React, { Component } from 'react';
import classes from './SentenceList.scss'
import Sentence from '../../../components/Sentence/Sentence';
import AddButton from '../../../components/UI/AddButton/AddButton';
import { connect } from 'react-redux';

import { getSentences, addInit } from '../../../store/actions/index';


class SentencesList extends Component {
    componentDidMount() {
        this.props.onFetchSentences(this.props.token, this.props.userId);
    }
    onAddedHandler = () => {
        this.props.onAddSentence();
        this.props.history.push('/new');
    }
    render() {
        let sentences = 
            this.props.sentences.map(sentence => {
                return <Sentence key={sentence.date} date={sentence.date} content={sentence.sentence} />
            })
        if(this.props.sentences.length === 0){
            sentences = (<div className={classes.EmptyString}>잘한일을 등록해주세요!</div>)
        }
        return (
            <div className={classes.Sentences}>
                {sentences}
                <AddButton addedButton={this.onAddedHandler}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        sentences: state.sentence.sentences,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSentences: (token, userId) => dispatch(getSentences(token, userId)),
        onAddSentence: () => dispatch(addInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SentencesList);
