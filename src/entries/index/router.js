import React from 'react';
import { Route, Switch, BrowserRouter, Router } from 'dva/router';
import IndexPage from 'Routes/index';

function RouterConfig({ history }) {
  console.log('Router')
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
