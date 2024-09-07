import gql from 'graphql-tag';

export const signupMutation = gql`
  mutation {
    signup(username: "testUser", email: "test@test.com", password: "test") {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
