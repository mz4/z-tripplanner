import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

import AppRouter from './AppRouter'
export const AUTH_TOKEN = 'auth-token'

import 'normalize.css'
import './index.css'

const initialState = {
    trips: {
      trips: []
    },
  }

const store = configureStore(initialState);

const httpLink = new HttpLink({
  uri: 'http://localhost:3030/graphql',
});

const token = localStorage.getItem(AUTH_TOKEN);
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3030/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: `Bearer ${token}`
      }
   }    
  },  
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

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
