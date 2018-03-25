import { db } from './firebase';

// Sentences API

export const doCreateSentence = (id, date, sentence) => {
    db.ref(`sentences/${id}/&{date}`).set(sentence)
};

export const onceGetSentences = (id) => 
    db.ref(`sentences/${id}`).once('value');