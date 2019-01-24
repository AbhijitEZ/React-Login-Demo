import React, { Component } from 'react';
import './App.css';
import Login from './Container/Login';
import Product from './Container/Product';
import ProductListing from './Container/ProductListing';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch} from 'react-router-dom';
import UserProfile from './Container/UserProfile';
import UserAddress from './Container/UserAddress';
class App extends Component {
  render() {
    return (
     
     <Router history ={createBrowserHistory()}>
     
      <div>
      <Switch>
       <Route path = '/' exact component ={Login} />
       <Route path = '/product/productListings' exact component ={ProductListing} />
       <Route path = '/product/detail/:id' exact component = {Product} />
       <Route path = '/user/getUserProfile/:userid' exact component = {UserProfile} />
       <Route path = '/user/savedAddress' exact component = {UserAddress} />
       <Route render = {() => (<h2>Wrong Route</h2>)} />
       </Switch>
       </div>
     </Router>
    
    );
  }
}

export default App;
