import { createStore } from 'redux';

const initState = {
  hasLogin: false,
  article: {}
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ARTICLE':
      state.article = action.data
      break
    default:
      return state
  }
  return state
}

export default createStore(reducer)