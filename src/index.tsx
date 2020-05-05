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
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'

import AppRouter from './AppRouter'
// import { AUTH_TOKEN } from './constants';
export const AUTH_TOKEN = 'auth-token'

import './index.css'

  // uri: 'https://mz4-tripplannerbackend.glitch.me/graphql',
  // uri: 'ws://mz4-tripplannerbackend.glitch.me/graphql',

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

// const link = new SubscriptionClient('ws://localhost:8080/subscriptions', {
//   reconnect: true,
//   connectionParams: () => {
//     var token = localStorage.getItem(AUTH_TOKEN);
//     if(token) {
//       return { authToken: token };
//     }
//     return { };
//   }
// });

// const cache = new InMemoryCache();
// const client = new ApolloClient({
//   cache: cache,
//   link: link as any,
// })

// const protocol = (location.protocol != 'https:') ? 'ws://': 'wss://';
// const port = location.port ? ':'+location.port: '';

/// const httpLink = createUploadLink({
//   uri: location.protocol + '//' + location.hostname + port + '/graphql',
//   credentials: 'same-origin',
// })

// const wsLink = new WebSocketLink(subClient);

// const AuthLink = (operation, next) => {
//   const token = localStorage.getItem(AUTH_TOKEN);
//   if(token) {
//     operation.setContext(context => ({
//       ...context,
//       headers: {
//         ...context.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     }));
//   }
//   return next(operation);
// };

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// )

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link,
//   cache,
// })

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         graphQLErrors.map(({ message, locations, path, extensions }) => {
//           if(extensions && extensions.code === 'UNAUTHENTICATED') {
//             localStorage.removeItem(AUTH_TOKEN);
//             client.resetStore();
//           }
//           console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
//         });
//         if (networkError) {
//           console.log(`[Network error]: ${networkError}`);
//         }
//       }
//     }),
//     link
//   ]),
//   cache: new InMemoryCache()
// });