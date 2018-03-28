import React, { Component } from 'react';
import classes from './SentenceList.scss'
import Sentence from '../../../components/Sentence/Sentence';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

import { db } from '../../../firebase';

import { setSentence} from '../../../store/actions/index';


class SentencesList extends Component {
    state = {
        isLoading: true,
        isEmpty: false
    }

    componentDidMount() {
        db.onceGetSentences(this.props.user.uid)
            .then(snapshot => {
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
                this.props.onSetSentence(fetchedData.reverse())
                this.setState({
                    isLoading: false
                })
            })
    }
    onAddedHandler = () => {
        this.props.history.push('/new');
    }
    render() {
        let sentences = 
            this.props.sentences.map(sentence => {
                return <Sentence key={sentence.date} date={sentence.date} content={sentence.sentence} />
            })
        if(this.state.isEmpty){
            sentences = (<div className={classes.EmptyString}>잘한일을 등록해주세요!</div>)
        }
        return (
            <div className={classes.Sentences}>
                {
                    this.state.isLoading ? 
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
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSentence: (sentences) => dispatch(setSentence(sentences)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SentencesList);
