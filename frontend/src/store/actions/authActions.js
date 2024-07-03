import { deleteUserParamIdService, fetchAllProfileService, fetchProfileService, loginService, updateUserParamIdService } from "../../services/authService";
import {
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  FETCH_ALL_PROFILE_FAILURE,
  FETCH_ALL_PROFILE_SUCCESS,
  FETCH_ALL_PROFILE_SUCCESS_COUNT,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOADING
} from "../actionTypes";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await loginService(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(fetchUserProfile());
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await fetchProfileService();
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const fetchAllUserProfile = (keyword = '', page = 1) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await fetchAllProfileService(keyword, page);
    dispatch({ type: FETCH_ALL_PROFILE_SUCCESS, payload: data.allUsers }); // Use data.allUsers
    dispatch({ type: FETCH_ALL_PROFILE_SUCCESS_COUNT, payload: data.userCount }); 
  } catch (error) {
    dispatch({ type: FETCH_ALL_PROFILE_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const deleteUserById = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await deleteUserParamIdService(id);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data.message }); 
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};



export const updateSingleUserProfile = (keyword = '', page = 1) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await updateUserParamIdService(keyword, page);
    dispatch({ type: FETCH_ALL_PROFILE_SUCCESS, payload: data.allUsers }); // Use data.allUsers
    dispatch({ type: FETCH_ALL_PROFILE_SUCCESS_COUNT, payload: data.userCount }); 
  } catch (error) {
    dispatch({ type: FETCH_ALL_PROFILE_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};
