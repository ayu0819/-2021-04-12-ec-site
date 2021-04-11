import * as Actions from './actions';
import initialState from '../store/initialState';

// UsersReducer
export const NotificationsReducer = (state = initialState.notifications, action) => {
    switch (action.type) {
          case Actions.FETCH_NOTIFICATIONS :
              return {
                ...state,
                  list: [...action.payload]
              };
            default:
                return state
    }
}