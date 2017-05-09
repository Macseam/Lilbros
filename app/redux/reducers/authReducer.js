'use strict';

const initialState = {
  chaptersList: null,
  chapterItemsList: null,
  chapterItemDetails: null,
  userData: null,
  loading: false,
  loaded: false,
};

export default function authInfo(state = initialState, action) {
  switch (action.type) {

    case 'GET_HEADER_AUTH_TOKEN_REQUEST':
      return { ...state, userData: initialState.userData, loading: true, loaded: false };
    case 'GET_HEADER_AUTH_TOKEN_SUCCESS':
      return { ...state, userData: action.data, loading: false, loaded: true };
    case 'GET_HEADER_AUTH_TOKEN_FAILURE':
      return { ...state, userData: initialState.userData, loading: false, loaded: true };

    case 'SEND_LOGOUT_COMMAND_REQUEST':
      return { ...state, userData: initialState.userData, loading: true, loaded: false };
    case 'SEND_LOGOUT_COMMAND_SUCCESS':
      return { ...state, userData: null, loading: false, loaded: true };
    case 'SEND_LOGOUT_COMMAND_FAILURE':
      return { ...state, userData: initialState.userData, loading: false, loaded: true };

    case 'GET_CHAPTERS_LIST_REQUEST':
      return { ...state, chaptersList: initialState.chaptersList, loading: true, loaded: false };
    case 'GET_CHAPTERS_LIST_SUCCESS':
      return { ...state, chaptersList: action.data, loading: false, loaded: true };
    case 'GET_CHAPTERS_LIST_FAILURE':
      return { ...state, chaptersList: initialState.chaptersList, loading: false, loaded: true };

    case 'GET_ITEMS_LIST_REQUEST':
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: true, loaded: false };
    case 'GET_ITEMS_LIST_SUCCESS':
      return { ...state, chapterItemsList: action.data, loading: false, loaded: true };
    case 'GET_ITEMS_LIST_FAILURE':
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: false, loaded: true };

    case 'GET_ITEM_DETAILS_REQUEST':
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: true, loaded: false };
    case 'GET_ITEM_DETAILS_SUCCESS':
      return { ...state, chapterItemDetails: action.data, loading: false, loaded: true };
    case 'GET_ITEM_DETAILS_FAILURE':
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: false, loaded: true };

    case 'TRY_USER_LOGIN_PASSWORD_REQUEST':
      return { ...state, userData: initialState.userData, loading: true, loaded: false };
    case 'TRY_USER_LOGIN_PASSWORD_SUCCESS':
      return { ...state, userData: action.data, loading: false, loaded: true };
    case 'TRY_USER_LOGIN_PASSWORD_FAILURE':
      return { ...state, userData: initialState.userData, loading: false, loaded: true };

    default:
      return state;
  }
}
