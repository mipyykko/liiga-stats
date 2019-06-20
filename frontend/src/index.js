import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks' 
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { store, persistor } from './store'

import MatchHeader from './components/MatchHeader'
import MatchTactics from './components/MatchTactics'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
})

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Cabin', 'Roboto', 'sans-serif']
  }
})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <Router>
              <Route path='/header' component={MatchHeader} />
              <Route path='/tactics' component={MatchTactics} />
              <Route path='/' exact component={App} />
            </Router>
          </ApolloHooksProvider>
        </ApolloProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
