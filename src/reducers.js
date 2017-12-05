import {
  ADD_POST,
  REMOVE_POST,
} from './actionTypes';


export default function post(state=[], action) {
  switch (action.type) {
    case ADD_POST: return state.concat(action.item);
    case REMOVE_POST: return state.filter(i => action.item !== i);
    default: return state;

  }
}
