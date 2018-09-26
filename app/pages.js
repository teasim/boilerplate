import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";
import IndexPage from "./IndexPage";

function Application({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={IndexPage} />
    </ConnectedRouter>
  );
}

export default Application;