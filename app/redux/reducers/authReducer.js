'use strict';

const initialState = {
  chaptersList: null,
  chapterAdded: null,
  chapterEdited: null,
  chapterDeleted: null,
  chapterItemsList: null,
  itemAdded: null,
  itemEdited: null,
  itemDeleted: null,
  chapterItemDetails: null,
  chapterItemDetailsEdited: null,
  userData: null,
  detailsEditable: false,
  errorMessage: '',
  loading: {},
};

export default function authInfo(state = initialState, action) {
  let resultObject = null;
  let actionTypeName = action.type ? action.type.split('_').slice(0,-1).join('_') : '';

  if (action.type.indexOf('REQUEST') !== -1) {
    initialState.errorMessage = '';
    initialState.loading[actionTypeName] = true;
  }
  if (action.type.indexOf('SUCCESS') !== -1) {
    if (initialState.loading[actionTypeName]) {
      delete initialState.loading[actionTypeName];
    }
  }
  if (action.type.indexOf('FAILURE') !== -1) {
    delete initialState.loading[actionTypeName];
    initialState.errorMessage = action.path + ': ' + action.data;
  }

  switch (action.type) {

    case 'GET_HEADER_AUTH_TOKEN_REQUEST':
      resultObject = { ...state, userData: initialState.userData };
      break;
    case 'GET_HEADER_AUTH_TOKEN_SUCCESS':
      resultObject = { ...state, userData: action.data };
      break;
    case 'GET_HEADER_AUTH_TOKEN_FAILURE':
      resultObject = { ...state, userData: initialState.userData };
      break;

    case 'SEND_LOGOUT_COMMAND_REQUEST':
      resultObject = { ...state, userData: initialState.userData };
      break;
    case 'SEND_LOGOUT_COMMAND_SUCCESS':
      resultObject = { ...state, userData: null };
      break;
    case 'SEND_LOGOUT_COMMAND_FAILURE':
      resultObject = { ...state, userData: initialState.userData };
      break;

    case 'GET_CHAPTERS_LIST_REQUEST':
      resultObject = { ...state, chaptersList: initialState.chaptersList };
      break;
    case 'GET_CHAPTERS_LIST_SUCCESS':
      resultObject = { ...state, chaptersList: action.data };
      break;
    case 'GET_CHAPTERS_LIST_FAILURE':
      resultObject = { ...state, chaptersList: initialState.chaptersList };
      break;

    case 'ADD_CHAPTER_REQUEST':
      resultObject = { ...state, chapterAdded: initialState.chapterAdded };
      break;
    case 'ADD_CHAPTER_SUCCESS':
      resultObject = { ...state, chapterAdded: action.data };
      break;
    case 'ADD_CHAPTER_FAILURE':
      resultObject = { ...state, chapterAdded: initialState.chapterAdded };
      break;

    case 'EDIT_CHAPTER_REQUEST':
      resultObject = { ...state, chapterEdited: initialState.chapterEdited };
      break;
    case 'EDIT_CHAPTER_SUCCESS':
      resultObject = { ...state, chapterEdited: action.data };
      break;
    case 'EDIT_CHAPTER_FAILURE':
      resultObject = { ...state, chapterEdited: initialState.chapterEdited };
      break;

    case 'DELETE_CHAPTER_REQUEST':
      resultObject = { ...state, chapterDeleted: initialState.chapterDeleted };
      break;
    case 'DELETE_CHAPTER_SUCCESS':
      resultObject = { ...state, chapterDeleted: action.data };
      break;
    case 'DELETE_CHAPTER_FAILURE':
      resultObject = { ...state, chapterDeleted: initialState.chapterDeleted };
      break;

    case 'GET_ITEMS_LIST_REQUEST':
      resultObject = { ...state, chapterItemsList: initialState.chapterItemsList };
      break;
    case 'GET_ITEMS_LIST_SUCCESS':
      resultObject = { ...state, chapterItemsList: action.data };
      break;
    case 'GET_ITEMS_LIST_FAILURE':
      resultObject = { ...state, chapterItemsList: initialState.chapterItemsList };
      break;

    case 'ADD_ITEM_REQUEST':
      resultObject = { ...state, itemAdded: initialState.itemAdded };
      break;
    case 'ADD_ITEM_SUCCESS':
      resultObject = { ...state, itemAdded: action.data };
      break;
    case 'ADD_ITEM_FAILURE':
      resultObject = { ...state, itemAdded: initialState.itemAdded };
      break;

    case 'EDIT_ITEM_REQUEST':
      resultObject = { ...state, itemEdited: initialState.itemEdited };
      break;
    case 'EDIT_ITEM_SUCCESS':
      resultObject = { ...state, itemEdited: action.data };
      break;
    case 'EDIT_ITEM_FAILURE':
      resultObject = { ...state, itemEdited: initialState.itemEdited };
      break;

    case 'DELETE_ITEM_REQUEST':
      resultObject = { ...state, itemDeleted: initialState.itemDeleted };
      break;
    case 'DELETE_ITEM_SUCCESS':
      resultObject = { ...state, itemDeleted: action.data };
      break;
    case 'DELETE_ITEM_FAILURE':
      resultObject = { ...state, itemDeleted: initialState.itemDeleted };
      break;

    case 'GET_ITEM_DETAILS_REQUEST':
      resultObject = { ...state, chapterItemDetails: initialState.chapterItemDetails };
      break;
    case 'GET_ITEM_DETAILS_SUCCESS':
      resultObject = { ...state, chapterItemDetails: action.data };
      break;
    case 'GET_ITEM_DETAILS_FAILURE':
      resultObject = { ...state, chapterItemDetails: initialState.chapterItemDetails };
      break;

    case 'EDIT_ITEM_DETAILS_REQUEST':
      resultObject = { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited };
      break;
    case 'EDIT_ITEM_DETAILS_SUCCESS':
      resultObject = { ...state, chapterItemDetailsEdited: action.data };
      break;
    case 'EDIT_ITEM_DETAILS_FAILURE':
      resultObject = { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited };
      break;

    case 'TRY_USER_LOGIN_PASSWORD_REQUEST':
      resultObject = { ...state, userData: initialState.userData };
      break;
    case 'TRY_USER_LOGIN_PASSWORD_SUCCESS':
      resultObject = { ...state, userData: action.data };
      break;
    case 'TRY_USER_LOGIN_PASSWORD_FAILURE':
      resultObject = { ...state, userData: initialState.userData };
      break;

    case 'SET_DETAILS_EDITABLE_SUCCESS':
      resultObject = { ...state, detailsEditable: action.data };
      break;

    default:
      resultObject = state;
  }

  resultObject.loading = initialState.loading;
  resultObject.errorMessage = initialState.errorMessage;

  return resultObject;
}
