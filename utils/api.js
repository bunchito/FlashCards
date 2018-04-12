import { AsyncStorage } from 'react-native';
import { formatDeskResults, DECKS_STORAGE_KEY } from './_deck';

export function fetchDeckResults () {

  //AsyncStorage.clear(DECKS_STORAGE_KEY);

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(formatDeskResults)
}

export function addDeckLocal (deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export function addCardLocal ({ title, question, answer }) {

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    let decks = JSON.parse(results);

    const questionToAdd = {
      question,
      answer
    };

    decks[title].questions.push(questionToAdd)
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

  }).catch((error)=>{
    console.log(error.message);
  });
}
