import { gql } from '@apollo/client'

export const CATEGORIES_QUERY = gql`
  query Categories($pagination: PaginationInput) {
    categories(pagination: $pagination) {
      items {
        id
        title
        description
        icon
        color
        createdAt
        updatedAt
        transactions {
          id
        }
      }
      total
      skip
      take
    }
  }
`

export const CATEGORY_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      title
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`
