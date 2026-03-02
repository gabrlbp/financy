import { gql } from '@apollo/client'

export const TRANSACTIONS_QUERY = gql`
  query Transactions($filter: TransactionFilterInput!, $pagination: PaginationInput) {
    transactions(filter: $filter, pagination: $pagination) {
      items {
        id
        description
        amount
        type
        date
        createdAt
        updatedAt
        category {
          id
          title
          icon
          color
        }
      }
      total
      skip
      take
    }
  }
`

export const TRANSACTION_QUERY = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
      id
      description
      amount
      type
      date
      createdAt
      updatedAt
      category {
        id
        title
        icon
        color
      }
    }
  }
`
