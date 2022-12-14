/* SELECTORS */

export const getRwd = ({rwd}) => rwd.rwdMode;

/* ACTIONS */

// action name creator
const reducerName = 'rwd';
const createActionName = name => `app/${reducerName}/${name}`;
export const SET_RWD_MODE = createActionName('SET_RWD_MODE');

export const setRwdMode = payload => ({ payload, type: SET_RWD_MODE });


/*Initial state*/

const initialState = {  
  rwdMode: {},
};

// reducer

export function rwdReducer(statePart = initialState, action = {}) {
  switch (action.type) {

    case SET_RWD_MODE:
        return {
            ...statePart,        
            rwdMode: action.payload,
        }

    default:
      return statePart;
  }
}