import '../style/app.less';
import 'bootstrap/less/bootstrap.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from "react-router-redux";

const NODE_ENV = process.env.NODE_ENV || 'production';

import configureStore from './store/configureStore';
import createRoutes from './routes';
import { createBrowserHistory, createHashHistory } from 'history';

const store = configureStore();
const history = ((NODE_ENV === 'development') ? useRouterHistory(createHashHistory)() : useRouterHistory(createBrowserHistory)());

render(
    <Provider store={store} key="provider">
        <Router routes={createRoutes(store)} history={history}/>
    </Provider>, window.document.getElementById('app')
);