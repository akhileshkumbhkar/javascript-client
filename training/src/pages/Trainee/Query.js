import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query TRAINEELIST($skip: String, $limit: String, $sort:Boolean, $search: String) {
  getAllTrainees(payload: { skip: $skip, limit: $limit, sort: $sort, search: $search}) {
    message
    status
    data{
      count
      records{
        name
        email
        role
        password
        createdAt
        originalId
        _id
      }
    }
    }
  }`;

export { GET_TRAINEE };
