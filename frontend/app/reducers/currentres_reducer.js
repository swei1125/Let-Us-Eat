import { RECEIVE_CURRENT_RES, CLEAR_CURRENT_RES } from "../actions/res_actions";

const currentResReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_RES:
            const idx = state.idx ? state.idx : 0;
            return Object.assign({}, action.res, {idx: idx});
        case CLEAR_CURRENT_RES:
            return {};
        default:
            return state;
    }
}

export default currentResReducer;