/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Navigate } from "@solidjs/router";
import {lazy, createSignal} from "solid-js"

import './index.css';
import App from './App';
import About from './About';
import User from './User';
import Login from './Login';
import NotFound from './NotFound';
import Services from './Services';
import PageLayout from './layouts/PageLayout';
//import Users from './Users';

// Lazing loading the Users route
const Users = lazy(() => import("./Users"));

const root = document.getElementById('root');

const [isAuthenticated, setIsAuthenticated] = createSignal(true);

const getPath = ({navigate, location}) => {

  console.log(navigate);
  console.log(location);

  return "/about"
}

const checkAuth = () => {

  return isAuthenticated();
}

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const routes = [
  {
    path: "/",
    component: lazy(() => import("./App"))
  },
  {
    path : "login",
    component: lazy(() => import("./Login"))
  },
  {
    path : "storedemo",
    component: lazy(() => import("./StoreDemo"))
  },
  {
    path : "asyncdemo",
    component: lazy(() => import("./AsyncDemo"))
  },
  
  {
    path : "/users",
    children : [
      {
        path: "/",
        component: lazy(() => import("./Users"))
      },
      {
        path: "/:id",
        component: lazy(() => import("./User"))
      }
    ]
  }
]

render(() => (
  <Router>
    
      {/* <Route path="/" component={() => checkAuth()? <App /> : <Navigate href="/login" />} />
      <Route path="/users">
        <Route path="/" component={Users} />
        <Route path="/:id" component={User} />
      </Route>

      <Route path="/pages" component={PageLayout}>
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
      </Route>
      
      <Route path="/about" component={About} />
      <Route path={["login", "register"]} component={Login} />
      <Route path="/redirect" component={() => <Navigate href={getPath} />} />
      <Route path="/*" component={NotFound} /> */}
      {routes}
    
  </Router>
), root);
