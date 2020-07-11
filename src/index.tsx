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
import { I18nextProvider } from "react-i18next"
import {ThemeProviderContext} from "./context/ThemeContext"
import {myProviderContext} from "./context/themec"
import i18n from "../src/utils/i18ns"

import AppRouter from './containers/Router/AppRouter'
export const AUTH_TOKEN = 'auth-token'

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

import 'normalize.css'

const initialState = {
    trips: {
      trips: []
    },
  }

const store = configureStore(initialState);

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3030/graphql',
// });

// const token = localStorage.getItem(AUTH_TOKEN);
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:3030/subscriptions',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//    }    
//   },  
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });

render(
  <Provider store={store}>
    <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ThemeProviderContext>
            <AppRouter />
          </ThemeProviderContext>
        </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
