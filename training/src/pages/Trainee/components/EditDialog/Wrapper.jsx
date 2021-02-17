/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { UPDATED_USER } from './mutation';
import EditDialog from './EditDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={UPDATED_USER}>
        {(updateTrainee) => (
          <>
            <EditDialog updateTrainee={updateTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}
