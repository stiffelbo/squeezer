import {getKlines} from '../services/binance';
import Analizer from '../utils/analizer';
/* SELECTORS */

export const getSymbolsData = ({candles}) => candles.data;
export const getSymbolData = ({candles}, ticker) => candles.data.find(item => item.symbol === ticker);

/* ACTIONS */

// action name creator
const reducerName = 'CANDLES';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_CANDLES = createActionName('LOAD_CANDLES');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadCandles = payload => ({ payload, type: LOAD_CANDLES });

export const settings = {
  timeframe: '1h',
  window: 500,
};

/* THUNKS */

export const loadCandlesRequest = (symbol, timeFrame) => {
  return async dispatch => {

    dispatch(startRequest());
    try {
      let res = await getKlines(symbol, timeFrame, settings.window);       
      dispatch(loadCandles({data: res.data, symbol}));
      dispatch(endRequest());
    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};


/*Initial state*/

const initialState = {  
  data: [],
};

// reducer

export function candlesReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CANDLES:
        const analized = new Analizer(action.payload.data);        
        const newData = {symbol: action.payload.symbol, data: analized.data}
        return { ...statePart, data : [newData, ...statePart.data.filter(item => item.symbol !== action.payload.symbol)]};
    default:
      return statePart;
  }
}