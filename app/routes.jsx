'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import AppContainer from "./containers/AppContainer";
import IndexContainer from "./containers/IndexContainer";
import ListContainerAsync from "./containers/ListContainerAsync";
import LoginPageAsync from "./components/LoginPageAsync";
import NotFound from "./components/NotFound";
import ChapterDetailsAsync from './components/DetailsAsync';

export default function createRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>
      <Route path="login" component={LoginPageAsync}/>
      <Route path="list/:chapter" component={ListContainerAsync}>
        <Route path=":details" component={ChapterDetailsAsync}/>
      </Route>
      <IndexRoute component={IndexContainer} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}