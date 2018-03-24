import React from 'react';

// SentencesWithConditionalRendering

// Null / Empty / Loading State Conditional

const SentencesWithConditionalRendering = (component) => (props) => {
    if(!props.sentences) {
        return null
    }
    if(!props.sentences.length){
        return (<div>No Sentences</div>)
    }
    return <Component {...props} />
    
};

export default SentencesWithConditionalRendering;