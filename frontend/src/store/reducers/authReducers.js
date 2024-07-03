import { FETCH_ALL_PROFILE_FAILURE, FETCH_ALL_PROFILE_SUCCESS, FETCH_ALL_PROFILE_SUCCESS_COUNT, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, SET_LOADING } from '../actionTypes';
const initialState = {
  user: null,
  users: [], // Add this to handle multiple users
  loading: false,
  userCount:0,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAILURE:
    case FETCH_PROFILE_FAILURE:
    case FETCH_ALL_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case FETCH_ALL_PROFILE_SUCCESS:
      return {
        ...state,
        users: action.payload, 
        error: null,
      };
    case FETCH_ALL_PROFILE_SUCCESS_COUNT:
      return {
        ...state,
        userCount: action.payload, 
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
