import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'

import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'

import AppRouter from './AppRouter'
import './index.css'

const initialState = {
    trips: {
      trips: []
    },
  }

const store = configureStore(initialState);

const protocol = (location.protocol != 'https:') ? 'ws://': 'wss://';
const port = location.port ? ':'+location.port: '';

const httpLink = createUploadLink({
  uri: location.protocol + '//' + location.hostname + port + '/graphql',
  credentials: 'same-origin',
})

const SUBSCRIPTIONS_ENDPOINT = protocol + location.hostname + port + '/subscriptions';
const subClient = new SubscriptionClient(SUBSCRIPTIONS_ENDPOINT, {
  reconnect: true,
  connectionParams: () => {
    var token = localStorage.getItem(AUTH_TOKEN);
    if(token) {
      return { authToken: token };
    }
    return { };
  }
});
const wsLink = new WebSocketLink(subClient);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const AuthLink = (operation, next) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if(token) {
    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }
  return next(operation);
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          if(extensions && extensions.code === 'UNAUTHENTICATED') {
            localStorage.removeItem(AUTH_TOKEN);
            client.resetStore();
          }
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    AuthLink,
    link
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});
















// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link,
//   cache,
// })

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