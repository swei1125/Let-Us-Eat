import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';
import errors from './errors_reducer';
import session from './session_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    errors,
    session
});

export default rootReducer;