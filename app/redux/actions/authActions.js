'use strict';

import axios from 'axios';
import { requestData, receiveData, receiveError } from './actionUtils';

const NODE_ENV = process.env.NODE_ENV || 'production';

const apiUrl = NODE_ENV === 'production' ? 'http://lilbros.macseam.ru:8080' : 'http://localhost:8080';

const errorCather = function(dispatch, actionName, actionHint, response) {
  if (response.response && response.response.data) {
    return dispatch(receiveError(
      actionName,
      response.response.data + ' (' + response.response.status + ')',
      actionHint)
    );
  }
  else {
    return dispatch(receiveError(actionName, response.data));
  }
};

export function getHeaderAuthToken () {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'GET_HEADER_AUTH_TOKEN';
  const actionHint = 'Проверка пользовательских данных';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/api`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function sendLogoutCommand () {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'SEND_LOGOUT_COMMAND';
  const actionHint = 'Завершение сессии';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/logout`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function getChaptersList () {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'GET_CHAPTERS_LIST';
  const actionHint = 'Получение списка разделов';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.get(`${apiUrl}/api/toparticles`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function addChapter (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'ADD_CHAPTER';
  const actionHint = 'Добавление раздела';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.post(`${apiUrl}/api/articles`, action.body)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function editChapter (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'EDIT_CHAPTER';
  const actionHint = 'Редактирование раздела';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.put(`${apiUrl}/api/articles/${action.id}`, action.body)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function deleteChapter (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'DELETE_CHAPTER';
  const actionHint = 'Удаление раздела';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.delete(`${apiUrl}/api/articles/${action.id}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function getItemsList (action) {
  const actionName = 'GET_ITEMS_LIST';
  const actionHint = 'Получение списка записей';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`${apiUrl}/api/articles/${action}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function addItem (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'ADD_ITEM';
  const actionHint = 'Добавление записи';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.post(`${apiUrl}/api/articles`, action.body)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function editItem (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'EDIT_ITEM';
  const actionHint = 'Редактирование записи';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.put(`${apiUrl}/api/articles/${action.id}`, action.body)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function deleteItem (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'DELETE_ITEM';
  const actionHint = 'Удаление записи';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.delete(`${apiUrl}/api/articles/${action.id}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function getItemDetails (action) {
  const actionName = 'GET_ITEM_DETAILS';
  const actionHint = 'Получение данных о записи';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`${apiUrl}/api/details/${action}`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function editItemDetails (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'EDIT_ITEM_DETAILS';
  const actionHint = 'Редактирование записи';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.put(`${apiUrl}/api/articles/${action.id}`, action.body)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function tryUserLoginPassword (action) {
  let instance = axios.create({
    withCredentials: true
  });
  const actionName = 'TRY_USER_LOGIN_PASSWORD';
  const actionHint = 'Аутентификация';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return instance.post(`${apiUrl}/api/sendauthinfo`, action.data)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        return errorCather(dispatch, actionName, actionHint, response);
      });
  };
}

export function setDetailsEditable (action) {
  const actionName = 'SET_DETAILS_EDITABLE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}
