import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
// import 'semantic-ui-css/semantic.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: 'http://localhost:4000/graphql',

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const App = (
  <ApolloProvider client={client}>
     <Routes />
  </ApolloProvider>
 
)

ReactDOM.render(
    App,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
