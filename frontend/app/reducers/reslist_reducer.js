import { RECEIVE_RESTAURANTS } from '../actions/res_actions'
import { shuffle } from 'lodash';

const resListReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RESTAURANTS:
            return shuffle(action.resList.map(res => res.id));
        default:
            return state;
    }
} 

export default resListReducer;