import Cookies from 'js-cookie';
import { SET_COOKIE, REMOVE_COOKIE } from '../actionTypes';

export const setCookie = (name, value) => {
  Cookies.set(name, value);
  return { type: SET_COOKIE, payload: Cookies.get() };
};

export const removeCookie = (name) => {
  Cookies.remove(name);
  return { type: REMOVE_COOKIE, payload: Cookies.get() };
};
