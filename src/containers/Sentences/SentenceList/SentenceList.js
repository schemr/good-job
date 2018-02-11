import React, { Component } from 'react';
import classes from './SentenceList.scss'
import Sentence from '../../../components/Sentence/Sentence';
import AddButton from '../../../components/UI/AddButton/AddButton';
import { connect } from 'react-redux';

import { getSentences } from '../../../store/actions/index';


class SentencesList extends Component {
    componentDidMount() {
        this.props.onFetchSentences(this.props.token, this.props.userId);
    }
    render() {
        return (
            <div className={classes.Sentences}>
                {this.props.sentences.map(sentence => {
                    return <Sentence key={sentence.id} date={sentence.date} content={sentence.content} />
                })}
                <AddButton />
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
        onFetchSentences: (token, userId) => dispatch(getSentences(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SentencesList);
