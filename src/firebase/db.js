import { db } from './firebase';

// Sentences API

export const doCreateSentence = (id, date, sentence) => {
    // Get a key for a new Post.
    const newPostKey = db.ref('sentences/'+id+'/'+date).push().key;
    return db.ref('sentences/'+id+'/'+date+'/'+newPostKey).update(sentence)
};

export const onceGetSentences = (id) => 
    db.ref(`sentences/${id}`).once('value');