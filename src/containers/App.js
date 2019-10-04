import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header';
import StoreList from './StoreList';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/" component={StoreList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
