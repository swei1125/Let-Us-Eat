import { RECEIVE_RESTAURENTS } from '../actions/res_actions'

const resListReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RESTAURENTS:
            return action.resList.map(res => res.id);
        default:
            return state;
    }
} 

export default resListReducer;