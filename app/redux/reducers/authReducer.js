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

    case 'ADD_CHAPTER_REQUEST':
      return { ...state, chapterAdded: initialState.chapterAdded, loading: true, loaded: false };
    case 'ADD_CHAPTER_SUCCESS':
      return { ...state, chapterAdded: action.data, loading: false, loaded: true };
    case 'ADD_CHAPTER_FAILURE':
      return { ...state, chapterAdded: initialState.chapterAdded, loading: false, loaded: true };

    case 'EDIT_CHAPTER_REQUEST':
      return { ...state, chapterEdited: initialState.chapterEdited, loading: true, loaded: false };
    case 'EDIT_CHAPTER_SUCCESS':
      return { ...state, chapterEdited: action.data, loading: false, loaded: true };
    case 'EDIT_CHAPTER_FAILURE':
      return { ...state, chapterEdited: initialState.chapterEdited, loading: false, loaded: true };

    case 'DELETE_CHAPTER_REQUEST':
      return { ...state, chapterDeleted: initialState.chapterDeleted, loading: true, loaded: false };
    case 'DELETE_CHAPTER_SUCCESS':
      return { ...state, chapterDeleted: action.data, loading: false, loaded: true };
    case 'DELETE_CHAPTER_FAILURE':
      return { ...state, chapterDeleted: initialState.chapterDeleted, loading: false, loaded: true };

    case 'GET_ITEMS_LIST_REQUEST':
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: true, loaded: false };
    case 'GET_ITEMS_LIST_SUCCESS':
      return { ...state, chapterItemsList: action.data, loading: false, loaded: true };
    case 'GET_ITEMS_LIST_FAILURE':
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: false, loaded: true };

    case 'ADD_ITEM_REQUEST':
      return { ...state, itemAdded: initialState.itemAdded, loading: true, loaded: false };
    case 'ADD_ITEM_SUCCESS':
      return { ...state, itemAdded: action.data, loading: false, loaded: true };
    case 'ADD_ITEM_FAILURE':
      return { ...state, itemAdded: initialState.itemAdded, loading: false, loaded: true };

    case 'EDIT_ITEM_REQUEST':
      return { ...state, itemEdited: initialState.itemEdited, loading: true, loaded: false };
    case 'EDIT_ITEM_SUCCESS':
      return { ...state, itemEdited: action.data, loading: false, loaded: true };
    case 'EDIT_ITEM_FAILURE':
      return { ...state, itemEdited: initialState.itemEdited, loading: false, loaded: true };

    case 'DELETE_ITEM_REQUEST':
      return { ...state, itemDeleted: initialState.itemDeleted, loading: true, loaded: false };
    case 'DELETE_ITEM_SUCCESS':
      return { ...state, itemDeleted: action.data, loading: false, loaded: true };
    case 'DELETE_ITEM_FAILURE':
      return { ...state, itemDeleted: initialState.itemDeleted, loading: false, loaded: true };

    case 'GET_ITEM_DETAILS_REQUEST':
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: true, loaded: false };
    case 'GET_ITEM_DETAILS_SUCCESS':
      return { ...state, chapterItemDetails: action.data, loading: false, loaded: true };
    case 'GET_ITEM_DETAILS_FAILURE':
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: false, loaded: true };

    case 'EDIT_ITEM_DETAILS_REQUEST':
      return { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited, loading: true, loaded: false };
    case 'EDIT_ITEM_DETAILS_SUCCESS':
      return { ...state, chapterItemDetailsEdited: action.data, loading: false, loaded: true };
    case 'EDIT_ITEM_DETAILS_FAILURE':
      return { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited, loading: false, loaded: true };

    case 'TRY_USER_LOGIN_PASSWORD_REQUEST':
      return { ...state, userData: initialState.userData, loading: true, loaded: false };
    case 'TRY_USER_LOGIN_PASSWORD_SUCCESS':
      return { ...state, userData: action.data, loading: false, loaded: true };
    case 'TRY_USER_LOGIN_PASSWORD_FAILURE':
      return { ...state, userData: action.data || initialState.userData, loading: false, loaded: true };

    default:
      return state;
  }
}
