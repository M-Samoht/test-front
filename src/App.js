import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import './assets/css/theme.scss'

import store from './store'
import Home from './pages/home'
import User from './pages/user'
import Movie from './pages/movie'
import Alert from './pages/components/Alert'
import Topbar from './pages/components/Topbar'

const authLink = setContext((_, { headers }) => {
  const { token } = JSON.parse(localStorage.getItem('auth')) || ''
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'http://localhost:4000' })),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
})

export default () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/" component={Topbar} />
          <Route path="/" component={Alert} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/movie/:id" component={Movie} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  )
}
