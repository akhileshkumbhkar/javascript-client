import { gql } from 'apollo-boost';

const DELETE_USER = gql`
mutation deleteTrainee($id: ID!){
    deleteTrainee(payload: {id: $id}){
      message
      code
    }
}`;

export {
  DELETE_USER,
};
