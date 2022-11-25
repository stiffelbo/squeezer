import { toast } from "react-toastify";
import { getOnStocks } from '../services/stockService';
/* SELECTORS */
export const getStock = ({stock}) => stock.data;

/* ACTIONS */

// action name creator
const reducerName = 'stock';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_STOCK = createActionName('LOAD_STOCK');
const LOAD_RECENT_STOCK = createActionName('LOAD_RECENT_STOCK');
const POST_STOCK = createActionName('POST_STOCK');
const PUT_STOCK = createActionName('PUT_STOCK');
const PATCH_STOCK = createActionName('PATCH_STOCK');
const DELETE_STOCK = createActionName('DELETE_STOCK');
const SELECT_STOCK = createActionName('SELECT_STOCK');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadStock = payload => ({ payload, type: LOAD_STOCK });
export const loadRecentStock = payload => ({ payload, type: LOAD_RECENT_STOCK });
export const postStock = payload => ({ payload, type: POST_STOCK });
export const putStock = payload => ({ payload, type: PUT_STOCK });
export const patchStock = payload => ({ payload, type: PATCH_STOCK });
export const deleteStock = payload => ({ payload, type: DELETE_STOCK });
export const selectStock = payload => ({ payload, type: SELECT_STOCK });

/* THUNKS */
//current production / uppcommings
export const loadStockRequest = () => {
    return async dispatch => {
      dispatch(startRequest());
      try {
        let res = await getOnStocks(); 
        dispatch(loadStock(res.data));
        dispatch(endRequest());
        toast.success("Wgrano stock");
      } catch(e) {
        dispatch(errorRequest(e.message));
        toast.error("Błąd pobierania stocku");
      }
    };
};  

export const loadRecentStockRequest = id => {
    return async dispatch => {
      try {
        let res = await getRecentStockService(id); 
        dispatch(loadRecentStock(res.data));
      } catch(e) {
        dispatch(errorRequest(e.message));
        toast.error("Błąd odświeżania stock");
      }
    };
};

export const postStockRequest = (data, maxId) => {
    return async dispatch => {
      dispatch(startRequest());
      try {
        //check if new ids 
        let resp = await getRecentStockService(maxId); 
        dispatch(loadRecentStock(resp.data));
        //post new data
        let res = await saveStock(data);       
        dispatch(postStock(res.data));
        dispatch(endRequest());
        toast.success("Dodano nową pozycję magazynową: "+res.data.id);
      } catch(e) {
        dispatch(errorRequest(e.message));
        toast.error("Błąd dodawania nowej pozycji magazynowej");
      }
    };
};

export const putStockRequest = data => {
    return async dispatch => {
  
      dispatch(startRequest());
      try {
        let res = await updateStock(data);       
        dispatch(putStock(res.data));
        dispatch(endRequest());
        toast.success("Zaktualizowano dane pozycji magazynowej: "+res.data.id);
      } catch(e) {
        dispatch(errorRequest(e.message));
        toast.error("Błąd akutalizacji danych pozycji magazynowej");
      }
    };
};

export const patchStockRequest = (name, value, id ) => {
    return async dispatch => {
      dispatch(startRequest());
      try{
        let res = await updateField(name, value, id);
        dispatch(patchStock(res.data));
        dispatch(endRequest());
      } catch (e){
        dispatch(errorRequest(e.message));
        toast.error("Błąd akutalizacji "+name+" pozycji magazynowej");
      }
    }
}

export const deleteStockRequest = ( id ) => {
    return async dispatch => {
      dispatch(startRequest());
      try{
        let res = await removeStock( id );
        dispatch(deleteStock(res.data));
        dispatch(endRequest());
      } catch (e){
        dispatch(errorRequest(e.message));
        toast.error("Błąd usuwania "+name+" pozycji magazynowej");
      }
    }
}

export const selectStockAction = ids => {
    return dispatch => dispatch(selectStock(ids));
}

  /* INITIAL STATE */

const initialState = {
    data: [],
    request: {
      pending: false,
      error: null,
      success: null,
    },
    maxId : '',
    selected : [],
  };

  /* REDUCER */

  export default function stocksReducer(statePart = initialState, action = {}) {
    switch (action.type) {
      case LOAD_STOCK: 
        return { ...statePart, data: action.payload};
      case LOAD_RECENT_STOCK:
        if(action.payload.length){
          return {...statePart, data: [...action.payload, ...statePart.data], maxId : action.payload[0]['id']}
        }else{
          return statePart;
        }      
      case POST_STOCK:
        if(statePart.data.find(item => item.id === action.payload.id)){
          return { ...statePart, data : [action.payload, ...statePart.data.filter(item => item.id !== action.payload.id)]}
        }else{
          return { ...statePart, data : [action.payload, ...statePart.data], maxId : action.payload['id']}
        }
      case PUT_STOCK:
        return { ...statePart, data : [action.payload, ...statePart.data.filter(item => item.id !== action.payload.id)]}
      case PATCH_STOCK:
        return { ...statePart, data : [action.payload, ...statePart.data.filter(item => item.id !== action.payload.id)]}
      case DELETE_STOCK:
        return { ...statePart, data : [...statePart.data.filter(item => item.id !== action.payload.id)]}
      case SELECT_STOCK:
        return { ...statePart, selected : [...action.payload]}
      case START_REQUEST:
        return { ...statePart, request: { pending: true, error: null, success: false } };
      case END_REQUEST:
        return { ...statePart, request: { pending: false, error: null, success: true } };
      case ERROR_REQUEST:
        return { ...statePart, request: { pending: false, error: action.error, success: false } };
      default:
        return statePart;
      }
  };