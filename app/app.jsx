import '../style/flatly.less';
import '../style/app.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import createRoutes from './routes';

const store = configureStore();
const history = browserHistory;

render(
    <Provider store={store} key="provider">
        <Router routes={createRoutes(store)} history={history}/>
    </Provider>, window.document.getElementById('app')
);