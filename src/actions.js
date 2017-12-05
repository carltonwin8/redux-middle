import {
  ADD_POST,
  REMOVE_POST,
} from './actionTypes';

export function addPost({item}) { return { type: ADD_POST, item: item }}
export function removePost({item}) { return { type: REMOVE_POST, item: item }}
