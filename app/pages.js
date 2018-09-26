import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";
import Home from "./Home";

function Application({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Application;