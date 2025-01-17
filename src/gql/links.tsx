import { gql } from "@/__generated__";

export const GET_USER_LINKS = gql(`
  query GetUserLinks {
    users {
      email
      first_name
      last_name
      profile_picture_url
    }
    links {
      id
      platform
      url
      display_order
    }
  }
`);

export const INSERT_LINKS = gql(`
  mutation InsertLinks($links: [links_insert_input!]!){
    insert_links(objects: $links) {
      returning {
        id
        platform
        url
        display_order
      }
    }
  }
`);

export const DELETE_LINKS = gql(`
	 mutation DeleteLinks($linkIds: [uuid!]!) {
	delete_links(where: { id: { _in: $linkIds } }) {
	  affected_rows
	  returning {
	    id
	  }
	}
  }
`);

export const UPDATE_LINK = gql(`
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
`);
