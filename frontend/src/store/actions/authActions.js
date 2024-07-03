import { fetchProfileService, loginService } from "../../services/authService";
import {
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
