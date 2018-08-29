import { RECEIVE_CURRENT_RES, UPDATE_IDX } from "../actions/res_actions";

const currentResReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_RES:
            const idx = state.idx ? state.idx : 0;
            return Object.assign({}, action.res, {idx: idx});
        default:
            return state;
    }
}

export default currentResReducer;