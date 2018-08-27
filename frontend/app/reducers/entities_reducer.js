import { combineReducers } from "redux";
import resListReducer from './reslist_reducer';
import currentResReducer from './currentres_reducer';


const entitiesReducer = combineReducers({
    resList: resListReducer,
    currentRes: currentResReducer
})

export default entitiesReducer;