import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PostActions from './actions'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

class App extends Component {
  state = {
    values: ['jeff', 'carlton', 'cheryl'],
    index: 0,
  }
  /* composition */
  greet = x => `Hello ${x}`;
  emote = x => `${x} :>`;
  compose = (f,g) => x => f(g(x));
  mark = 'Mark';
  /* curry */
  curryAdd = a => b => a + b;
  a = 10;
  b = 20;
  c = 40;
  addTen = this.curryAdd(this.a);
  /* basic redux store */
  reducer = (state=0, action) => {
    switch(action.type) {
      case "INC": return state + action.payload;
      case "DEC": return state - action.payload;
      default: return state;
    }
  }
  store = createStore(this.reducer, 10); // second parameter default state
  /* multiple reducers */
  userReducer = (state = {}, action) => {
    switch(action.type) {
      case "CHANGE_NAME": return {...state, name: action.payload};
      case "CHANGE_ID": return {...state, id: action.payload};
      default: return state;
    }
  }
  tweetsReducer = (state = [], action) => {
    switch(action.type) {
      default: return state;
    }
  }
  reducer2 = combineReducers({
    user: this.userReducer,
    tweets: this.tweetsReducer
  });
  store2 = createStore(this.reducer2, {
  });
  /* Middleware */
  reducer3 = (state=0, action) => {
    switch(action.type) {
      case "INC": return state + action.payload;
      case "DEC": return state - action.payload;
      case "E": throw new Error("got E");
      default: return state;
    }
  }
  lgr = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
  }
  errorHandler = store => next => action => {
    try { next(action) } catch (e) { console.log("AHHHH!!", e) }
  }
  middleware = applyMiddleware(this.lgr, this.errorHandler);
  store3 = createStore(this.reducer3, 10, this.middleware); // second parameter default state
  /* async */
  reducer4 = (state=0, action) => {
    return state;
  }
  middleware4 = applyMiddleware(thunk, logger);
  store4 = createStore(this.reducer4, 42, this.middleware4); // second parameter default state
  render() {
    this.store.subscribe(() => console.log('store changed', this.store.getState()));
    this.store.dispatch({type: "INC", payload: 1});
    this.store.dispatch({type: "DEC", payload: 3});

    this.store2.subscribe(() => console.log('store2 changed', this.store2.getState()));
    this.store2.dispatch({type: "CHANGE_NAME", payload: "Will"});
    this.store2.dispatch({type: "CHANGE_ID", payload: 333});

    this.store3.dispatch({type: "INC", payload: 1});
    this.store3.dispatch({type: "DEC", payload: 3});
    //this.store3.dispatch({type: "E"}); // commented to stop seeing the stack dump

    this.store4.dispatch(dispatch => {
      dispatch({type: "INC"});
    });
    this.store4.dispatch({type: "DEC"});
    return (
      <div>
        <header>
          <h1>
            <a href="https://medium.com/@meagle/understanding-87566abcfb7a">
                Understanding Redux Middleware
            </a>
          </h1>
        </header>
        <p>
          Open debugger/console to see output of examples above.
        </p>
        <ul>
          <li>compose {this.mark} => {this.compose(this.greet, this.emote)(this.mark)}</li>
          <li>curryAdd {this.a} to {this.b} {this.c} => {this.addTen(this.b)} &amp; {this.addTen(this.c)}</li>

        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {...state};
}
export default connect(mapStateToProps, PostActions)(App);
