import {
  ADD_POST,
  REMOVE_POST,
} from './actionTypes';


export default function post(state={posts: []}, action) {
  switch (action.type) {
    case ADD_POST: return {...state, posts: state.posts.concat(action.item) }
    case REMOVE_POST: return {...state, posts: state.posts.filter(i => action.item !== i)}
    default:

  }
}
