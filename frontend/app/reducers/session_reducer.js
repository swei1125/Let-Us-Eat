import {
    RECEIVE_CURRENT_USER,
    SET_CURRENT_USER
} from '../util/session_api_util'
import merge from 'lodash/merge';

const _nullUser = Object.freeze({
    id: null
})

const sessionReducer = (state = _nullUser, action) => {
    Object.freeze(state);
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email 
            }
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.payload.id]: action.payload })
        default:
            return state;
    }
}

export default sessionReducer;