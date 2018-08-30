import {
    GET_ERRORS,
    RECEIVE_CURRENT_USER,
    CLEAR_ERRORS
} from '../util/session_api_util';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};