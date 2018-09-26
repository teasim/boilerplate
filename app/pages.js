import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";
import Home from "./Home";

function Application({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Home} />
    </ConnectedRouter>
  );
}

export default Application;