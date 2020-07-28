import React from 'react';
import Router from 'react-router';
// componentes
import App  from './views/app';
import Home from './views/home';

// configuramos nuestras rutas
const routes = (
  <Router.Route path='/' handler={ App }>
    <Router.DefaultRoute name='home' handler={ Home } />
  </Router.Route>
);

export default routes;