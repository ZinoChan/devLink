import { gql } from "@apollo/client";

export const GET_USER_LINKS = gql`
  query GetUserLinks {
    links {
      id
      platform
      url
      display_order
      created_at
    }
  }
`;

export const INSERT_AND_DELETE_LINKS = gql`
  mutation InsertAndDelete(
    $insertObjects: [links_insert_input!]!
    $deleteIds: [uuid!]!
  ) {
    insert_links(objects: $insertObjects) {
      affected_rows
      returning {
        id
        platform
        url
        display_order
        created_at
      }
    }
    delete_links(where: { id: { _in: $deleteIds } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
export const UPDATE_LINK = gql`
  mutation UpdateLink($id: uuid!, $data: links_set_input!) {
    update_links(_set: $data, where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        platform
        url
        display_order
        updated_at
      }
    }
  }
`;
