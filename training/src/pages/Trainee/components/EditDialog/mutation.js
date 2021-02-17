import { gql } from 'apollo-boost';

const UPDATED_USER = gql`
 
mutation updateTrainee( $id: ID!, $name: String!, $email: String!,){
    updateTrainee(payload: {id: $id, dataToUpdate: { name: $name, email: $email } } ) {
      message
      code
    }
}`;

export {
  UPDATED_USER,
};
