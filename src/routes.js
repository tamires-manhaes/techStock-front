import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import Register from './pages/Register';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/products" exact component={Products}/>
        <Route path="/products/new" exact component={NewProduct}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}