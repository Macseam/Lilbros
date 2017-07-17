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
  loading: {},
};

export default function authInfo(state = initialState, action) {
  let actionTypeName = action.type ? action.type.split('_').slice(0,-1).join('_') : '';
  switch (action.type) {

    case 'GET_HEADER_AUTH_TOKEN_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, userData: initialState.userData, loading: initialState.loading };
    case 'GET_HEADER_AUTH_TOKEN_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: action.data, loading: initialState.loading };
    case 'GET_HEADER_AUTH_TOKEN_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: initialState.userData, loading: initialState.loading };

    case 'SEND_LOGOUT_COMMAND_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, userData: initialState.userData, loading: initialState.loading };
    case 'SEND_LOGOUT_COMMAND_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: null, loading: initialState.loading };
    case 'SEND_LOGOUT_COMMAND_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: initialState.userData, loading: initialState.loading };

    case 'GET_CHAPTERS_LIST_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chaptersList: initialState.chaptersList, loading: initialState.loading };
    case 'GET_CHAPTERS_LIST_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chaptersList: action.data, loading: initialState.loading };
    case 'GET_CHAPTERS_LIST_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chaptersList: initialState.chaptersList, loading: initialState.loading };

    case 'ADD_CHAPTER_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterAdded: initialState.chapterAdded, loading: initialState.loading };
    case 'ADD_CHAPTER_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterAdded: action.data, loading: initialState.loading };
    case 'ADD_CHAPTER_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterAdded: initialState.chapterAdded, loading: initialState.loading };

    case 'EDIT_CHAPTER_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterEdited: initialState.chapterEdited, loading: initialState.loading };
    case 'EDIT_CHAPTER_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterEdited: action.data, loading: initialState.loading };
    case 'EDIT_CHAPTER_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterEdited: initialState.chapterEdited, loading: initialState.loading };

    case 'DELETE_CHAPTER_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterDeleted: initialState.chapterDeleted, loading: initialState.loading };
    case 'DELETE_CHAPTER_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterDeleted: action.data, loading: initialState.loading };
    case 'DELETE_CHAPTER_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterDeleted: initialState.chapterDeleted, loading: initialState.loading };

    case 'GET_ITEMS_LIST_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: initialState.loading };
    case 'GET_ITEMS_LIST_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemsList: action.data, loading: initialState.loading };
    case 'GET_ITEMS_LIST_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemsList: initialState.chapterItemsList, loading: initialState.loading };

    case 'ADD_ITEM_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, itemAdded: initialState.itemAdded, loading: initialState.loading };
    case 'ADD_ITEM_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, itemAdded: action.data, loading: initialState.loading };
    case 'ADD_ITEM_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, itemAdded: initialState.itemAdded, loading: initialState.loading };

    case 'EDIT_ITEM_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, itemEdited: initialState.itemEdited, loading: initialState.loading };
    case 'EDIT_ITEM_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, itemEdited: action.data, loading: initialState.loading };
    case 'EDIT_ITEM_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, itemEdited: initialState.itemEdited, loading: initialState.loading };

    case 'DELETE_ITEM_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, itemDeleted: initialState.itemDeleted, loading: initialState.loading };
    case 'DELETE_ITEM_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, itemDeleted: action.data, loading: initialState.loading };
    case 'DELETE_ITEM_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, itemDeleted: initialState.itemDeleted, loading: initialState.loading };

    case 'GET_ITEM_DETAILS_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: initialState.loading };
    case 'GET_ITEM_DETAILS_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemDetails: action.data, loading: initialState.loading };
    case 'GET_ITEM_DETAILS_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemDetails: initialState.chapterItemDetails, loading: initialState.loading };

    case 'EDIT_ITEM_DETAILS_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited, loading: initialState.loading };
    case 'EDIT_ITEM_DETAILS_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemDetailsEdited: action.data, loading: initialState.loading };
    case 'EDIT_ITEM_DETAILS_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, chapterItemDetailsEdited: initialState.chapterItemDetailsEdited, loading: initialState.loading };

    case 'TRY_USER_LOGIN_PASSWORD_REQUEST':
      initialState.loading[actionTypeName] = true;
      return { ...state, userData: initialState.userData, loading: initialState.loading };
    case 'TRY_USER_LOGIN_PASSWORD_SUCCESS':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: action.data, loading: initialState.loading };
    case 'TRY_USER_LOGIN_PASSWORD_FAILURE':
      delete initialState.loading[actionTypeName];
      return { ...state, userData: action.data || initialState.userData, loading: initialState.loading };

    case 'SET_DETAILS_EDITABLE_SUCCESS':
      return { ...state, detailsEditable: action.data };

    default:
      return state;
  }
}
