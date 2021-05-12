
import { Action } from "../../actions/action.interface";
import { ACTION_CHANGE_IS_LOGGED_IN } from "../../actions/actions.types";
import SessionState from "../../config/session/sessionState.interface";

// Header initial state
const initialState: SessionState = {
  isLoggedIn: false
}


export function sessionReducer(state = initialState, action: Action): SessionState {
    switch (action.type) {
      case ACTION_CHANGE_IS_LOGGED_IN:
        return {
          ...state, 
          isLoggedIn: action.payload 
        }
      
    }
  
    // En caso de que no entre en por estos tipos de mensajes, tenemos que
    // devolver el estado sin tocarlo
    return state;
  }