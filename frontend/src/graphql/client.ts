import { ApolloClient, ApolloLink, CombinedGraphQLErrors, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/auth'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = new SetContextLink(({ headers }, _) => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
      if (
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.message.toLowerCase().includes('not authenticated') ||
        err.message.toLowerCase().includes('jwt') ||
        err.message.toLowerCase().includes('token')
      ) {
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return
      }
    })
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        transactions: {
          keyArgs: ['filter', 'pagination'],
          merge(_existing, incoming) {
            return incoming
          },
        },
        categories: {
          keyArgs: false,
          merge(_existing, incoming) {
            return incoming
          },
        },
      },
    },
    Transaction: {
      keyFields: ['id'],
    },
    Category: {
      keyFields: ['id'],
    },
    User: {
      keyFields: ['id'],
    },
  },
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
})
