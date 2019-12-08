import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link';
import { AUTH_TOKEN } from './constants'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import './index.css';
import AppRouter from './AppRouter';

const initialState = {
    trips: {
      trips: []
    },
  }

const store = configureStore(initialState);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN),
//     },
//   },
// })

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   authLink.concat(httpLink),
// )


import { onError } from "apollo-link-error";

const linkerr = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const cache = new InMemoryCache();
// const link = createHttpLink({ uri: 'http://localhost:3000/graphql?' })

const client = new ApolloClient({
  link: ApolloLink.from([linkerr, createHttpLink({ uri: 'http://localhost:3000/graphql?' })]),
  cache,
})

render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);