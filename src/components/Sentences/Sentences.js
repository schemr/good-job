import React, { Component } from 'react';
import classes from './Sentences.scss'
import Sentence from './Sentence/Sentence';
import AddButton from '../UI/AddButton/AddButton';
import { connect } from 'react-redux';

import { getSentences } from '../../store/actions/index';


class SentencesList extends Component {
    componentDidMount() {
        this.props.onLoadSentences;
    }
    render() {
        return (
            <div className={classes.Sentences}>
                {/* {this.sentences.map(sentence => {
                    return <Sentence key={sentence.date} date={sentence.date} content={sentence.content} />
                })} */}
                <AddButton />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        sentences: state.sentence.sentences
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadSentences: () => dispatch(getSentences())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SentencesList);
