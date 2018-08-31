import {
  RECEIVE_CURRENT_USER,
  SET_CURRENT_USER
} from "../util/session_api_util";
import { UPDATE_LIKERES } from "../util/user_util";
import merge from "lodash/merge";

const _nullUser = Object.freeze({
  id: null
});

const currentUserReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        likedRes: action.payload.likedRes
      };
    case UPDATE_LIKERES:
      return action.user;
    default:
      return state;
  }
};

export default currentUserReducer;