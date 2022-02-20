import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
// import 'semantic-ui-css/semantic.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // headers['x-token']
      // headers['x-refresh-token']
      ['x-token']: token ? token : "",
      ['x-refresh-token']: refreshToken ? refreshToken : "",
      
      // authorization: token ? token : "",
      // authorization: refreshToken ? refreshToken : "",
    }
  }
});

const client = new ApolloClient({
  // Provide required constructor fields
  
  // uri: 'http://localhost:4000/graphql',
  link: authLink.concat(httpLink),
  cache: cache,
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
