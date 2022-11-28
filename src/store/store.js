import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//auth

// entities reducers

//aplication flow reducers
import {rwdReducer} from './rwdRedux';
import { candlesReducer } from './candlestickDataRedux';

// define reducers
const reducers = {
  rwd : rwdReducer,
  candles : candlesReducer,
};

// combine reducers
const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  compose(
		applyMiddleware(thunk),
	)
);

export default store;