import { RECEIVE_CURRENT_RES } from "../actions/res_actions";

const currentResReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_RES:
            return action.res;
        default:
            return state;
    }
}

export default currentResReducer;