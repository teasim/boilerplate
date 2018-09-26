import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";
import IndexPage from "./IndexPage";

function Application({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Application;