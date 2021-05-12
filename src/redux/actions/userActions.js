import * as actionTypes from "../constants/userConstants";
import axios from "axios";


export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_REQUEST});

    const { data } = await axios.get("https://fakestoreapi.com/users/1");
    dispatch({
      type: actionTypes.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (updatedData = {}) => {
  return{
    type: actionTypes.UPDATE_USER_PROFILE,
    payload: updatedData
  }
}

