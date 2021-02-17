import { gql } from 'apollo-boost';

const CREATE_USER = gql`
mutation createTrainee($name: String!, $email: String!, $role: String!, $password: String!){
    createTrainee(payload: { name: $name, email: $email, role: $role, password: $password, }){
      message
      code
      data {
        name
        email
        role
        password
      }
    }
}`;

export {
  CREATE_USER,
};
