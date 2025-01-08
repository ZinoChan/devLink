import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    users {
      id
      email
      first_name
      last_name
      profile_picture_url
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: uuid!
    $first_name: String
    $last_name: String
    $email: String
    $profile_picture_url: String
  ) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        profile_picture_url: $profile_picture_url
      }
    ) {
      email
      first_name
      last_name
      profile_picture_url
    }
  }
`;
