/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetUserLinks {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n": types.GetUserLinksDocument,
    "\n  mutation InsertLinks($links: [links_insert_input!]!){\n    insert_links(objects: $links) {\n      returning {\n        id\n        platform\n        url\n        display_order\n      }\n    }\n  }\n": types.InsertLinksDocument,
    "\n\t mutation DeleteLinks($linkIds: [uuid!]!) {\n\tdelete_links(where: { id: { _in: $linkIds } }) {\n\t  returning {\n\t    id\n\t  }\n\t}\n  }\n": types.DeleteLinksDocument,
    "\n  mutation UpdateLink($id: uuid!, $data: links_set_input!) {\n    update_links(_set: $data, where: { id: { _eq: $id } }) {\n      returning {\n        id\n        platform\n        url\n        display_order\n        updated_at\n      }\n    }\n  }\n": types.UpdateLinkDocument,
    "\n  query CheckUser {\n    users {\n      id\n    }\n  }\n": types.CheckUserDocument,
    "\n  query GetUserProfile {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  query GetPublicPreview($userId: uuid!) {\n    users(where: { id: { _eq: $userId } }) {\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links(where: { user: { id: { _eq: $userId } } }) {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n": types.GetPublicPreviewDocument,
    "\n  mutation UpdateUserProfile(\n    $id: uuid!\n    $first_name: String\n    $last_name: String\n    $email: String\n    $profile_picture_url: String\n  ) {\n    update_users_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        first_name: $first_name\n        last_name: $last_name\n        email: $email\n        profile_picture_url: $profile_picture_url\n      }\n    ) {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n                  fragment UpdateUser on users {\n                    id\n                    first_name\n                    last_name\n                    email\n                    profile_picture_url\n                  }\n                ": types.UpdateUserFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserLinks {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n"): (typeof documents)["\n  query GetUserLinks {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation InsertLinks($links: [links_insert_input!]!){\n    insert_links(objects: $links) {\n      returning {\n        id\n        platform\n        url\n        display_order\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation InsertLinks($links: [links_insert_input!]!){\n    insert_links(objects: $links) {\n      returning {\n        id\n        platform\n        url\n        display_order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t mutation DeleteLinks($linkIds: [uuid!]!) {\n\tdelete_links(where: { id: { _in: $linkIds } }) {\n\t  returning {\n\t    id\n\t  }\n\t}\n  }\n"): (typeof documents)["\n\t mutation DeleteLinks($linkIds: [uuid!]!) {\n\tdelete_links(where: { id: { _in: $linkIds } }) {\n\t  returning {\n\t    id\n\t  }\n\t}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateLink($id: uuid!, $data: links_set_input!) {\n    update_links(_set: $data, where: { id: { _eq: $id } }) {\n      returning {\n        id\n        platform\n        url\n        display_order\n        updated_at\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLink($id: uuid!, $data: links_set_input!) {\n    update_links(_set: $data, where: { id: { _eq: $id } }) {\n      returning {\n        id\n        platform\n        url\n        display_order\n        updated_at\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckUser {\n    users {\n      id\n    }\n  }\n"): (typeof documents)["\n  query CheckUser {\n    users {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserProfile {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n"): (typeof documents)["\n  query GetUserProfile {\n    users {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublicPreview($userId: uuid!) {\n    users(where: { id: { _eq: $userId } }) {\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links(where: { user: { id: { _eq: $userId } } }) {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n"): (typeof documents)["\n  query GetPublicPreview($userId: uuid!) {\n    users(where: { id: { _eq: $userId } }) {\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n    links(where: { user: { id: { _eq: $userId } } }) {\n      id\n      platform\n      url\n      display_order\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserProfile(\n    $id: uuid!\n    $first_name: String\n    $last_name: String\n    $email: String\n    $profile_picture_url: String\n  ) {\n    update_users_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        first_name: $first_name\n        last_name: $last_name\n        email: $email\n        profile_picture_url: $profile_picture_url\n      }\n    ) {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfile(\n    $id: uuid!\n    $first_name: String\n    $last_name: String\n    $email: String\n    $profile_picture_url: String\n  ) {\n    update_users_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        first_name: $first_name\n        last_name: $last_name\n        email: $email\n        profile_picture_url: $profile_picture_url\n      }\n    ) {\n      id\n      email\n      first_name\n      last_name\n      profile_picture_url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                  fragment UpdateUser on users {\n                    id\n                    first_name\n                    last_name\n                    email\n                    profile_picture_url\n                  }\n                "): (typeof documents)["\n                  fragment UpdateUser on users {\n                    id\n                    first_name\n                    last_name\n                    email\n                    profile_picture_url\n                  }\n                "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;