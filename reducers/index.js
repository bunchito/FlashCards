import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions/types';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
    return {
      ...state,
      ...action.decks,
    }

    case ADD_DECK :
    return {
      ...state,
      ...action.deck,
    }

    case ADD_CARD :
    const { title, question, answer } = action.info;
    return {
      ...state,
      [title]: {
        ...state[title],
        questions: [
          ...state[title].questions, { question, answer }
        ]
      }
    }

    default :
    return state
  }
}

export default decks;
