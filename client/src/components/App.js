import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './landing';
// import Dashboard from './dashboard';
import LinkList from './link_list';
// import fetchUserV1 from "../actions/index";
import { connect } from 'react-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import * as actions from '../actions/index';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchUserV2();
  }

  // <Route path="/surveys/new" component={SurveyNew} />
  // <Route path="/surveys" component={Dashboard} />

  render() {
    return (
      <div className="container">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div>
              <Header />
              <LinkList />
              <Switch>
                <Route path="/" component={Landing} />
              </Switch>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

// export default App;

export default connect(null, actions)(App);
