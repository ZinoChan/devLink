import { gql } from "@/__generated__";

export const CHECK_USER = gql(`
  query CheckUser {
    users {
      id
    }
  }
`);

export const GET_USER_PROFILE = gql(`
  query GetUserProfile {
    users {
      id
      email
      first_name
      last_name
      profile_picture_url
    }
  }
`);

export const GET_PUBLIC_PREVIEW = gql(`
  query GetPublicPreview($userId: uuid!) {
    users(where: { id: { _eq: $userId } }) {
      email
      first_name
      last_name
      profile_picture_url
    }
    links(where: { user: { id: { _eq: $userId } } }) {
      id
      platform
      url
      display_order
    }
  }
`);
