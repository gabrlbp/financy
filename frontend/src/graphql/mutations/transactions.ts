import { gql } from '@apollo/client'

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
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

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
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

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`
