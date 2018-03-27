import React, { Component } from 'react';
import classes from './SentenceList.scss'
import Sentence from '../../../components/Sentence/Sentence';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

import { db } from '../../../firebase';

import { getSentences, setSentence, addInit } from '../../../store/actions/index';


class SentencesList extends Component {
    componentDidMount() {
        db.onceGetSentences(this.props.user.uid).then(snapshot => {
            const data = snapshot.val()
            const fetchedData = [];
            for ( let key in data ) {
                const fetchedSentence = [];
                for( let k in data[key]){
                    fetchedSentence.push( {
                        ...data[key][k],
                        id: k
                    });
                }
                fetchedData.push({
                    sentence: fetchedSentence,
                    date: key
                })
            }
            console.log(fetchedData)
            this.props.onSetSentence(fetchedData.reverse())
            //dispatch(setSentence(fetchedData.reverse()));
        })
        // this.props.onFetchSentences(this.props.token, this.props.userId);
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.sentences !== this.props.sentences
    // }
    onAddedHandler = () => {
        this.props.onAddSentence();
        this.props.history.push('/new');
    }
    render() {
        let sentences = 
            this.props.sentences.map(sentence => {
                return <Sentence key={sentence.date} date={sentence.date} content={sentence.sentence} />
            })
        if(this.props.sentences.length === 0 && this.props.fetched){
            sentences = (<div className={classes.EmptyString}>잘한일을 등록해주세요!</div>)
        }
        return (
            <div className={classes.Sentences}>
                {
                    this.props.isLoading ? 
                    <div className={classes.Loading}>
                        <CircularProgress className={classes.progress} size={50} />
                    </div> 
                    : sentences
                }
                <div className={classes.AddButton}>
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.onAddedHandler}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        sentences: state.sentence.sentences,
        fetched: state.sentence.fetched,
        token: state.auth.token,
        userId: state.auth.userId,
        user: state.auth.user,
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSentences: (token, userId) => dispatch(getSentences(token, userId)),
        onSetSentence: (sentences) => dispatch(setSentence(sentences)),
        onAddSentence: () => dispatch(addInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SentencesList);
