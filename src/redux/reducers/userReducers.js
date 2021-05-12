import * as actionTypes from "../constants/userConstants";
//import Object from 'object'

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case actionTypes.GET_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_USER_PROFILE:
      return {
        loading: false,
        user : Object.assign({},state.user,action.payload),
      }
    default:
      return state;
  }
};
