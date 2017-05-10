'use strict';

import axios from 'axios';
import _ from 'lodash';
import { requestData, receiveData, receiveError } from './actionUtils';

const apiUrl = 'http://localhost:8080';

export function getHeaderAuthToken () {
  let instance = axios.create({
    //headers: {'X-CSRF-Token': action._csrf},
    withCredentials: true
  });
  const actionName = 'GET_HEADER_AUTH_TOKEN';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/api`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function sendLogoutCommand () {
  let instance = axios.create({
    //headers: {'X-CSRF-Token': action._csrf},
    withCredentials: true
  });
  const actionName = 'SEND_LOGOUT_COMMAND';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/logout`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function getChaptersList () {
  let instance = axios.create({
    //headers: {'X-CSRF-Token': action._csrf},
    withCredentials: true
  });
  const actionName = 'GET_CHAPTERS_LIST';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/api/articles`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function deleteChapter (action) {
  let instance = axios.create({
    //headers: {'X-CSRF-Token': action._csrf},
    withCredentials: true
  });
  const actionName = 'DELETE_CHAPTER';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.delete(`${apiUrl}/api/articles/${action}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function getItemsList (action) {
  const actionName = 'GET_ITEMS_LIST';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`${apiUrl}/api/articles/${action}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function getItemDetails (action) {
  const actionName = 'GET_ITEM_DETAILS';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`${apiUrl}/api/details/${action}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function tryUserLoginPassword (action) {
  let instance = axios.create({
    headers: {'X-CSRF-Token': action._csrf},
    withCredentials: true
  });
  const actionName = 'TRY_USER_LOGIN_PASSWORD';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.post(`${apiUrl}/api/sendauthinfo`, action.data)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}
