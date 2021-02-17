/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-components';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo, NotFound,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';

class App extends Component {
  render() {
    return (
      <SnackBarProvider>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <AuthRoute path="/login" component={Login} />
              <PrivateRoute path="/text-field" component={TextFieldDemo} />
              <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
              <PrivateRoute path="/inputDemo" component={InputDemo} />
              <PrivateRoute path="/trainee" component={Trainee} />
              <PrivateRoute component={NotFound} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    );
  }
}

export default App;
