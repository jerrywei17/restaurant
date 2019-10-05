import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header';
import StoreList from './StoreList';
import Admin from './Admin';
import AdminEdit from './AdminEdit';
import StoreDetail from './StoreDetail';
import StoreOrder from './StoreOrder';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/admin/:id" component={AdminEdit} />
              <Route path="/store/:id" component={StoreDetail} />
              <Route path="/store/:id/order" component={StoreOrder} />
              <Route path="/" component={StoreList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
