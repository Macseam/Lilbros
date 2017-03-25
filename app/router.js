import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import ChapterList from './components/List';
import ChapterDetails from './components/Details';

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginPage}/>
      <Route path=":chapter" component={ChapterList}>
        <Route path=":name" component={ChapterDetails}/>
      </Route>
      <IndexRoute component={Home}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };
