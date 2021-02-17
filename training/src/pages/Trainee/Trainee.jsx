import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';
import apolloClient from '../../libs/apollo-client';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
      </Switch>
    </ApolloProvider>
  );
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Trainee;
